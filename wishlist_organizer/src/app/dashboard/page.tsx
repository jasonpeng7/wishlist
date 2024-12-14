import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import WishlistItems from './WishListItems';
import WishlistForm from './WishListForm';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import NavBar from '../components/navbar';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/');
  }

  return (
    <main className='flex flex-col'>
     <NavBar/>
      <div className='flex flex-col mt-[100px] mx-[100px]'>
        <h1 className='text-3xl font-raleway text-primary_text'>Start Adding Items To Your Wishlist!</h1>
        <WishlistForm userId={user.id} />
      </div>

      <div className='flex justify-center my-[30px]'>
        <h1 className='text-xl text-primary_text font-raleway'>Your Items</h1>
      </div>
      <WishlistItems userId={user.id}/>
    </main>
  );
}