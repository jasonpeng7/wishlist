import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabase } from '../../../../utils/supabase';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default async function JoinGroupPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  async function joinGroup(formData: FormData) {
    'use server';
    
    const userId = user?.id;
    if (!userId) {
      redirect('/sign-in');
    }

    const code = formData.get('code')?.toString().toUpperCase();
    
    if (!code) {
      console.error('Please enter an invite code');
      revalidatePath('/groups/join');
      return;
    }

    // Find group with matching invite code
    const { data: group } = await supabase
      .from('groups')
      .select('id')
      .eq('invite_code', code)
      .single();

    if (!group) {
      console.error('Invalid invite code');
      revalidatePath('/groups/join');
      return;
    }

    // Check if user is already a member
    const { data: existingMember } = await supabase
      .from('user_groups')
      .select('id')
      .eq('group_id', group.id)
      .eq('user_id', userId)
      .single();

    if (existingMember) {
      console.error('You are already a member of this group');
      revalidatePath('/groups/join');
      return;
    }

    // Add user to group
    const { error } = await supabase
      .from('user_groups')
      .insert({
        group_id: group.id,
        user_id: userId,
        role: 'member'
      });

    if (error) {
      console.error('Failed to join group');
      revalidatePath('/groups/join');
      return;
    }

    redirect('/groups');
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Join a Group</h1>
      
      <form action={joinGroup} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Enter Invite Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Enter code"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Join Group
        </button>
        <Link
        href='/groups'
        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>
        Back
        </Link>
      </form>
    </div>
  );
}