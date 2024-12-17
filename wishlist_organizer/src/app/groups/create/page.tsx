// src/app/groups/create/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../utils/supabase';
import NavBar from '@/app/components/navbar';

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
    <div>
        <NavBar/>
        <div className="max-w-lg font-raleway bg-midnight_blue h-screen items-center justify-center mx-auto px-[20px]">

        <div className='mx-auto items-center justify-center'>

        <h1 className="pt-[100px] text-2xl font-bold mb-8 text-primary_text">Create New Group</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm font-medium mb-1 text-primary_text">Group Name</label>
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
                className="px-4 py-2 text-primary_text hover:text-washed_gray
                transition-transform transform active:scale-90"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="bg-washed_gray text-white px-6 py-2 rounded-md 
                transition-transform transform active:scale-90"
            >
                Create Group
            </button>
            </div>
        </form>
        </div>
        </div>
    </div>
  );
};

export default CreateGroupPage;