import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import Link from 'next/link';
import NavBar from '@/app/components/navbar';

interface UserGroup {
  user_id: string;
}

interface GroupDetails {
  id: string;
  name: string;
  creator_id: string;
  created_at: string;
  user_groups: UserGroup[];
}

interface MemberGroupResponse {
  group: {
    id: string;
    name: string;
    creator_id: string;
    created_at: string;
    user_groups: UserGroup[];
  };
}

export default async function GroupsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Fetch groups where user is admin
  const { data: adminGroups } = await supabase
    .from('groups')
    .select(`
      *,
      user_groups (
        user_id
      )
    `)
    .eq('creator_id', user.id) as { data: GroupDetails[] | null };

  // Fetch groups where user is a member
  const { data: memberGroups } = await supabase
    .from('user_groups')
    .select(`
      group:groups (
        *,
        user_groups (
          user_id
        )
      )
    `)
    .eq('user_id', user.id)
    .eq('role', 'member') as { data: MemberGroupResponse[] | null };

  return (
    <div className="">
      <NavBar/>
      <div className="flex justify-between mb-8 pt-[100px] mx-[100px]">
        <h1 className="text-2xl font-bold">My Groups</h1>
        <div className="space-x-4">
          <Link
            href="/groups/create"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Create New Group
          </Link>
          <Link
            href='/groups/join'
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors'
        >
            Join a group
        </Link>
        </div>
      </div>

      {/* Groups I Manage */}
      <section className="mb-8 mx-[100px]">
        <h2 className="text-xl font-semibold mb-4">Groups I Manage</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {adminGroups?.map((group) => (
            <div key={group.id} className="border p-4 rounded-lg">
              <h3 className="font-medium">{group.name}</h3>
              <p className="text-sm text-gray-600">
                Members: {group.user_groups?.length || 0}
              </p>
              <div className="mt-4 space-x-2">
                <Link
                  href={`/groups/${group.id}/manage`}
                  className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Manage Group
                </Link>
              </div>
            </div>
          ))}
        </div>
        {(!adminGroups || adminGroups.length === 0) && (
          <p className="text-gray-500">You don't manage any groups yet.</p>
        )}
      </section>

      {/* Groups I'm In */}
      <section className='mx-[100px]'>
        <h2 className="text-xl font-semibold mb-4">Groups I'm In</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {memberGroups?.map((memberGroup) => (
            <div key={memberGroup.group.id} className="border p-4 rounded-lg">
              <h3 className="font-medium">{memberGroup.group.name}</h3>
              <p className="text-sm text-gray-600">
                Members: {memberGroup.group.user_groups?.length || 0}
              </p>
              <div className="mt-4">
                <Link
                  href={`/groups/${memberGroup.group.id}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Group
                </Link>
              </div>
            </div>
          ))}
        </div>
        {(!memberGroups || memberGroups.length === 0) && (
          <p className="text-gray-500">You're not a member of any groups yet.</p>
        )}
      </section>
    </div>
  );
}