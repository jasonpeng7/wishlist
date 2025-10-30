import { redirect } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import Link from "next/link";
import { getSessionUser } from "../../../../../wishlist_organizer/utils/auth";
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

export default async function ViewGroupPage({
  params,
}: {
  params: { groupId: string };
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  // fetch all data in parallel to reduce load time
  const groupPromise = supabase
    .from("groups")
    .select("*")
    .eq("id", params.groupId)
    .single();

  const membershipPromise = supabase
    .from("user_groups")
    .select("role")
    .eq("group_id", params.groupId)
    .eq("user_id", user.id)
    .single();

  const membersPromise = supabase
    .from("user_groups")
    .select("user_id, role")
    .eq("group_id", params.groupId);

  const [{ data: groupData }, { data: membershipData }, { data: membersData }] =
    await Promise.all([groupPromise, membershipPromise, membersPromise]);

  const group = groupData as GroupDetails | null;
  const membership = membershipData;
  const members = membersData as UserGroup[] | null;

  if (!group) {
    redirect("/groups");
  }

  if (!membership && group.creator_id !== user.id) {
    redirect("/groups");
  }

  // --- Fetch member details and creator name in parallel ---

  // Fetch user details for members
  const memberDetailsPromise =
    members && members.length > 0
      ? Promise.all(
          members.map(async (member) => {
            const { data: user } = await supabase
              .from("users")
              .select("username")
              .eq("id", member.user_id)
              .single();
            return {
              ...member,
              user: {
                name: user?.username || "Unknown User",
              },
            };
          })
        )
      : Promise.resolve([]); // Resolve with empty array if no members

  // fetch admin details
  const creatorNamePromise = supabase
    .from("users")
    .select("username")
    .eq("id", group.creator_id)
    .single()
    .then(({ data }) => data?.username);

  const [memberDetails, creatorName] = (await Promise.all([
    memberDetailsPromise,
    creatorNamePromise,
  ])) as [MemberDetail[], string];

  return (
    <div className="font-raleway bg-[#f7f9fb] min-h-screen mt-20 rounded-t-3xl p-6 md:p-8 lg:p-10 pb-10">
      <NavBar />
      <div className="flex font-raleway mb-4">
          <Link
            href="/groups"
            className=" text-primary_text font-medium rounded transition-transform transform active:scale-90"
          >
            {"< "}Back
          </Link>
        </div>

        <div className="flex mb-8">
            <div className=" bg-green-600 rounded-md">
              <Link
                href="/dashboard"
                className="flex transition-transform transform active:scale-90 text-white px-4 py-2"
              >
                <p>Add to my wishlist for {group.name}</p>
              </Link>
            </div>
          </div>


      {/* Members Section */}
      <section className="">
        <h2 className="text-xl font-semibold mb-4 text-primary_text">
          Members ({memberDetails.length})
        </h2>
        <div className="rounded-lg overflow-hidden">
          <div className="min-w-full">
            <div className="bg-primary_text opacity-90 ">
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
              <h1 className="flex px-6 py-3 md:hidden justify-center items-center text-white font-raleway text-xs font-medium">
                DETAILS
              </h1>
            </div>
            <div className="bg-bone w-full">
              <div className="w-full">
                {/* Desktop view - row layout */}
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
                    </div>
                  ))}
                </div>

                {/* Mobile view - column layout */}
                <div className="md:hidden font-raleway">
                  {memberDetails.map((member) => (
                    <div
                      key={member.user_id}
                      className="border-b border-[#f7f9fb] p-4 space-y-2 flex flex-row justify-between"
                    >
                      <div className="space-y-1 ">
                        <div className="text-sm text-primary_text">Name:</div>
                        <div>{member.user.name}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-primary_text">Role:</div>
                        <div className="capitalize">{member.role}</div>
                      </div>
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


    </div>
  );
}
