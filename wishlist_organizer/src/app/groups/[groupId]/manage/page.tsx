import { currentUser, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabase } from '../../../../../utils/supabase';
import { revalidatePath } from 'next/cache';

interface GroupDetails {
  id: string;
  name: string;
  creator_id: string;
  created_at: string;
  invite_code: string | null;
}

interface UserGroup {
  user_id: string;
  role: string;
}

interface MemberDetail extends UserGroup {
  user: {
    name: string;
    email: string;
  };
}

export default async function ManageGroupPage({
  params,
}: {
  params: { groupId: string };
}) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Fetch group details with invite_code
  const { data: group } = await supabase
    .from('groups')
    .select('*')
    .eq('id', params.groupId)
    .single() as { data: GroupDetails | null };

  if (!group || group.creator_id !== user.id) {
    redirect('/groups');
  }

  // Fetch group members from user_groups
  const { data: members } = await supabase
    .from('user_groups')
    .select('user_id, role')
    .eq('group_id', params.groupId) as { data: UserGroup[] | null };

  // Fetch user details from Clerk
  let memberDetails: MemberDetail[] = [];
  if (members && members.length > 0) {
    const clerk = await clerkClient();
    const clerkUsersResponse = await clerk.users.getUserList({
      userId: members.map(member => member.user_id),
    });
    
    memberDetails = members.map(member => {
      const clerkUser = clerkUsersResponse.data.find(u => u.id === member.user_id);
      return {
        ...member,
        user: {
          name: clerkUser ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'N/A' : 'N/A',
          email: clerkUser?.emailAddresses[0]?.emailAddress || 'N/A'
        }
      };
    });
  }

  async function generateInviteCode(formData: FormData) {
    'use server';
    
    const groupId = formData.get('groupId') as string;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { error } = await supabase
      .from('groups')
      .update({ invite_code: code })
      .eq('id', groupId);

    if (error) {
      console.error('Error generating invite code:', error);
      return;
    }

    revalidatePath(`/groups/${groupId}/manage`);
  }

  async function removeMember(formData: FormData) {
    'use server';
    
    const groupId = formData.get('groupId') as string;
    const userId = formData.get('userId') as string;

    // Don't allow removing if it's the creator
    if (group?.creator_id === userId) {
      return;
    }

    const { error } = await supabase
      .from('user_groups')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error removing member:', error);
      return;
    }

    revalidatePath(`/groups/${groupId}/manage`);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage {group.name}</h1>
      
      {/* Invite Code Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Invite Code</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Share this code to invite members:</p>
              <p className="text-2xl font-mono">{group.invite_code || 'No code generated'}</p>
            </div>
            <form action={generateInviteCode}>
              <input type="hidden" name="groupId" value={group.id} />
              <button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Generate New Code
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Group Settings Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Group Settings</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Add group settings form here */}
        </div>
      </section>

      {/* Members Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Members</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memberDetails.map((member) => (
                <tr key={member.user_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {member.user_id !== group.creator_id && (
                      <form action={removeMember} className="inline">
                        <input type="hidden" name="groupId" value={group.id} />
                        <input type="hidden" name="userId" value={member.user_id} />
                        <button 
                          type="submit"
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {memberDetails.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No members found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}