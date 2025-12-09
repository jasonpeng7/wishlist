import { redirect } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import Link from "next/link";
import { getSessionUser } from "../../../../../wishlist_organizer/utils/auth";
import NavBar from "@/app/components/navbar";
import Santa from "@/app/components/Santa";
import "../../manage-group.css"; // Reuse card styles

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

  const [memberDetails] = (await Promise.all([
    memberDetailsPromise,
    creatorNamePromise,
  ])) as [MemberDetail[], string];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090a0f]">
      {/* Snow Effect */}
      <div className="snow-container absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 5 + 5}px`,
              height: `${Math.random() * 5 + 5}px`,
            }}
          />
        ))}
      </div>

      <Santa />

      <div className="relative z-10 font-raleway max-w-[1000px] mx-auto bg-[#f7f9fb] min-h-screen mt-20 rounded-t-3xl p-6 md:p-8 lg:p-10 pb-[100px] christmas-card shadow-2xl">
        <NavBar />
        <div className="flex font-raleway mb-4 md:pt-20">
          <Link
            href="/groups"
            className="text-[#4a3b2a] font-bold hover:text-[#c41e3a] transition-transform transform active:scale-90 flex items-center"
          >
            <span>←</span> <span className="ml-1">Back</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-[#c41e3a] drop-shadow-sm border-b-4 border-[#0b6b3a] pb-2 px-4 inline-block transform -rotate-1">
            {group.name} 🎄
          </h1>

          {/* <div className="bg-[#0b6b3a] rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-white">
            <Link
              href="/dashboard"
              className="flex items-center text-white px-6 py-3 font-bold"
            >
              <span>Update Wishlist</span> <span className="ml-2">🎁</span>
            </Link>
          </div> */}
        </div>

        {/* Members Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#0b6b3a] flex items-center">
            <span className="mr-2">👥</span> Group Members (
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
                  <span className="w-1/2">Name</span>
                  <span className="w-1/2 text-right">Role</span>
                </div>

                {memberDetails.map((member) => (
                  <div
                    key={member.user_id}
                    className="torn-paper-member flex flex-row items-center justify-between gap-4"
                  >
                    <div className="w-full md:w-1/2 font-bold text-lg text-[#4a3b2a] flex items-center">
                      <span className="mr-2 text-xl">
                        {member.role === "admin" ? "🎅" : "🧝"}
                      </span>
                      {member.user.name}
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-right capitalize text-[#0b6b3a] font-semibold">
                      <span className="bg-white/50 rounded px-3 py-1 border border-[#0b6b3a]/20">
                        {member.role}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

        {/* Festive decoration at bottom */}
        <div className="mt-8 text-center opacity-50">
          <div className="inline-block border-t-2 border-gray-300 w-16 mx-2 mb-1"></div>
          <span className="text-2xl">❄️</span>
          <div className="inline-block border-t-2 border-gray-300 w-16 mx-2 mb-1"></div>
        </div>
      </div>
    </div>
  );
}
