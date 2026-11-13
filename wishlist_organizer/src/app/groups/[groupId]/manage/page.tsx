import { redirect } from "next/navigation";
import { supabase } from "../../../../../utils/supabase";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { getSessionUser } from "../../../../../../wishlist_organizer/utils/auth";
import NavBar from "@/app/components/navbar";
import GroupSettings from "./GroupSettings";
import InviteLink from "@/app/components/InviteLink";
import SubmitButton from "@/app/components/SubmitButton";
import Santa from "@/app/components/Santa";
import Snowfall from "@/app/components/Snowfall";
import "../../../manage-group.css";

interface GroupDetails {
  id: string;
  name: string;
  creator_id: string;
  created_at: string;
  invite_code: string | null;
  hide_gift_getters: boolean;
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

interface Props {
  params: { groupId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ManageGroupPage({ params, searchParams }: Props) {
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

  async function updateHideGiftGetters(groupId: string, hide: boolean) {
    "use server";
    const { error } = await supabase
      .from("groups")
      .update({ hide_gift_getters: hide })
      .eq("id", groupId);

    if (error) {
      console.error("Error updating group settings:", error);
      throw new Error("Failed to update group settings in database.");
    } else {
      revalidatePath(`/groups/${groupId}/manage`);
      revalidatePath(`/groups/${groupId}/wishlists`);
    }
  }

  async function generateInviteLink() {
    "use server";

    const actor = await getSessionUser();
    if (!group || !actor || group.creator_id !== actor.id) redirect("/groups");
    const groupId = group.id;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const { error } = await supabase
      .from("groups")
      .update({ invite_code: code })
      .eq("id", groupId);

    if (error) {
      console.error("Error generating invite code:", error);
      redirect(`/groups/${groupId}/manage?error=The%20invitation%20link%20could%20not%20be%20generated.%20Please%20try%20again.`);
    }

    revalidatePath(`/groups/${groupId}/manage`);
    redirect(`/groups/${groupId}/manage`);
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
      redirect(`/groups/${groupId}/manage?error=The%20member%20could%20not%20be%20removed.%20Please%20try%20again.`);
    }

    revalidatePath(`/groups/${groupId}/manage`);
    redirect(`/groups/${groupId}/manage`);
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
      redirect(`/groups/${groupId}/manage?error=The%20group%20could%20not%20be%20deleted.%20Please%20try%20again.`);
    }

    const { error: GroupError } = await supabase
      .from("groups")
      .delete()
      .eq("id", groupId);

    if (GroupError) {
      console.error("Error deleting group: ", GroupError);
      redirect(`/groups/${groupId}/manage?error=The%20group%20could%20not%20be%20deleted.%20Please%20try%20again.`);
    }

    redirect("/groups");
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#090a0f]">
        <Snowfall />

        <Santa />

        <div className="relative z-10 font-raleway max-w-[1000px] mx-auto bg-[#f7f9fb] min-h-screen mt-20 rounded-t-3xl p-6 md:p-8 shadow-2xl christmas-card">
          <NavBar />
          <div className="flex font-raleway mb-4 md:pt-20 md:p-6">
            <Link
              href="/groups"
              className="text-[#4a3b2a] font-bold hover:text-[#c41e3a] transition-transform transform active:scale-90"
            >
              {"< "}Back
            </Link>
          </div>
          <div className="flex mb-8 md:px-6 justify-center">
            <h1 className="text-4xl font-extrabold text-[#c41e3a] drop-shadow-sm border-b-4 border-[#0b6b3a] pb-2 px-4 inline-block transform -rotate-1">
              Manage {group.name}
            </h1>
          </div>

          {typeof searchParams.error === "string" && <p role="alert" className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">{searchParams.error}</p>}
          {/* Invite Code - Gift Tag Style */}
          <section className="mb-12 md:px-6">
            <h2 className="text-2xl font-bold mb-6 text-[#0b6b3a] flex items-center">
              <span className="mr-2">🎁</span> Invitation link
            </h2>

            <div className="gift-tag p-6 rounded-r-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left flex-1 min-w-0 max-w-full">
                <p className="text-sm text-gray-600 mb-2 font-semibold italic">
                  To: Your Friends & Family
                </p>
                {group.invite_code ? <InviteLink inviteId={group.invite_code} /> : <p className="text-sm text-slate_gray">Generate a link to invite people to this group.</p>}
              </div>
              <form action={generateInviteLink} className="flex-shrink-0">
                <SubmitButton
                  pendingText="Generating link…"
                  className="bg-[#0b6b3a] text-white font-bold px-6 py-3 rounded-full hover:bg-[#08522e] transition-transform transform active:scale-95 shadow-lg border-2 border-[#fff]"
                >
                  {group.invite_code ? "Replace invite link" : "Generate invite link"}
                </SubmitButton>
              </form>
            </div>
          </section>

          {/* Members - Torn Paper List */}
          <section className="mb-12 md:px-6">
            <h2 className="text-2xl font-bold mb-6 text-[#0b6b3a] flex items-center">
              <span className="mr-2">📝</span> Members List (
              {memberDetails.length})
            </h2>

            <div className="space-y-4">
              {memberDetails.length === 0 ? (
                <div className="torn-paper-member text-center text-gray-500 italic p-8">
                  No members found... just crickets and snow. 🦗❄️
                </div>
              ) : (
                <>
                  <div className="hidden md:flex justify-between px-6 pb-2 text-[#4a3b2a] font-bold border-b-2 border-[#c41e3a] mb-2 mx-2">
                    <span className="w-1/3">Name</span>
                    <span className="w-1/3 text-center">Role</span>
                    <span className="w-1/3 text-right">Action</span>
                  </div>

                  {memberDetails.map((member) => (
                    <div
                      key={member.user_id}
                      className="torn-paper-member flex flex-col md:flex-row items-center justify-between gap-4"
                    >
                      <div className="w-full md:w-1/3 font-bold text-lg text-[#4a3b2a]">
                        {member.user.name}
                      </div>
                      <div className="w-full md:w-1/3 text-center capitalize text-[#0b6b3a] font-semibold bg-white/50 rounded px-2 py-1">
                        {member.role}
                      </div>
                      <div className="w-full md:w-1/3 flex justify-end">
                        {member.role !== "admin" ? (
                          <form action={removeMember}>
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
                            <SubmitButton
                              pendingText="Removing…"
                              className="text-red-600 hover:text-red-800 font-bold border-b border-red-600 hover:border-red-800 transition-colors text-sm uppercase tracking-wide"
                            >
                              Remove member
                            </SubmitButton>
                          </form>
                        ) : (
                          <span className="text-gray-400 text-sm italic">
                            Owner 👑
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>

          {/* Group Settings */}
          <section className="mb-8 md:px-6">
            <div className="bg-[#f0f0f0] p-6 rounded-xl border-2 border-gray-200">
              <GroupSettings
                group={group}
                deleteGroup={deleteGroup}
                updateHideGiftGetters={updateHideGiftGetters}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
