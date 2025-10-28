import { redirect } from "next/navigation";
import { supabase } from "../../../../../utils/supabase";
import { revalidatePath } from "next/cache";
import DeleteGroupButton from "@/app/components/DeleteGroup";
import Link from "next/link";
import { getSessionUser } from "../../../../../../wishlist_organizer/utils/auth";
import NavBar from "@/app/components/navbar";

interface GroupDetails {
  id: string;
  name: string;
  creator_id: string;
  created_at: string;
  invite_code: string | null;
}

interface UserGroup {
  user_id: string;
  role: string;
}

interface MemberDetail extends UserGroup {
  user: {
    name: string;
  };
}

export default async function ManageGroupPage({
  params,
}: {
  params: { groupId: string };
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  const groupPromise = supabase
    .from("groups")
    .select("*")
    .eq("id", params.groupId)
    .single();

  const membersPromise = supabase
    .from("user_groups")
    .select("user_id, role")
    .eq("group_id", params.groupId);

  const [{ data: group }, { data: members }] = (await Promise.all([
    groupPromise,
    membersPromise,
  ])) as [{ data: GroupDetails | null }, { data: UserGroup[] | null }];

  if (!group || group.creator_id !== user.id) {
    redirect("/groups");
  }

  // Fetch user details for members
  let memberDetails: MemberDetail[] = [];
  if (members && members.length > 0) {
    const memberUsers = await Promise.all(
      members.map(async (member) => {
        const { data: user } = await supabase
          .from("users")
          .select("username")
          .eq("id", member.user_id)
          .single();
        return {
          ...member,
          user: {
            name: user?.username,
          },
        };
      })
    );
    memberDetails = memberUsers;
  }

  async function generateInviteCode(formData: FormData) {
    "use server";

    const groupId = formData.get("groupId") as string;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const { error } = await supabase
      .from("groups")
      .update({ invite_code: code })
      .eq("id", groupId);

    if (error) {
      console.error("Error generating invite code:", error);
      return;
    }

    revalidatePath(`/groups/${groupId}/manage`);
  }

  async function removeMember(formData: FormData) {
    "use server";

    const groupId = formData.get("groupId") as string;
    const userId = formData.get("userId") as string;

    if (group?.creator_id === userId) {
      return;
    }

    const { error } = await supabase
      .from("user_groups")
      .delete()
      .eq("group_id", groupId)
      .eq("user_id", userId);

    if (error) {
      console.error("Error removing member:", error);
      return;
    }

    revalidatePath(`/groups/${groupId}/manage`);
  }

  async function deleteGroup(formData: FormData) {
    "use server";

    const groupId = formData.get("groupId") as string;

    const { error: userGroupsError } = await supabase
      .from("user_groups")
      .delete()
      .eq("group_id", groupId);

    if (userGroupsError) {
      console.error("Error deleting user_groups: ", userGroupsError);
      return;
    }

    const { error: GroupError } = await supabase
      .from("groups")
      .delete()
      .eq("id", groupId);

    if (GroupError) {
      console.error("Error deleting group: ", GroupError);
    }

    redirect("/groups");
  }

  return (
    <>
      <NavBar />
    <div className="font-raleway mb-[50px] relative z-10">
      <div className="flex pt-[100px] px-[50px] md:px-[100px] mb-8 justify-center">
        <h1 className="text-2xl font-bold text-primary_text">
          Manage {group.name}
        </h1>
      </div>

      {/* invite code */}
      <section className="mb-8 px-[50px] md:px-[100px]">
        <h2 className="text-xl font-semibold mb-4 text-primary_text">
          Invite Code
        </h2>

        <div className="bg-dark_gray p-6 rounded-lg justify-between">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
            <div className="text-center">
              <p className="text-sm text-primary_text mb-1">
                Share this code to invite members:
              </p>
              <p className="text-2xl font-mono text-primary_text">
                {group.invite_code || "No code generated"}
              </p>
            </div>
            <form action={generateInviteCode}>
              <input type="hidden" name="groupId" value={group.id} />
              <button
                type="submit"
                className="bg-bone text-dark_gray px-4 py-2 rounded
                transition-transform transform active:scale-90"
              >
                Generate New Code
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* members */}
      <section className="px-[50px] md:px-[100px] mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary_text">
          Members ({memberDetails.length})
        </h2>
        <div className="rounded-lg overflow-hidden">
          <div className="min-w-full">
            <div className="bg-dark_gray opacity-90">
              <div className="hidden md:flex justify-between text-primary_text">
                <h1 className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </h1>
                <h1 className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </h1>
                <h1 className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Role
                </h1>
              </div>
            </div>

            <div className="bg-washed_gray w-full">
              <div className="w-full">
                <div className="hidden md:block">
                  {memberDetails.map((member) => (
                    <div
                      key={member.user_id}
                      className="border-b border-dark_gray"
                    >
                      <div className="flex flex-row px-6 py-4">
                        <div className="flex-1 truncate">
                          {member.user.name}
                        </div>
                        <div className="flex-1 text-right capitalize">
                          {member.role}
                        </div>
                      </div>

                      {member.role != "admin" && (
                        <form
                          action={removeMember}
                          className="flex px-6 mb-6 justify-end"
                        >
                          <input
                            type="hidden"
                            name="groupId"
                            value={group.id}
                          />
                          <input
                            type="hidden"
                            name="userId"
                            value={member.user_id}
                          />
                          <button
                            type="submit"
                            className="text-primary_text hover:bg-red-700 rounded bg-red-600 px-4 py-2
                      transition-transform transform active:scale-90 flex items-center justify-center"
                          >
                            Remove
                          </button>
                        </form>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile view - column layout */}
                <div className="md:hidden font-raleway">
                  <h1 className="bg-dark_gray opacity-90 md:hidden px-6 py-3 text-center text-primary_text font-raleway text-xs font-medium">
                    DETAILS
                  </h1>
                  {memberDetails.map((member) => (
                    <div
                      key={member.user_id}
                      className="border-b border-dark_gray p-4 space-y-2"
                    >
                      <div className="space-y-1 ">
                        <div className="text-sm text-primary_text">Name:</div>
                        <div>{member.user.name}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-primary_text">Role:</div>
                        <div className="capitalize">{member.role}</div>
                      </div>

                      {member.role != "admin" && (
                        <form
                          action={removeMember}
                          className="flex mb-6 justify-center"
                        >
                          <input
                            type="hidden"
                            name="groupId"
                            value={group.id}
                          />
                          <input
                            type="hidden"
                            name="userId"
                            value={member.user_id}
                          />
                          <button
                            type="submit"
                            className="text-primary_text hover:bg-red-700 rounded bg-red-600 px-4 py-2
                      transition-transform transform active:scale-90 flex items-center justify-center"
                          >
                            Remove
                          </button>
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {memberDetails.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No members found
                  </td>
                </tr>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Group Setting Section */}
      <section className="mb-8 font-raleway text-primary_text px-[50px] md:px-[100px]">
        <h2 className="text-xl font-semibold mb-4">Group Settings</h2>
        <div className="bg-dark_gray p-6 rounded-lg">
          <DeleteGroupButton groupId={group.id} deleteGroup={deleteGroup} />
        </div>
      </section>

      <div className="flex justify-end px-[50px] md:px-[100px] font-raleway">
        <Link
          href="/groups"
          className="px-4 py-2 text-primary_text bg-midnight_blue rounded-lg
        transition-transform transform active:scale-90"
        >
          Back
        </Link>
      </div>
    </div>
    </>
  );
}