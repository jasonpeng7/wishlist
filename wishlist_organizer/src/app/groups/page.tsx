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
      <div className="font-raleway flex flex-col md:flex-row justify-between items-center mb-8 pt-[100px] md: mx-[50px] md:mx-[100px] text-primary_text">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">My Groups</h1>
      </div>

      {/* Groups I Manage */}
      <section className="mb-8 mx-[50px] md:mx-[100px] font-raleway text-primary_text">
        <h2 className="text-xl font-semibold mb-4">Groups I Manage</h2>
        <div className='flex mb-4 '>
          <Link              
                href="/groups/create"         
                className="bg-bone px-4 py-2 rounded-lg 
                transition-transform transform active:scale-90 
                flex items-center justify-center text-center"         
                >             
                <p className='text-dark_gray'>Create a group</p> 
            </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {adminGroups?.map((group) => (
            <div key={group.id} className="bg-midnight_blue p-4 rounded-lg">
              <h3 className="font-medium">{group.name}</h3>
              <p className="text-sm text-primary_text">
                Members: {group.user_groups?.length || 0}
              </p>

              <div className="mt-4 flex flex-row justify-center lg:justify-start space-x-4">
                <Link
                  href={`/groups/${group.id}/manage`}
                  className="flex w-1/3 text-xs items-center justify-center bg-washed_gray hover:underline text-white px-4 py-2 rounded 
                  transition-transform transform active:scale-90"
                >
                  Manage Group
                </Link>
                <Link
                  href={`/groups/${group.id}/wishlists`}
                  className="flex w-1/3 text-xs items-center justify-center bg-bone text-dark_gray px-4 py-2 rounded 
                  transition-transform transform active:scale-90"
                >
                  View Wishlists
                </Link>
              </div>

            </div>
          ))}
        </div>
        {(!adminGroups || adminGroups.length === 0) && (
          <p className="text-gray-500">You haven't created any groups yet. Create one before you start making a wishlist!</p>
        )}
      </section>

      {/* Groups I'm In */}
      <section className='mx-[50px] md:mx-[100px] font-raleway mb-[50px]'>
        <h2 className="text-xl font-semibold mb-4 text-primary_text">Groups I'm In</h2>
        <div className='flex mb-4'>
          <Link              
              href="/groups/join"         
              className="bg-bone px-4 py-2 rounded-lg 
              transition-transform transform active:scale-90 
              flex items-center justify-center"         
              >             
              <p className='text-dark_gray'>Join a group</p> 
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {memberGroups?.map((memberGroup) => (
            <div key={memberGroup.group.id} className="bg-midnight_blue p-4 rounded-lg">
              <h3 className="font-medium text-primary_text">{memberGroup.group.name}</h3>
              <p className="text-sm text-primary_text">
                Members: {memberGroup.group.user_groups?.length || 0}
              </p>
              <div className="mt-4 space-x-4 flex justify-center lg:justify-start"> 
                <Link
                  href={`/groups/${memberGroup.group.id}`}
                  className="flex w-1/3 text-xs bg-washed_gray text-primary_text hover:underline rounded px-4 py-2
                  transition-transform transform active:scale-90
                  items-center justify-center"
                >
                  View Group
                </Link>
                <Link
                  href={`/groups/${memberGroup.group.id}/wishlists`}
                  className="flex w-1/3 text-xs items-center justify-center bg-bone text-dark_gray px-4 py-2 rounded 
                  transition-transform transform active:scale-90"
                >
                  View Wishlists
                </Link>
              </div>
            </div>
          ))}
        </div>
        {(!memberGroups || memberGroups.length === 0) && (
          <p className="text-gray-500">You're not a member of any groups yet. Join one before making your wishlist!</p>
        )}
      </section>
    </div>
  );
}