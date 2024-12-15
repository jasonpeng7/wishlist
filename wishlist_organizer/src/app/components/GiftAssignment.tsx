'use client';

import { useState } from 'react';
import { supabase } from '../../../utils/supabase';

type GiftAssignmentProps = {
  itemId: string;
  userId: string;
  currentAssignment?: {
    assigned_to: string;
    status: 'will_get' | null;
  };
  assignedUsername?: string;  // Add username of person who will get it
}

export default function GiftAssignment({ 
  itemId, 
  userId, 
  currentAssignment,
  assignedUsername 
}: GiftAssignmentProps) {
  const [isChecked, setIsChecked] = useState(currentAssignment?.status === 'will_get');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    try {
      setIsUpdating(true);
      
      if (!isChecked) {
        // Check if anyone has claimed item
        const {data: existingAssignments} = await supabase
            .from('gift_assignments')
            .select('*')
            .eq('wishlist_item_id', itemId)
            .eq('status', 'will_get');
        
        if(existingAssignments && existingAssignments.length > 0) {
            alert('Someone else has already claimed this item!');
            window.location.reload();
            return;
        }
        // Add new assignment
        const { error } = await supabase
          .from('gift_assignments')
          .upsert({
            wishlist_item_id: itemId,
            assigned_to: userId,
            status: 'will_get'
          });

        if (error) throw error;
      } else {
        // Remove assignment
        const { error } = await supabase
          .from('gift_assignments')
          .delete()
          .match({ 
            wishlist_item_id: itemId,
            assigned_to: userId, 
            status: 'will_get'
          });

        if (error) throw error;
      }

      setIsChecked(!isChecked);
      // You might want to trigger a page refresh here to update all users' views
      window.location.reload();
    } catch (error) {
      console.error('Error updating gift assignment:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Show if someone else has marked they will get it
  if (assignedUsername && currentAssignment?.assigned_to !== userId) {
    return (
      <div className="font-raleway text-sm font-medium text-green-600">
        {assignedUsername} will get this!
      </div>
    );
  }

  return (
    <div className="font-raleway  flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={isUpdating}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label className="text-sm font-medium text-primary_text">
        {isChecked ? "I will get this!" : "Mark as 'will get'"}
      </label>
    </div>
  );
}