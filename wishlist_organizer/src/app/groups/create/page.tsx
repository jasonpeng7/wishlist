// src/app/groups/create/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import NavBar from "@/app/components/navbar";

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

      router.push("/groups");
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
    <div>
      <NavBar />
      <div className="max-w-lg font-raleway bg-midnight_blue h-screen items-center justify-center mx-auto px-[20px]">
        <div className="mx-auto items-center justify-center">
          <h1 className="pt-[100px] text-2xl font-bold mb-8 text-primary_text">
            Create New Group
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary_text">
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full p-2 border rounded bg-primary_text"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-primary_text hover:text-washed_gray
                transition-transform transform active:scale-90"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-washed_gray text-white px-6 py-2 rounded-md 
                transition-transform transform active:scale-90"
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;
