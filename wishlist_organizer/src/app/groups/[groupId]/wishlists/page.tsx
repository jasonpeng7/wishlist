import { supabase } from "../../../../../utils/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import GiftAssignment from "../../../components/GiftAssignment";
import CopyLinkButton from "../../../components/CopyLinkButton";
import { getSessionUser } from "../../../../../../wishlist_organizer/utils/auth";
import WishlistCarousel from "../../../components/WishlistCarousel";
import NavBar from "@/app/components/navbar";

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
  image_url?: string | null;
  price?: number | null;
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
    const itemsPromise = supabase
      .from("wishlists")
      .select(`*`)
      .in("user_id", memberIds)
      .eq("group_id", groupId)
      .order("created_at", { ascending: false });

    const usernamesPromise = Promise.all(
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

    const [{ data: items, error: itemsError }, usernames] = await Promise.all([
      itemsPromise,
      usernamesPromise,
    ]);

    if (itemsError) throw itemsError;
    if (!items) {
      // Handle case where there are no items
      return <p>No wishlist items found for this group.</p>;
    }

    // A fresh approach to preparing data for the carousel
    const usersWithWishlists = memberIds
      .map(id => {
        const userItems = items.filter(item => item.user_id === id);
        // Map to the structure expected by WishlistCarousel
        const carouselItems = userItems.map(item => ({
          id: item.id,
          name: item.item_name,
          description: item.description,
          link: item.link,
          image_url: item.image_url, // Pass the image_url to the component
          price: item.price,
        }));

        return {
          id,
          username: usernames[id],
          items: carouselItems,
        };
      })
      .filter(user => user.items.length > 0);


    return (
      <div className="font-raleway pb-[100px]">
        <NavBar />
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
          {usersWithWishlists.length === 0 ? (
            <div className="my-12 mx-8 md:mx-16">
              <p className="text-primary_text font-raleway text-center text-lg">
                No wishlists for this group yet. Be the first to add one!
              </p>
            </div>
          ) : (
            usersWithWishlists.map(user => (
              <div key={user.id} className="my-12 mx-8 md:mx-16">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold capitalize text-primary_text font-raleway break-words">
                    {user.username}&apos;s Wishlist
                  </h3>

                </div>
                <WishlistCarousel items={user.items} shelfTitle={`${user.username}'s Wishlist`} />
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
