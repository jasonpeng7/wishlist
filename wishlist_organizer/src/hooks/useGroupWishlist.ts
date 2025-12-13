import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../utils/supabase';

export type WishlistItem = {
  id: string;
  name: string;
  store?: string | null;
  description?: string | null;
  link?: string | null;
  favorited?: boolean;
  image_url?: string | null;
  price?: number | null;
  user_id: string;
  assignment?: {
    assigned_to: string;
    status: "will_get" | null;
  };
  assignedUsername?: string;
};

export type UserWishlist = {
  id: string;
  username: string;
  items: WishlistItem[];
};

export type Assignment = {
  wishlist_item_id: string;
  assigned_to: string;
  status: "will_get" | null;
};

export const useGroupWishlist = (groupId: string, currentUserId: string) => {
  return useQuery({
    queryKey: ['groupWishlist', groupId],
    queryFn: async () => {
      if (!groupId) throw new Error('Group ID is required');

      // 1. Get group details
      const { data: groupDetails, error: groupError } = await supabase
        .from("groups")
        .select("name, hide_gift_getters")
        .eq("id", groupId)
        .single();
      
      if (groupError) throw groupError;

      // 2. Get group members
      const { data: groupMembers, error: membersError } = await supabase
        .from("user_groups")
        .select("user_id")
        .eq("group_id", groupId);

      if (membersError) throw membersError;
      if (!groupMembers || groupMembers.length === 0) {
        return {
            usersWithWishlists: [] as UserWishlist[],
            groupName: groupDetails.name,
            hideGiftGetters: groupDetails.hide_gift_getters
        };
      }

      const memberIds = groupMembers.map((m) => m.user_id);

      // 3. Get wishlist items
      const { data: items, error: itemsError } = await supabase
        .from("wishlists")
        .select("*")
        .in("user_id", memberIds)
        .eq("group_id", groupId)
        .order("created_at", { ascending: false });

      if (itemsError) throw itemsError;
      
      // 4. Get assignments
      let assignmentsMap = new Map<string, Assignment>();
      if (items && items.length > 0) {
          const itemIds = items.map((item) => item.id);
          const { data: assignmentsData } = await supabase
            .from("gift_assignments")
            .select("wishlist_item_id, assigned_to, status")
            .in("wishlist_item_id", itemIds);

          if (assignmentsData) {
            assignmentsMap = new Map(
                assignmentsData.map((a) => [a.wishlist_item_id, a])
            );
          }
      }

      // 5. Get usernames
      const allUserIds = [
        ...new Set([
          ...memberIds,
          ...Array.from(assignmentsMap.values()).map(a => a.assigned_to)
        ]),
      ];

      const { data: allUsers } = await supabase
        .from("users")
        .select("id, username")
        .in("id", allUserIds);

      const usernames = allUsers?.reduce((acc, u) => {
        acc[u.id] = u.username;
        return acc;
      }, {} as Record<string, string>) || {};

      // 6. Assemble data
      const usersWithWishlists: UserWishlist[] = memberIds
        .map((id) => {
          const userItems = (items || []).filter((item) => item.user_id === id);
          const mappedItems = userItems.map((item) => {
            const assignment = assignmentsMap.get(item.id);
            const assignedUsername = assignment
            ? usernames[assignment.assigned_to]
            : undefined;

            return {
              id: item.id,
              name: item.item_name,
              store: item.store,
              description: item.description,
              link: item.link,
              favorited: item.favorited,
              image_url: item.image_url,
              price: item.price,
              user_id: item.user_id,
              assignment: assignment ? {
                assigned_to: assignment.assigned_to,
                status: assignment.status as "will_get" | null
              } : undefined,
              assignedUsername,
            };
          });

          return {
            id,
            username: usernames[id] || 'Unknown',
            items: mappedItems,
          };
        })
        .filter((user) => user.items.length > 0)
        .sort((a, b) => {
          if (a.id === currentUserId) return -1;
          if (b.id === currentUserId) return 1;
          return 0;
        });

      return {
        usersWithWishlists,
        groupName: groupDetails.name,
        hideGiftGetters: groupDetails.hide_gift_getters
      };
    },
    enabled: !!groupId && !!currentUserId,
    // staleTime: 1000 * 60 * 1, // 1 minutes
    staleTime: 1000 * 30, // 30 seconds
  });
};

