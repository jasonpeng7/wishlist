import { supabase } from "../../../utils/supabase";
import Link from "next/link";
import NavBar from "@/app/components/navbar";
import { getSessionUser } from "../../../../wishlist_organizer/utils/auth";
import { redirect } from "next/navigation";

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
      <div className="font-raleway text-primary_text p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">My Groups</h1>
      </div>

      {/* Groups I Manage */}
      <section className="font-raleway text-primary_text mx-[25px] sm:mx-0">
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
            <div key={group.id} className="bg-primary_text p-4 rounded-lg">
              <h3 className="font-medium text-white">{group.name}</h3>
              <p className="text-sm text-white">
                Members: {group.user_groups?.length || 0}
              </p>

              <div className="mt-4 flex flex-row justify-center lg:justify-start space-x-4">
                <Link
                  href={`/groups/${group.id}/manage`}
                  className="flex w-1/3 text-xs items-center justify-center bg-washed_gray hover:underline text-white px-4 py-2 rounded 
                  transition-transform transform active:scale-90"
                >
                  Invite Friends
                </Link>
                <Link
                  href={`/groups/${group.id}/wishlists`}
                  className="flex w-1/3 text-xs items-center justify-center bg-washed_gray text-white px-4 py-2 rounded 
                  transition-transform transform active:scale-90"
                >
                  View Wishlists
                </Link>
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
      <section className="font-raleway mt-[20px] mx-[25px] sm:mx-0">
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
              <div key={group.id} className="bg-primary_text p-4 rounded-lg">
                <h3 className="font-medium text-white">{group.name}</h3>
                <p className="text-sm text-white">
                  Members: {group.user_groups?.length || 0}
                </p>
                <div className="mt-4 space-x-4 flex justify-center lg:justify-start">
                  <Link
                    href={`/groups/${group.id}`}
                    className="flex w-1/3 text-xs bg-washed_gray text-white hover:underline rounded px-4 py-2
                  transition-transform transform active:scale-90
                  items-center justify-center"
                  >
                    View Group
                  </Link>
                  <Link
                    href={`/groups/${group.id}/wishlists`}
                    className="flex w-1/3 text-xs items-center justify-center bg-washed_gray text-white px-4 py-2 rounded 
                  transition-transform transform active:scale-90"
                  >
                    View Wishlists
                  </Link>
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
