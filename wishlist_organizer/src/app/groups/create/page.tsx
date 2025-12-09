// src/app/groups/create/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import Santa from "@/app/components/Santa";
import "../../manage-group.css"; // Reuse card styles

interface User {
  id: string;
  username: string;
}

const CreateGroupPage: React.FC = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        router.push("/signin");
      }
    };
    fetchUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to create a group.");
      return;
    }

    try {
      // create group in db
      const { data: group, error: groupError } = await supabase
        .from("groups")
        .insert([{ name: groupName, creator_id: user.id }])
        .select()
        .single();

      if (groupError) throw groupError;

      // Add creator as admin in user_groups
      const { error: memberError } = await supabase.from("user_groups").insert([
        {
          user_id: user.id,
          group_id: group.id,
          role: "admin",
        },
      ]);

      if (memberError) throw memberError;

      // redirect to manage page for the created group
      router.push(`/groups/${group.id}/manage`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while creating the group.");
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090a0f]">
      {/* Snow Effect */}
      <div className="snow-container absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 5 + 5}px`,
              height: `${Math.random() * 5 + 5}px`,
            }}
          />
        ))}
      </div>

      <Santa />

      <div className="relative z-10 font-raleway max-w-[600px] mx-auto bg-[#f7f9fb] min-h-screen mt-20 rounded-t-3xl p-6 md:p-10 shadow-2xl christmas-card">
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#c41e3a] drop-shadow-sm border-b-4 border-[#0b6b3a] pb-2 px-4 inline-block transform -rotate-1">
            Create New Group 🎁
          </h1>
        </div>

        <div className="bg-[#f0f0f0] p-8 rounded-xl border-2 border-dashed border-[#0b6b3a] shadow-inner">
          <p className="text-[#4a3b2a] mb-6 text-center italic">
            Start a new tradition! Give your group a festive name to begin.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#0b6b3a] mb-2 uppercase tracking-wide">
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="mt-1 block w-full rounded-md px-4 py-3 bg-white border-2 border-[#c41e3a] text-xl font-medium text-[#4a3b2a] focus:ring-4 focus:ring-[#0b6b3a]/30 focus:border-[#0b6b3a] outline-none shadow-sm transition-all placeholder-gray-300"
                placeholder="e.g. The Griswold Family"
                required
              />
            </div>

            {error && (
              <div className="mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700 font-bold shadow-sm flex items-center">
                <span className="mr-2 text-xl">❄️</span> {error}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t border-gray-300">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-[#4a3b2a] hover:text-[#c41e3a] font-bold px-4 py-2
                  transition-transform transform active:scale-95 flex items-center"
              >
                <span>←</span> <span className="ml-1">Cancel</span>
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#c41e3a] text-white font-bold px-8 py-3 rounded-full hover:bg-[#a01830]
                  transition-all transform active:scale-95 shadow-lg border-2 border-white hover:shadow-xl flex items-center justify-center"
              >
                Create Group <span className="ml-2">🎄</span>
              </button>
            </div>
          </form>
        </div>

        {/* Festive decoration at bottom */}
        <div className="mt-8 text-center opacity-50">
          <div className="inline-block border-t-2 border-gray-300 w-16 mx-2 mb-1"></div>
          <span className="text-2xl">🎅</span>
          <div className="inline-block border-t-2 border-gray-300 w-16 mx-2 mb-1"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;
