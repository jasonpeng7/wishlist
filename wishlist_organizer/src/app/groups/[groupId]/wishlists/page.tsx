import { supabase } from "../../../../../utils/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import GiftAssignment from "../../../components/GiftAssignment";
import CopyLinkButton from "../../../components/CopyLinkButton";
import { getSessionUser } from "../../../../../../wishlist_organizer/utils/auth";

export const dynamic = "force-dynamic";

type WishlistItem = {
  id: string;
  user_id: string;
  group_id: string;
  item_name: string;
  description: string | null;
  store: string | null;
  created_at: string;
  link: string | null;
  gift_assignments?: {
    assigned_to: string;
    status: "will_get" | null;
  }[];
};

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

    // check if groupId is valid
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
      .select("name")
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

    // first fetch all wishlist items for group
    // then in a SEPARATE query, fetch all the gift assignments for the items
    // finally, pass fresh assignment data to GiftComponent param
    const { data: items, error: itemsError } = await supabase
      .from("wishlists")
      .select(`*`)
      .in("user_id", memberIds)
      .eq("group_id", groupId)
      .order("created_at", { ascending: false });

    if (itemsError) throw itemsError;
    if (!items) {
      // Handle case where there are no items
      return <p>No wishlist items found for this group.</p>;
    }

    // Get all assignments for the fetched items in a separate query
    const itemIds = items.map((item) => item.id);
    const { data: assignmentsData } = await supabase
      .from("gift_assignments")
      .select("wishlist_item_id, assigned_to, status")
      .in("wishlist_item_id", itemIds);

    // Create a Map for quick lookup of assignments by item ID
    const assignmentsMap = new Map(
      assignmentsData?.map((a) => [a.wishlist_item_id, a])
    );

    // Get usernames for group members
    const usernames = await Promise.all(
      memberIds.map(async (id) => {
        const { data: user } = await supabase
          .from("users")
          .select("username")
          .eq("id", id)
          .single();
        return { id, username: user?.username || "Unknown User" };
      })
    ).then((users) =>
      users.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {} as { [key: string]: string })
    );

    // Group items by user_id
    const userWishlists = items.reduce(
      (acc: { [key: string]: WishlistItem[] }, item) => {
        if (!acc[item.user_id]) {
          acc[item.user_id] = [];
        }
        acc[item.user_id].push(item);
        return acc;
      },
      {}
    );

    return (
      <div className="font-raleway">
        <div className="pt-[100px] flex flex-col">
          <div
            className="flex flex-row justify-center items-center
                font-bold mb-6 text-primary_text font-raleway text-center 
                mx-[25px] md:mx-[50px] p-4 relative bg-[radial-gradient(circle,_#ffffff33_2px,_transparent_2px)] 
                bg-[size:20px_20px]"
          >
            <h1 className="text-2xl">Wishlists for {groupDetails?.name}</h1>
          </div>

          <div className="flex justify-center sm:justify-end">
            <div className="w-fit mx-[25px] md:mx-[50px] bg-bone rounded-md">
              <Link
                href="/dashboard"
                className="flex transition-transform transform active:scale-90 text-dark_gray px-6 py-2"
              >
                <p>Add to my wishlist for {groupDetails?.name}</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="my-12">
          {Object.keys(userWishlists || {}).length === 0 ? (
            <div className="my-12 mx-8 md:mx-16">
              <p className="text-primary_text font-raleway text-center text-lg">
                No wishlists for this group yet. Be the first to add one!
              </p>
            </div>
          ) : (
            Object.entries(userWishlists || {}).map(([userId, userItems]) => (
              <div key={userId} className="my-12 mx-8 md:mx-16">
                <h3 className="text-2xl font-bold mb-4 capitalize text-primary_text font-raleway break-words">
                  {usernames[userId]}&apos;s Wishlist
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {userItems.map((item: WishlistItem) => {
                    const assignment = assignmentsMap.get(item.id);
                    const assignedUsername = assignment
                      ? usernames[assignment.assigned_to]
                      : undefined;

                    return (
                      <div
                        key={item.id}
                        className="font-raleway p-4 rounded-md bg-dark_gray h-[310px] text-primary_text"
                      >
                        <h3 className="font-bold text-lg bg-dark_gray break-words line-clamp-1 mb-[10px]">
                          {item.item_name}
                        </h3>

                        <p className="bg-dark_gray break-words line-clamp-1 mb-[10px]">
                          {item.store ? item.store : "\u00A0"}
                        </p>

                        {user.id !== userId ? (
                          <div className="h-1/3 overflow-hidden relative bg-darker_gray text-primary_text rounded-md mb-[15px]">
                            <div className="overflow-y-auto h-full p-[5px]">
                              {item.description && (
                                <p className="break-words whitespace-normal">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-1/3">
                            <p className="text-dark_gray italic bg-green-400 px-2 rounded-full">
                              This is your item
                            </p>
                          </div>
                        )}

                        {item.link ? (
                          <div className="mb-[15px] flex justify-center items-center">
                            <CopyLinkButton link={item.link} />
                          </div>
                        ) : (
                          <div className="mb-[15px] flex justify-center items-center">
                            <p className="italic">No Link</p>
                          </div>
                        )}

                        <div className="flex flex-col justify-start items-left gap-y-[10px]">
                          <GiftAssignment
                            itemId={item.id}
                            userId={user.id}
                            creatorId={item.user_id}
                            currentAssignment={assignment}
                            assignedUsername={assignedUsername}
                          />
                          <p className="text-sm mt-0">
                            Added on:{" "}
                            {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
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
