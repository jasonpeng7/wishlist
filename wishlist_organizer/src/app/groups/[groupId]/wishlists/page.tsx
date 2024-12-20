import { supabase } from '../../../../../utils/supabase';
import Link from 'next/link';
import { WishlistTitle } from "../../../wishlists/WishlistTitle";
import { getUsersByIds } from '../../../../../utils/clerk';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NavBar from "../../../components/navbar";
import GiftAssignment from "../../../components/GiftAssignment";
import CopyLinkButton from "../../../components/CopyLinkButton";
import { group } from 'console';

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
    assigned_to: string,
    status: 'will_get' | null;
  }[];
};

export default async function GroupWishlistsPage({ params }: {params: { groupId : string }}) {
  const groupId = params.groupId; 
  try {
    const user = await currentUser();

    if (!user) {
      redirect('/sign-in');
    }


    // Validate groupId
    if (!groupId) {
      return (
        <div className="flex flex-col justify-center items-center pt-[100px]">
          <p className="text-primary_text font-raleway text-center">Invalid group ID. Please select a valid group.</p>
        </div>
      );
    }

    const { data: groupDetails } = await supabase
        .from('groups')
        .select('name')
        .eq('id', groupId)
        .single();

    // Get group members
    const { data: groupMembers } = await supabase
      .from('user_groups')
      .select('user_id')
      .eq('group_id', groupId);

    if (!groupMembers || groupMembers.length === 0) {
      return (
        <div className="">
          <NavBar/>
          <div className='flex flex-col justify-center items-center pt-[100px] font-raleway gap-y-[25px]'>
            <p className="text-primary_text font-raleway text-center">No members found for this group.</p>
            <Link href="/groups" className='flex rounded-md bg-bone transition-transform transform active:scale-90 text-dark_gray px-6 py-2'>
                <p>Back to groups</p>
            </Link>
          </div>
        </div>
      );
    }

    const memberIds = groupMembers.map(member => member.user_id);

    // Get wishlists for group members
    const { data: items } = await supabase
      .from('wishlists')
      .select(`
        *,
        gift_assignments (
          assigned_to,
          status
        )
      `)
      .in('user_id', memberIds)
      .eq('group_id', groupId)
      .order('created_at', { ascending: false });

    // Get usernames for group members
    const usernames = await getUsersByIds(memberIds);

    // Group items by user_id
    const userWishlists = items?.reduce((acc: { [key: string]: WishlistItem[] }, item) => {
      if (!acc[item.user_id]) {
        acc[item.user_id] = [];
      }
      acc[item.user_id].push(item);
      return acc;
    }, {});

    return (
      <div className='font-raleway'>
        <NavBar />

        <div className='pt-[100px] flex flex-col'>
            <div className="flex flex-row justify-center items-center
                font-bold mb-6 text-primary_text font-raleway text-center 
                mx-[25px] md:mx-[50px] p-4 relative bg-[radial-gradient(circle,_#ffffff33_2px,_transparent_2px)] 
                bg-[size:20px_20px]">
                <h1 className="text-2xl">
                    Wishlists for {groupDetails?.name}
                </h1>
            </div>

            <div className='flex justify-center sm:justify-end'>
                <div className='w-fit mx-[25px] md:mx-[50px] bg-bone rounded-md'>
                    <Link 
                    href="/dashboard"
                    className='flex transition-transform transform active:scale-90 text-dark_gray px-6 py-2'>
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
              {usernames[userId]}'s Wishlist
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userItems.map((item: WishlistItem) => {
                const assignment = item.gift_assignments?.[0];
                const assignedUsername = assignment ? usernames[assignment.assigned_to] : undefined;

                return (
                  <div key={item.id} className="font-raleway p-4 rounded-md bg-dark_gray h-[310px] text-primary_text">
                    <h3 className="font-bold text-lg bg-dark_gray break-words line-clamp-1 mb-[10px]">
                      {item.item_name}
                    </h3>

                    <p className="bg-dark_gray break-words line-clamp-1 mb-[10px]">
                      {item.store ? item.store : '\u00A0'}
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
                        <p className="text-dark_gray italic bg-green-400 px-2 rounded-full">This is your item</p>
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
                        Added on: {new Date(item.created_at).toLocaleDateString()}
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
    console.error('Error fetching wishlists:', error);
    return (
      <div className="max-w-4xl mx-auto p-6 font-raleway">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary_text">Group Wishlists</h1>
        <p className="text-center text-red-500">Error loading items. Please try again later.</p>
      </div>
    );
  }
}
