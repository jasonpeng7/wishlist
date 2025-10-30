"use client";

import { useState, useEffect } from 'react';
import OnboardingModal from '../components/OnboardingModal';
import { supabase } from '../../../utils/supabase';
import WishlistItems from "./WishListItems";
import WishlistForm from "./WishListForm";
import NavBar from "../components/navbar";
import RibbonDivider from '../components/RibbonDivider';

interface User {
  id: string;
}

interface DashboardViewProps {
  user: User;
}

export default function DashboardView({ user }: DashboardViewProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkGroupsAndOnboarding = async () => {
      const hasBeenOnboarded = localStorage.getItem('onboarded');
      if (hasBeenOnboarded === 'true') {
        return;
      }

      const { data: groups, error } = await supabase
        .from('user_groups')
        .select('group_id', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Error fetching user groups:', error);
        return;
      }
      
      const groupCount = groups ? groups.length : 0;
      if (groupCount === 0) {
        setShowOnboarding(true);
      }
    };

    checkGroupsAndOnboarding();
  }, [user.id]);

  return (
    <>
      {showOnboarding && <OnboardingModal userId={user.id} />}
      <main className="min-h-screen bg-[#474853] pt-20 christmas-stripes">
        <NavBar />
        <div className="bg-[#f7f9fb] rounded-t-3xl md:mt-[100px] md:mx-8 lg:mx-auto lg:max-w-[1000px]">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-primary_text mb-2 text-center">
                Start Adding Items To Your Wishlist!
              </h1>
              <RibbonDivider />
              <div className="w-full">
                <WishlistForm userId={user.id} />
              </div>
            </div>
            <div className="flex justify-start my-8">
              <h1 className="text-xl text-primary_text font-raleway">
                You&apos;re currently wishing for...
              </h1>
            </div>
            <WishlistItems userId={user.id} />
          </div>
        </div>
      </main>
    </>
  );
}
