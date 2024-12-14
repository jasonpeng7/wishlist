// utils/clerk.ts
import { currentUser, clerkClient } from '@clerk/nextjs/server';

export async function getUsersByIds(userIds: string[]) {
  try {
    console.log('Fetching users for IDs:', userIds);
    
    const promises = userIds.map(userId => 
      fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
    );

    const users = await Promise.all(promises);
    
    console.log('Received users from Clerk:', users);

    return users.reduce((acc, user) => {
      if (!user || user.errors) return acc;
      
      const displayName = 
        user.first_name || 
        `${user.first_name || ''} ${user.last_name || ''}`.trim() || 
        user.email_addresses?.[0]?.email_address || 
        'Anonymous User';
      
      acc[user.id] = displayName;
      return acc;
    }, {} as { [key: string]: string });

  } catch (error) {
    console.error('Error fetching users from Clerk:', error);
    return {};
  }
}