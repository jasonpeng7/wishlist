// src/app/groups/create/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import Santa from "@/app/components/Santa";
import Snowfall from "@/app/components/Snowfall";
import NavBar from "@/app/components/navbar";
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
  const [saving, setSaving] = useState(false);
  const [createdGroupId, setCreatedGroupId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) setUser(await response.json());
        else router.push("/signin");
      } catch { setError("Your session could not be loaded. Please refresh to try again."); }
    };
    fetchUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    if (!user) {
      setError("You must be logged in to create a group.");
      return;
    }

    if (!groupName.trim()) { setError("Enter a group name."); return; }
    setSaving(true);
    setError("");
    try {
      let groupId = createdGroupId;
      if (!groupId) {
        // create group in db
        const { data: group, error: groupError } = await supabase
          .from("groups")
          .insert([{ name: groupName.trim(), creator_id: user.id }])
          .select()
          .single();

        if (groupError) throw groupError;
        groupId = group.id;
        setCreatedGroupId(groupId);
      }

      // Add creator as admin in user_groups
      const { error: memberError } = await supabase.from("user_groups").insert([
        {
          user_id: user.id,
          group_id: groupId,
          role: "admin",
        },
      ]);

      if (memberError) throw memberError;

      // redirect to manage page for the created group
      router.push(`/groups/${groupId}/manage`);
    } catch (err) {
      console.error("Group creation failed:", err);
      setError("Your group setup could not be completed. Please try again.");
      setSaving(false);
    }
  };

  if (!user) {
    return <p role={error ? "alert" : "status"} className="p-8 bg-white text-slate_gray">{error || "Loading your session…"}</p>;
  }

  return (
    <div className="relative min-h-screen pb-28 overflow-hidden bg-[#090a0f]">
      {/* Snow Effect */}
      <Snowfall />
      <NavBar />

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

          <form onSubmit={handleSubmit} className="space-y-6" aria-busy={saving}>
            <div>
              <label htmlFor="group-name" className="block text-sm font-bold text-[#0b6b3a] mb-2 uppercase tracking-wide">
                Group Name
              </label>
              <input
                id="group-name"
                type="text"
                disabled={saving || !!createdGroupId}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="mt-1 block w-full rounded-md px-4 py-3 bg-white border-2 border-[#c41e3a] text-xl font-medium text-[#4a3b2a] focus:ring-4 focus:ring-[#0b6b3a]/30 focus:border-[#0b6b3a] outline-none shadow-sm transition-all placeholder-gray-300"
                placeholder="e.g. The Griswold Family"
                required
              />
            </div>

            {createdGroupId && !saving && <p role="status" className="text-slate_gray">Your group was created. Retry to finish setting up your membership.</p>}
            {error && (
              <div role="alert" className="mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700 font-bold shadow-sm flex items-center">
                <span className="mr-2 text-xl">❄️</span> {error}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t border-gray-300">
              <button
                type="button"
                disabled={saving}
                onClick={() => router.back()}
                className="text-[#4a3b2a] hover:text-[#c41e3a] font-bold px-4 py-2
                  transition-transform transform active:scale-95 flex items-center"
              >
                <span>←</span> <span className="ml-1">Cancel</span>
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto bg-[#c41e3a] text-white font-bold px-8 py-3 rounded-full hover:bg-[#a01830]
                  transition-all transform active:scale-95 shadow-lg border-2 border-white hover:shadow-xl flex items-center justify-center"
              >
                {saving ? "Creating group…" : createdGroupId ? "Finish group setup" : "Create group"}
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
