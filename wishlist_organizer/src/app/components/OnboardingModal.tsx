"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import {Gift, PartyPopper, Copy} from "lucide-react";

interface OnboardingModalProps {
  userId: string;
}

export default function OnboardingModal({ userId }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasBeenOnboarded = localStorage.getItem('onboarded');
    if (hasBeenOnboarded !== 'true') {
      setShowModal(true);
    }
  }, []);

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }

    try {
      // Create group in db
      const { data: group, error: groupError } = await supabase
        .from("groups")
        .insert([{ name: groupName, creator_id: userId }])
        .select()
        .single();

      if (groupError) throw groupError;

      // Add creator as admin in user_groups
      const { error: memberError } = await supabase.from("user_groups").insert([
        {
          user_id: userId,
          group_id: group.id,
          role: "admin",
        },
      ]);

      if (memberError) throw memberError;

      // Generate and set invite code
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const { error: updateError } = await supabase
        .from('groups')
        .update({ invite_code: code })
        .eq('id', group.id);

      if (updateError) throw updateError;
      
      setInviteCode(code);
      setStep(2);
    } catch (err) {
      console.error("Error creating group:", err);
      alert("Failed to create group.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset after 2 seconds
  };

  const handleFinish = () => {
    localStorage.setItem('onboarded', 'true');
    setShowModal(false);
    router.push('/dashboard');
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-raleway">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center">
        {step === 1 && (
          <div>
            <PartyPopper size={48} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-primary_text">Welcome to Wishr!</h2>
            <p className="text-gray-600 mb-6">Let's get you started by creating your first group.</p>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Family Christmas"
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button
              onClick={handleCreateGroup}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Group
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-primary_text">Group Created!</h2>
            <p className="text-gray-600 mb-6">Share this code to invite friends and family.</p>
            <div className="bg-gray-100 p-4 rounded-lg my-4 flex items-center justify-center font-mono text-2xl tracking-widest">
              <span>{inviteCode}</span>
              <button onClick={handleCopy} className="ml-4 p-2 rounded-lg hover:bg-gray-200 transition">
                <Copy size={24} />
              </button>
            </div>
            {isCopied && <p className="text-green-500 text-sm mb-4">Copied to clipboard!</p>}
            <button
              onClick={() => setStep(3)}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <Gift size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-primary_text">You're All Set!</h2>
            <p className="text-gray-600 mb-6">Start building your wishlist and see what others are wishing for.</p>
            <button
              onClick={handleFinish}
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition mt-4"
            >
              Go to My Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
