// src/app/wishlists/page.tsx
import { supabase } from "../../../utils/supabase";
import Link from "next/link";
// import { WishlistTitle } from "./WishlistTitle";
import { redirect } from "next/navigation";
import NavBar from "../components/navbar";
import GiftAssignment from "../components/GiftAssignment";
import CopyLinkButton from "../components/CopyLinkButton";
import { getSessionUser } from "../../../../wishlist_organizer/utils/auth";

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

interface Group {
  id: string;
  name: string;
}

interface UserGroup {
  group_id: string;
  groups: Group;
}

interface GroupData {
  groupId: string;
  groupName: string;
  wishlists: {
    [key: string]: WishlistItem[];
  };
  usernames: {
    [key: string]: string;
  };
}

export default async function WishlistsPage() {
  try {
    const user = await getSessionUser();

    if (!user) {
      redirect("/sign-in");
    }

    // Get user's groups with group details
    const { data: userGroups } = (await supabase
      .from("user_groups")
      .select(`group_id, groups!group_id (id,name)`)
      .eq("user_id", user.id)) as { data: UserGroup[] | null };

    if (!userGroups || userGroups.length === 0) {
      return (
        <div className="">
          <NavBar />
          <div className="flex flex-col justify-center items-center pt-[100px] gap-y-[15px]">
            <p className="text-center text-primary_text font-raleway">
              You need to be a member of a group to view wishlists.
            </p>
            <div className="flex flex-row gap-x-[30px] font-raleway">
              <Link
                href="/groups/create"
                className="bg-bone text-dark_navy px-4 py-2 rounded-md"
              >
                Create a Group
              </Link>
              <Link
                href="/groups/join"
                className="bg-bone text-dark_gray px-4 py-2 rounded-md"
              >
                Join a Group
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // For each group, get members and their wishlists
    const groupData = (await Promise.all(
      userGroups.map(async (userGroup) => {
        // Get group members
        const { data: groupMembers } = await supabase
          .from("user_groups")
          .select("user_id")
          .eq("group_id", userGroup.group_id);

        if (!groupMembers) return null;

        const memberIds = groupMembers.map((member) => member.user_id);

        // Get wishlists for group members
        const { data: items } = await supabase
          .from("wishlists")
          .select(
            `
          *,
          gift_assignments (
            assigned_to,
            status
          )
        `
          )
          .in("user_id", memberIds)
          .eq("group_id", userGroup.group_id)
          .order("created_at", { ascending: false });

        // Get usernames for group members
        const usernames: { [key: string]: string } = {};
        for (const id of memberIds) {
          const { data: user } = await supabase
            .from("users")
            .select("username")
            .eq("id", id)
            .single();
          usernames[id] = user?.username || "Unknown User";
        }

        // Group items by user_id
        const userWishlists = items?.reduce(
          (acc: { [key: string]: WishlistItem[] }, item) => {
            if (!acc[item.user_id]) {
              acc[item.user_id] = [];
            }
            acc[item.user_id].push(item);
            return acc;
          },
          {}
        );

        return {
          groupId: userGroup.group_id,
          groupName: userGroup.groups.name,
          wishlists: userWishlists || {},
          usernames,
        };
      })
    )) as (GroupData | null)[];

    return (
      <div>
        <NavBar />
        <div className="flex justify-center items-center pt-20">
          <h1 className="text-2xl font-bold text-primary_text font-raleway">
            Your Groups&apos; Wishlists!
          </h1>
        </div>

        {groupData.map(
          (group) =>
            group && (
              <div key={group.groupId} className="my-12">
                <h2
                  className="
                  text-2xl 
                  font-bold 
                  mb-6 
                  text-primary_text 
                  font-raleway 
                  text-center 
                  mx-[25px] 
                  md:mx-[50px]
                  p-4
                  relative
                  bg-[radial-gradient(circle,_#ffffff33_2px,_transparent_2px)] 
                  bg-[size:20px_20px]"
                >
                  {group.groupName}
                </h2>

                {Object.entries(group.wishlists).map(([userId, userItems]) => (
                  <div key={userId} className="my-12 mx-8 md:mx-16">
                    <h3 className="text-2xl font-bold mb-4 capitalize text-primary_text font-raleway break-words">
                      {group.usernames[userId]}&apos;s Wishlist
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {userItems.map((item: WishlistItem) => {
                        const assignment = item.gift_assignments?.[0];
                        const assignedUsername = assignment
                          ? group.usernames[assignment.assigned_to]
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
                              <>
                                <div className="h-1/3 overflow-hidden relative bg-darker_gray text-primary_text rounded-md mb-[15px]">
                                  <div className="overflow-y-auto h-full p-[5px]">
                                    {item.description && (
                                      <p className="break-words whitespace-normal">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </>
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
                ))}
              </div>
            )
        )}
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
