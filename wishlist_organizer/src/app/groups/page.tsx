import { supabase } from "../../../utils/supabase";
import Link from "next/link";
import NavBar from "@/app/components/navbar";
import { getSessionUser } from "../../../../wishlist_organizer/utils/auth";
import { redirect } from "next/navigation";
import { Settings, Gift, User } from "lucide-react";

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
    <div className="max-w-[1000px] mx-auto bg-[#f7f9fb] min-h-screen mt-20 rounded-t-3xl pb-20">
      <NavBar />
      <div className="font-raleway text-primary_text p-6 md:pt-20">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">My Groups</h1>
      </div>

      {/* Groups I Manage */}
      <section className="font-raleway text-primary_text mx-[25px] sm:mx-0 md:px-6">
        <h2 className="text-xl font-semibold mb-4">Groups I Manage</h2>
        <div className="flex mb-4 ">
          <Link
            href="/groups/create"
            className="bg-bone px-4 py-2 rounded-lg 
                transition-transform transform active:scale-90 
                flex items-center justify-center text-center"
          >
            <p className="text-dark_gray font-medium">Create a group</p>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {adminGroups?.map((group) => (
            <div
              key={group.id}
              className="relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Christmas Ribbon Decoration (Red for Admin) */}
              <div className="absolute top-0 left-6 w-8 h-full bg-red-600/90 shadow-sm z-0">
                <div className="absolute top-0 inset-x-0 h-full border-l border-r border-white/20"></div>
              </div>

              {/* Gift Bow/Icon */}
              <div className="absolute top-6 left-6 w-8 flex justify-center z-10">
                <div className="bg-white rounded-full p-1 shadow-sm border border-red-100">
                  <Gift size={16} className="text-red-600" />
                </div>
              </div>

              <div className="pl-20 pr-5 py-5 relative z-0">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-slate-800 font-raleway leading-tight truncate">
                    {group.name}
                  </h3>
                  <Link
                    href={`/groups/${group.id}/manage`}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    title="Group Settings"
                  >
                    <Settings size={18} />
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6 bg-slate-50 w-fit px-2 py-1 rounded-full">
                  <User size={12} />
                  <span>{group.user_groups?.length || 0} members</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/groups/${group.id}/manage`}
                    className="flex items-center justify-center text-center text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-lg transition-colors"
                  >
                    Invite
                  </Link>
                  <Link
                    href={`/groups/${group.id}/wishlists`}
                    className="flex items-center justify-center text-center text-xs font-bold text-white bg-red-600 hover:bg-red-700 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    Wishlists
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {(!adminGroups || adminGroups.length === 0) && (
          <p className="text-gray-500">
            You haven&apos;t created any groups yet. Create one before you start
            making a wishlist!
          </p>
        )}
      </section>

      {/* Groups I'm In */}
      <section className="font-raleway mt-[20px] mx-[25px] sm:mx-0 md:px-6">
        <h2 className="text-xl font-semibold mb-4 text-primary_text">
          Groups I&apos;m In
        </h2>
        <div className="flex mb-4">
          <Link
            href="/groups/join"
            className="bg-bone px-4 py-2 rounded-lg 
              transition-transform transform active:scale-90 
              flex items-center justify-center"
          >
            <p className="text-dark_gray font-medium">Join a group</p>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {memberGroups?.map((memberGroup) => {
            const group = Array.isArray(memberGroup.group)
              ? memberGroup.group[0]
              : memberGroup.group;

            if (!group) return null;

            return (
              <div
                key={group.id}
                className="relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Green Ribbon for Member Groups */}
                <div className="absolute top-0 left-6 w-8 h-full bg-green-700/90 shadow-sm z-0">
                  <div className="absolute top-0 inset-x-0 h-full border-l border-r border-white/20"></div>
                </div>

                <div className="absolute top-6 left-6 w-8 flex justify-center z-10">
                  <div className="bg-white rounded-full p-1 shadow-sm border border-green-100">
                    <Gift size={16} className="text-green-700" />
                  </div>
                </div>

                <div className="pl-20 pr-5 py-5 relative z-0">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-slate-800 font-raleway leading-tight truncate">
                      {group.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6 bg-slate-50 w-fit px-2 py-1 rounded-full">
                    <User size={12} />
                    <span>{group.user_groups?.length || 0} members</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/groups/${group.id}`}
                      className="flex items-center justify-center text-center text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-lg transition-colors"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/groups/${group.id}/wishlists`}
                      className="flex items-center justify-center text-center text-xs font-bold text-white bg-green-700 hover:bg-green-800 py-2.5 rounded-lg transition-colors shadow-sm"
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
          <p className="text-gray-500">
            You&apos;re not a member of any groups yet. Join one before making
            your wishlist!
          </p>
        )}
      </section>
    </div>
  );
}
