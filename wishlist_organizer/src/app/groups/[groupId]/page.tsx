import { currentUser, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabase } from '../../../../utils/supabase';
import Link from 'next/link';

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

interface ClerkUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: Array<{ emailAddress: string }>;
}

export default async function ViewGroupPage({
  params,
}: {
  params: { groupId: string };
}) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Fetch group details
  const groupResponse = await supabase
    .from('groups')
    .select('*')
    .eq('id', params.groupId)
    .single();

  const group = groupResponse.data as GroupDetails | null;

  if (!group) {
    redirect('/groups');
  }

  // Check if user is a member or creator
  const membershipResponse = await supabase
    .from('user_groups')
    .select('role')
    .eq('group_id', params.groupId)
    .eq('user_id', user.id)
    .single();

  const membership = membershipResponse.data;

  if (!membership && group.creator_id !== user.id) {
    redirect('/groups');
  }

  // Fetch group members from user_groups
  const membersResponse = await supabase
    .from('user_groups')
    .select('user_id, role')
    .eq('group_id', params.groupId);

  const members = membersResponse.data as UserGroup[] | null;

  // Fetch user details from Clerk if we have members
  let memberDetails: MemberDetail[] = [];
  if (members && members.length > 0) {
    const userIds = members.map(member => member.user_id);
    const clerk = await clerkClient();
    const clerkUsersResponse = await clerk.users.getUserList({
      userId: userIds,
    });
    
    memberDetails = members.map(member => {
      const clerkUser = clerkUsersResponse.data.find((u: ClerkUser) => u.id === member.user_id);
      return {
        ...member,
        user: {
          name: clerkUser ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'N/A' : 'N/A',
          email: clerkUser?.emailAddresses[0]?.emailAddress || 'N/A'
        }
      };
    });
  }

  // Also get creator details
  const clerk = await clerkClient();
  const creatorResponse = await clerk.users.getUser(group.creator_id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">{group.name}</h1>
      <p className="text-sm text-gray-600 mb-6">
        Created by: {creatorResponse.firstName} {creatorResponse.lastName}
      </p>

      {/* Members Section */}
      <section>
        <Link
            href='/groups'
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors'
        >
            Back to groups
        </Link>
        <h2 className="text-xl font-semibold mb-4">Members ({memberDetails.length})</h2>
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
                </tr>
              ))}
              {memberDetails.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
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