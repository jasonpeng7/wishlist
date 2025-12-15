import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../utils/supabase';

export type MyAssignedGift = {
  id: string; // assignment id
  wishlist_item: {
    id: string;
    item_name: string;
    store?: string | null;
    link?: string | null;
    image_url?: string | null;
    description?: string | null;
    favorited?: boolean;
    user: {
      id: string;
      username: string;
    }
  }
};

export const useMyGroupAssignments = (groupId: string, currentUserId: string) => {
  return useQuery({
    queryKey: ['myGroupAssignments', groupId, currentUserId],
    queryFn: async () => {
      if (!groupId || !currentUserId) throw new Error('Group ID and User ID are required');

      // 1. Get all assignments for this user
      // Since gift_assignments is a join table (wishlist_item_id, assigned_to, status)
      // and might not have an 'id' column or direct FK relationships set up as expected for nested selects,
      // we'll fetch the IDs first and then fetch the related data manually.
      
      const { data: assignments, error: assignmentsError } = await supabase
        .from('gift_assignments')
        .select('wishlist_item_id')
        .eq('assigned_to', currentUserId)
        .eq('status', 'will_get');

      if (assignmentsError) throw assignmentsError;

      if (!assignments || assignments.length === 0) return [];

      const wishlistIds = assignments.map(a => a.wishlist_item_id);

      // 2. Fetch the wishlist items
      const { data: wishlistItems, error: itemsError } = await supabase
        .from('wishlists')
        .select(`
          id,
          item_name,
          store,
          link,
          image_url,
          description,
          favorited,
          group_id,
          user_id
        `)
        .in('id', wishlistIds)
        .eq('group_id', groupId); // Filter by group here

      if (itemsError) throw itemsError;
      if (!wishlistItems || wishlistItems.length === 0) return [];

      // 3. Fetch the users for these items
      const userIds = [...new Set(wishlistItems.map(item => item.user_id))];
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, username')
        .in('id', userIds);

      if (usersError) throw usersError;

      const userMap = new Map(users?.map(u => [u.id, u.username]));

      // 4. Construct the final result
      const UserAssignedGifts: MyAssignedGift[] = wishlistItems.map(item => ({
        id: `assignment_for_${item.id}`, // Synthetic ID since table doesn't have one
        wishlist_item: {
          id: item.id,
          item_name: item.item_name,
          store: item.store,
          link: item.link,
          image_url: item.image_url,
          description: item.description,
          favorited: item.favorited,
          user: {
            id: item.user_id,
            username: userMap.get(item.user_id) || 'Unknown User'
          }
        }
      }));

      return UserAssignedGifts;
    },
    enabled: !!groupId && !!currentUserId,
    staleTime: 1000 * 30, // 30 seconds
  });
};

