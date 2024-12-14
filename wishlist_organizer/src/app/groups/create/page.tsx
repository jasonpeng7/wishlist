// src/app/groups/create/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../utils/supabase';

const CreateGroupPage: React.FC = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      // Create the group
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .insert([
          { name: groupName, creator_id: userId }
        ])
        .select()
        .single();

      if (groupError) throw groupError;

      // Add creator as admin in user_groups
      const { error: memberError } = await supabase
        .from('user_groups')
        .insert([
          { 
            user_id: userId, 
            group_id: group.id, 
            role: 'admin' 
          }
        ]);

      if (memberError) throw memberError;

      router.push('/groups');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-[50px] max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-8">Create New Group</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupPage;