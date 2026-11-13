"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../utils/supabase";
import WishlistItems from "./WishListItems";
import WishlistForm, { Group } from "./WishListForm";
import NavBar from "../components/navbar";
import Snowfall from "../components/Snowfall";
import Santa from "../components/Santa";
import { Gift, List, LayoutGrid } from "lucide-react";
import "../manage-group.css";

export default function DashboardView({ user }: { user: { id: string } }) {
  const addWishButton = useRef<HTMLButtonElement>(null);
  const searchParams = useSearchParams();
  const requestedGroup = searchParams.get("groupId") || "";
  const [selectedGroupId, setSelectedGroupId] = useState(requestedGroup);
  const [showForm, setShowForm] = useState(!!requestedGroup);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [groupError, setGroupError] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "carousel">("list");

  useEffect(() => {
    setSelectedGroupId(requestedGroup);
    setShowForm(!!requestedGroup);
  }, [requestedGroup]);

  useEffect(() => {
    let cancelled = false;
    const loadGroups = async () => {
      try {
        const [owned, memberships] = await Promise.all([
          supabase.from("groups").select("id, name").eq("creator_id", user.id),
          supabase.from("user_groups").select("group:groups(id, name)").eq("user_id", user.id).eq("role", "member"),
        ]);
        if (owned.error || memberships.error) throw owned.error || memberships.error;
        const joined = memberships.data?.flatMap((membership) => membership.group || []) || [];
        const allGroups = [...(owned.data || []), ...joined];
        if (!cancelled) setGroups(Array.from(new Map(allGroups.map((group) => [group.id, group])).values()));
      } catch {
        if (!cancelled) setGroupError("Your groups could not be loaded. Please refresh to try again.");
      } finally {
        if (!cancelled) setLoadingGroups(false);
      }
    };
    loadGroups();
    return () => { cancelled = true; };
  }, [user.id]);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#090a0f] pt-20">
      <Snowfall />
      <Santa />
      <NavBar />
      <main className="relative z-10 min-h-screen max-w-[1000px] mx-auto pb-28 bg-[#fdfbf7] text-[#4a3b2a] christmas-card">
      <div className="min-w-0 px-4 py-6 sm:px-6 md:px-10 md:pt-20">
        <Link href="/groups" className="text-[#315b47] underline underline-offset-4">Back to groups</Link>
        <div className="flex flex-wrap justify-between items-center gap-4 my-6">
          <div>
            <h1 className="flex items-center gap-3 text-3xl sm:text-4xl font-bold text-[#c41e3a]"><Gift size={28} aria-hidden="true" className="shrink-0 text-[#735717]" />My wishlist</h1>
            <p className="mt-2">{selectedGroup ? `Your wishes for ${selectedGroup.name}.` : "Your wishes, organized by group."}</p>
          </div>
          {!showForm && <button ref={addWishButton} type="button" onClick={() => setShowForm(true)} className="rounded-full px-6 py-3 bg-[#c41e3a] text-white font-bold shadow-sm border-2 border-white" aria-expanded={false} aria-controls="add-wish">Add a wish</button>}
        </div>
        {!loadingGroups && !groupError && selectedGroupId && !selectedGroup && <p role="alert" className="mb-4 text-red-800">This group is unavailable. Choose another group.</p>}
        {groupError && <p role="alert" className="mb-4 text-red-800">{groupError}</p>}
        <div className="mb-6">
          <label htmlFor="wishlist-group" className="block font-semibold mb-2">Group</label>
          <select id="wishlist-group" value={selectedGroupId} onChange={(event) => setSelectedGroupId(event.target.value)} disabled={loadingGroups} className="max-w-full min-h-12 border border-slate-500 rounded-lg bg-white px-3 text-base">
            <option value="">{loadingGroups ? "Loading groups…" : "All my groups"}</option>
            {groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
          </select>
          {!loadingGroups && !groupError && groups.length === 0 && <p className="mt-3">Every wish belongs to a group. <Link href="/groups" className="underline text-[#315b47]">Create or join a group to start.</Link></p>}
        </div>
        {showForm && (
          <section id="add-wish" className="min-w-0 mb-8 rounded-xl border-2 border-[#bf9a2f]/40 bg-[#fdfbf7] p-4 sm:p-5 md:p-6 shadow-sm" aria-label="Add a wish">
            <WishlistForm userId={user.id} groups={groups} loadingGroups={loadingGroups} groupId={selectedGroupId} onGroupChange={setSelectedGroupId} onCancel={() => { setShowForm(false); requestAnimationFrame(() => addWishButton.current?.focus()); }} />
          </section>
        )}
        <div className="flex justify-end mb-6" role="group" aria-label="Wishlist view">
          <div className="flex rounded-lg border border-bone bg-white p-1">
            <button type="button" onClick={() => setViewMode("list")} aria-pressed={viewMode === "list"} className={`flex items-center gap-2 rounded-md px-3 py-3 text-sm ${viewMode === "list" ? "bg-slate_gray text-white" : "text-slate_gray"}`}><List size={18} aria-hidden="true" />List</button>
            <button type="button" onClick={() => setViewMode("carousel")} aria-pressed={viewMode === "carousel"} className={`flex items-center gap-2 rounded-md px-3 py-3 text-sm ${viewMode === "carousel" ? "bg-slate_gray text-white" : "text-slate_gray"}`}><LayoutGrid size={18} aria-hidden="true" />Carousel</button>
          </div>
        </div>
        <section aria-label="Your wishlist items"><WishlistItems userId={user.id} groupId={selectedGroupId} viewMode={viewMode} /></section>
      </div>
      </main>
    </div>
  );
}
