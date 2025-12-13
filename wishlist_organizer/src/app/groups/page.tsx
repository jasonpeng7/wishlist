import { supabase } from "../../../utils/supabase";
import Link from "next/link";
import NavBar from "@/app/components/navbar";
import { getSessionUser } from "../../../../wishlist_organizer/utils/auth";
import { redirect } from "next/navigation";
import { Settings, Gift, User, Snowflake, Sparkles } from "lucide-react";

export default async function GroupsPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/signin");
  }

  // run all queries in parallel
  const adminGroupsPromise = supabase
    .from("groups")
    .select(`*, user_groups(user_id)`)
    .eq("creator_id", user.id);

  const memberGroupsPromise = supabase
    .from("user_groups")
    .select(`group:groups (*,user_groups (user_id))`)
    .eq("user_id", user.id)
    .eq("role", "member");

  const [{ data: adminGroups }, { data: memberGroups }] = await Promise.all([
    adminGroupsPromise,
    memberGroupsPromise,
  ]);

  return (
    <div className="max-w-[1000px] mx-auto bg-[#fdfbf7] min-h-screen mt-20 rounded-t-3xl pb-20 relative overflow-hidden border-x-4 border-[#c41e3a]">
      {/* Snow Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#b0c4de_1px,transparent_1px)] [background-size:20px_20px] z-0"></div>

      {/* Decorative Holly Corners */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_0_0,#0b6b3a_40%,transparent_41%)] opacity-20 pointer-events-none rounded-br-full z-0"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_100%_0,#c41e3a_40%,transparent_41%)] opacity-20 pointer-events-none rounded-bl-full z-0"></div>

      <div className="relative z-10">
        <NavBar />
        <div className="font-raleway text-[#4a3b2a] p-6 md:pt-20 flex items-center gap-3">
          <h1 className="text-4xl font-bold mb-4 md:mb-0 text-[#c41e3a] drop-shadow-sm flex items-center gap-2">
            <Snowflake className="text-[#bf9a2f]" />
            My Groups
            <Snowflake className="text-[#bf9a2f]" />
          </h1>
        </div>

        {/* Groups I Manage */}
        <section className="font-raleway text-[#4a3b2a] mx-[25px] sm:mx-0 md:px-6 relative">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#0b6b3a]/20 pb-2">
            <h2 className="text-2xl font-bold text-[#0b6b3a]">
              Groups I Manage
            </h2>
            <Sparkles size={20} className="text-[#bf9a2f]" />
          </div>

          <div className="flex mb-6">
            <Link
              href="/groups/create"
              className="bg-[#c41e3a] text-white px-6 py-3 rounded-full 
                  transition-transform transform active:scale-95 hover:bg-[#a01830] shadow-md
                  flex items-center justify-center text-center font-bold border-2 border-white"
            >
              <p>Create a Holiday Group 🎄</p>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminGroups?.map((group) => (
              <div
                key={group.id}
                className="relative bg-white rounded-xl shadow-lg border-2 border-[#bf9a2f]/30 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                {/* Christmas Ribbon Decoration (Red for Admin) */}
                <div className="absolute top-0 left-6 w-10 h-full bg-[#c41e3a] shadow-md z-0">
                  <div className="absolute top-0 inset-x-0 h-full border-l-2 border-r-2 border-[#bf9a2f]/50 border-dashed"></div>
                </div>

                {/* Gift Bow/Icon */}
                <div className="absolute top-6 left-6 w-10 flex justify-center z-10">
                  <div className="bg-white rounded-full p-1.5 shadow-md border-2 border-[#c41e3a]">
                    <Gift size={20} className="text-[#c41e3a]" />
                  </div>
                </div>

                <div className="pl-24 pr-5 py-6 relative z-0">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-[#4a3b2a] font-raleway leading-tight truncate">
                      {group.name}
                    </h3>
                    <Link
                      href={`/groups/${group.id}/manage`}
                      className="text-[#bf9a2f] hover:text-[#0b6b3a] transition-colors"
                      title="Group Settings"
                    >
                      <Settings size={20} />
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-[#0b6b3a] text-sm font-regular mb-6 bg-[#0b6b3a]/10 w-fit px-3 py-1.5 rounded-full border border-[#0b6b3a]/20">
                    <User size={14} />
                    <span>{group.user_groups?.length || 0} members</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/groups/${group.id}/manage`}
                      className="flex items-center justify-center text-center text-xs font-bold text-[#4a3b2a] bg-[#fdfbf7] border border-[#bf9a2f] hover:bg-[#bf9a2f]/10 py-2.5 rounded-lg transition-colors"
                    >
                      Invite
                    </Link>
                    <Link
                      href={`/groups/${group.id}/wishlists`}
                      className="flex items-center justify-center text-center text-xs font-bold text-white bg-[#c41e3a] hover:bg-[#a01830] py-2.5 rounded-lg transition-colors shadow-sm border border-[#c41e3a]"
                    >
                      Wishlists
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {(!adminGroups || adminGroups.length === 0) && (
            <div className="bg-white/80 p-6 rounded-lg border-2 border-dashed border-[#bf9a2f] text-center">
              <p className="text-[#4a3b2a] font-medium">
                You haven&apos;t created any holiday groups yet. <br />
                Create one to start the gift exchange! 🎁
              </p>
            </div>
          )}
        </section>

        {/* Groups I'm In */}
        <section className="font-raleway mt-12 mx-[25px] sm:mx-0 md:px-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#0b6b3a]/20 pb-2">
            <h2 className="text-2xl font-bold text-[#0b6b3a]">
              Groups I&apos;m In
            </h2>
            <Gift size={20} className="text-[#bf9a2f]" />
          </div>

          <div className="flex mb-6">
            <Link
              href="/groups/join"
              className="bg-[#0b6b3a] text-white px-6 py-3 rounded-full 
                transition-transform transform active:scale-95 hover:bg-[#08522e] shadow-md
                flex items-center justify-center font-bold border-2 border-white"
            >
              <p>Join a Holiday Group 🎅</p>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {memberGroups?.map((memberGroup) => {
              const group = Array.isArray(memberGroup.group)
                ? memberGroup.group[0]
                : memberGroup.group;

              if (!group) return null;

              return (
                <div
                  key={group.id}
                  className="relative bg-white rounded-xl shadow-lg border-2 border-[#bf9a2f]/30 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  {/* Green Ribbon for Member Groups */}
                  <div className="absolute top-0 left-6 w-10 h-full bg-[#0b6b3a] shadow-md z-0">
                    <div className="absolute top-0 inset-x-0 h-full border-l-2 border-r-2 border-[#bf9a2f]/50 border-dashed"></div>
                  </div>

                  <div className="absolute top-6 left-6 w-10 flex justify-center z-10">
                    <div className="bg-white rounded-full p-1.5 shadow-md border-2 border-[#0b6b3a]">
                      <Gift size={20} className="text-[#0b6b3a]" />
                    </div>
                  </div>

                  <div className="pl-24 pr-5 py-6 relative z-0">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-[#4a3b2a] font-raleway leading-tight truncate">
                        {group.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-[#c41e3a] text-sm font-regular mb-6 bg-[#c41e3a]/10 w-fit px-3 py-1.5 rounded-full border border-[#c41e3a]/20">
                      <User size={14} />
                      <span>{group.user_groups?.length || 0} members</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href={`/groups/${group.id}`}
                        className="flex items-center justify-center text-center text-xs font-bold text-[#4a3b2a] bg-[#fdfbf7] border border-[#bf9a2f] hover:bg-[#bf9a2f]/10 py-2.5 rounded-lg transition-colors"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/groups/${group.id}/wishlists`}
                        className="flex items-center justify-center text-center text-xs font-bold text-white bg-[#0b6b3a] hover:bg-[#08522e] py-2.5 rounded-lg transition-colors shadow-sm border border-[#0b6b3a]"
                      >
                        Wishlists
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {(!memberGroups || memberGroups.length === 0) && (
            <div className="bg-white/80 p-6 rounded-lg border-2 border-dashed border-[#bf9a2f] text-center">
              <p className="text-[#4a3b2a] font-medium">
                You&apos;re not a member of any groups yet. <br />
                Join one to see what everyone wants for Christmas! 🎄
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
