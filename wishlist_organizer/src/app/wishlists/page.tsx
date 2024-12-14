// src/app/wishlists/page.tsx
import { supabase } from "../../../utils/supabase";
import Link from 'next/link';
import { WishlistTitle } from "./WishlistTitle";
import { getUsersByIds } from '../../../utils/clerk';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NavBar from "../components/navbar";
import GiftAssignment from "../components/GiftAssignment";

type WishlistItem = {
  id: string;
  user_id: string;
  item_name: string;
  description: string | null;
  store: string | null;
  created_at: string;
  gift_assignments?: {
    assigned_to: string,
    status: 'will_get' | null;
  }[];
}

export default async function WishlistsPage() {
    try {
      const user = await currentUser();
      
      if (!user) {
        redirect('/sign-in');
      }
  
      // Get user's group membership
      const { data: userGroups } = await supabase
        .from('user_groups')
        .select('group_id')
        .eq('user_id', user.id);
  
      if (!userGroups || userGroups.length === 0) {
        return (
          <div className="p-[50px]">
            <div className="flex justify-end mt-4 mb-6">
              <Link
                href='/dashboard'
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
              >
                Dashboard
              </Link>
            </div>
            <p className="text-center text-gray-500">You need to be a member of a group to view wishlists.</p>
          </div>
        );
      }
  
      // Get all members from the user's groups
      const { data: groupMembers } = await supabase
        .from('user_groups')
        .select('user_id')
        .in('group_id', userGroups.map(g => g.group_id));
  
      if (!groupMembers) throw new Error('Failed to fetch group members');
  
      // Get unique member IDs
      const memberIds = [...new Set(groupMembers.map(member => member.user_id))];
  
      // Get wishlists with gift assignments
      const { data: items, error } = await supabase
        .from('wishlists')
        .select(`
          *,
          gift_assignments (
            assigned_to,
            status
          )
        `)
        .in('user_id', memberIds)
        .order('created_at', { ascending: false });
  
      if (error) throw error;
  
      // Fetch usernames from Clerk
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
        <div>
          <NavBar/>
          <div className="flex justify-center items-center pt-20">
            <h1 className="text-2xl font-bold text-primary_text font-raleway">Your Group's Wishlists!</h1>
          </div>
          
          {Object.entries(userWishlists || {}).map(([userId, userItems]) => (
            <div key={userId} className="my-12 mx-8 md:mx-16">
              <h2 className="text-2xl font-bold mb-4 capitalize text-primary_text font-raleway break-words">
                {usernames[userId]}'s Wishlist
              </h2>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userItems.map((item: WishlistItem) => {
  // Find the gift assignment for this item
  const assignment = item.gift_assignments?.[0];
  const assignedUsername = assignment ? usernames[assignment.assigned_to] : undefined;

  return (
    <div key={item.id} className="font-raleway p-4 rounded-md bg-dark_gray h-60 text-primary_text">
      <h3 className="font-bold text-lg bg-dark_gray break-words line-clamp-1 mb-[10px]">
        {item.item_name}
      </h3>
      
      {item.store && (
        <p className="bg-dark_gray break-words line-clamp-1 mb-[10px]">
          {item.store}
        </p>
      )}
      
      {/* Only show description and gift assignment if not the item owner */}
      {user.id !== userId ? (
        <>
          <div className="overflow-y-auto h-1/3">
            {item.description && (
              <p className="break-words whitespace-normal">
                {item.description}
              </p>
            )}
          </div>
          
          <GiftAssignment 
            itemId={item.id}
            userId={user.id}
            currentAssignment={assignment}
            assignedUsername={assignedUsername}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-1/2">
          <p className="text-gray-400 italic">This is your item</p>
        </div>
      )}
      
      <p className="text-sm mt-[10px]">
        Added on: {new Date(item.created_at).toLocaleDateString()}
      </p>
    </div>
  );
})}

              </div>
            </div>
          ))}
          
          {(!items || items.length === 0) && (
            <p className="text-center text-gray-500">No wishlist items found.</p>
          )}
        </div>
      );
    } catch (error) {
      console.error('Error fetching wishlists:', error);
      return (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">Group Wishlists</h1>
          <p className="text-center text-red-500">Error loading items. Please try again later.</p>
        </div>
      );
    }
  }
  