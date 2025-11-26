import { supabase } from "../../../../../utils/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "../../../../../../wishlist_organizer/utils/auth";
import NavBar from "@/app/components/navbar";
import WishlistViewWrapper from "@/app/components/WishlistViewWrapper";

export const dynamic = "force-dynamic";

export default async function GroupWishlistsPage({
  params,
}: {
  params: { groupId: string };
}) {
  const groupId = params.groupId;
  try {
    const user = await getSessionUser();

    if (!user) {
      redirect("/sign-in");
    }

    if (!groupId) {
      return (
        <div className="flex flex-col justify-center items-center pt-[100px]">
          <p className="text-primary_text font-raleway text-center">
            Invalid group ID. Please select a valid group.
          </p>
        </div>
      );
    }

    const groupDetailsPromise = supabase
      .from("groups")
      .select("name, hide_gift_getters")
      .eq("id", groupId)
      .single();

    const groupMembersPromise = supabase
      .from("user_groups")
      .select("user_id")
      .eq("group_id", groupId);

    const [{ data: groupDetails }, { data: groupMembers }] = await Promise.all([
      groupDetailsPromise,
      groupMembersPromise,
    ]);

    if (!groupMembers || groupMembers.length === 0) {
      return (
        <div className="">
          <div className="flex flex-col justify-center items-center pt-[100px] font-raleway gap-y-[25px]">
            <p className="text-primary_text font-raleway text-center">
              No members found for this group.
            </p>
            <Link
              href="/groups"
              className="flex rounded-md bg-bone transition-transform transform active:scale-90 text-dark_gray px-6 py-2"
            >
              <p>Back to groups</p>
            </Link>
          </div>
        </div>
      );
    }

    const memberIds = groupMembers.map((member) => member.user_id);

    const { data: items, error: itemsError } = await supabase
      .from("wishlists")
      .select(`*`)
      .in("user_id", memberIds)
      .eq("group_id", groupId)
      .order("created_at", { ascending: false });

    if (itemsError) throw itemsError;
    if (!items) {
      return <p>No wishlist items found for this group.</p>;
    }

    const itemIds = items.map((item) => item.id);
    const { data: assignmentsData } = await supabase
      .from("gift_assignments")
      .select("wishlist_item_id, assigned_to, status")
      .in("wishlist_item_id", itemIds);

    const assignmentsMap = new Map(
      assignmentsData?.map((a) => [a.wishlist_item_id, a])
    );

    const allUserIds = [
      ...new Set([
        ...memberIds,
        ...(assignmentsData?.map((a) => a.assigned_to) || []),
      ]),
    ];

    const { data: allUsers } = await supabase
      .from("users")
      .select("id, username")
      .in("id", allUserIds);

    const usernames =
      allUsers?.reduce((acc, u) => {
        acc[u.id] = u.username;
        return acc;
      }, {} as Record<string, string>) || {};

    const usersWithWishlists = memberIds
      .map((id) => {
        const userItems = items.filter((item) => item.user_id === id);
        const carouselItems = userItems.map((item) => {
          const assignment = assignmentsMap.get(item.id);
          const assignedUsername = assignment
            ? usernames[assignment.assigned_to]
            : undefined;
          return {
            id: item.id,
            name: item.item_name,
            description: item.description,
            link: item.link,
            image_url: item.image_url,
            price: item.price,
            user_id: item.user_id,
            assignment,
            assignedUsername,
          };
        });

        return {
          id,
          username: usernames[id],
          items: carouselItems,
        };
      })
      .filter((user) => user.items.length > 0);

    return (
      <div className="font-raleway mx-auto max-w-[1000px] bg-[#f7f9fb] min-h-screen mt-20 rounded-t-3xl p-6 md:p-0 pb-10">
        <NavBar />
        <div className="mb-4 md:p-6 md:pt-20">
          <Link href="/groups" className="text-primary_text font-raleway">
            {"< "}Back
          </Link>
        </div>
        <div className="flex flex-col md:p-6">
          <div
            className="flex flex-row 
                font-bold mb-4 text-primary_text font-raleway text-left 
                relative"
          >
            <h1 className="text-3xl ">Wishlists for {groupDetails?.name}</h1>
          </div>
          <div className="flex">
            <div className=" bg-green-600 rounded-md">
              <Link
                href={`/dashboard/?groupId=${groupId}`}
                className="flex transition-transform transform active:scale-90 text-white px-4 py-2"
              >
                <p>Add to my wishlist for {groupDetails?.name}</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="py-12 md:px-6">
          <WishlistViewWrapper
            usersWithWishlists={usersWithWishlists}
            groupId={groupId}
            groupName={groupDetails?.name}
            currentUserId={user.id}
            showGiftAssignments={!groupDetails?.hide_gift_getters}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    return (
      <div className="max-w-4xl mx-auto p-6 font-raleway">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary_text">
          Group Wishlists
        </h1>
        <p className="text-center text-red-500">
          Error loading items. Please try again later.
        </p>
      </div>
    );
  }
}
