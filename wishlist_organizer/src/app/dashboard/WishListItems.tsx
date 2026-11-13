"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "../../../utils/supabase";
import { Pencil, Trash2 } from "lucide-react";
import Modal from "../components/Modal";
import WishlistCarousel from "../components/WishlistCarousel";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type WishlistItem = {
  id: string;
  item_name: string;
  group: { id: string; name: string } | null;
  description: string;
  link: string | null;
  store: string;
  created_at: string;
  image_url?: string | null;
};

export default function WishlistItems({ userId, groupId, viewMode }: { userId: string; groupId: string; viewMode: "list" | "carousel" }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedStore, setEditedStore] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [itemToDelete, setItemToDelete] = useState<WishlistItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const filteredItems = useMemo(() => groupId ? items.filter((item) => item.group?.id === groupId) : items, [items, groupId]);

  const carouselGroups = useMemo(() => {
    const grouped = new Map<string, { name: string; items: WishlistItem[] }>();
    filteredItems.forEach((item) => {
      const key = item.group?.id || "unavailable";
      if (!grouped.has(key)) grouped.set(key, { name: item.group?.name || "Unavailable group", items: [] });
      grouped.get(key)!.items.push(item);
    });
    return Array.from(grouped, ([id, group]) => ({ id, ...group }));
  }, [filteredItems]);

  const fetchItems = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase.from("wishlists").select("*, group:groups(id, name)").eq("user_id", userId).order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      setItems(data || []);
      setError("");
    } catch {
      setError("Your wishes could not be loaded. Please try again.");
    } finally { setLoading(false); }
  }, [userId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);
  useEffect(() => { if (editingId) document.getElementById(`name-${editingId}`)?.focus(); }, [editingId]);

  const handleEdit = (item: WishlistItem) => {
    setError(""); setStatus("");
    setEditingId(item.id);
    setEditedName(item.item_name);
    setEditedStore(item.store || "");
    setEditedDescription(item.description || "");
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingId || busy) return;
    if (!editedName.trim()) { setError("Enter a name for your wish."); return; }
    setBusy(true); setError(""); setStatus("");
    try {
      const { error: updateError } = await supabase.from("wishlists").update({ item_name: editedName.trim(), store: editedStore, description: editedDescription }).eq("id", editingId);
      if (updateError) throw updateError;
      const item = items.find((wish) => wish.id === editingId);
      if (item?.group) await queryClient.invalidateQueries({ queryKey: ["groupWishlist", item.group.id] });
      setEditingId(null);
      await fetchItems();
      requestAnimationFrame(() => document.getElementById(`edit-${editingId}`)?.focus());
      setStatus("Changes saved.");
      router.refresh();
    } catch { setError("Your changes could not be saved. Please try again."); }
    finally { setBusy(false); }
  };

  const confirmDelete = async () => {
    if (!itemToDelete || busy) return;
    setBusy(true); setError(""); setStatus("");
    try {
      const { error: deleteError } = await supabase.from("wishlists").delete().eq("id", itemToDelete.id);
      if (deleteError) throw deleteError;
      if (itemToDelete.group) await queryClient.invalidateQueries({ queryKey: ["groupWishlist", itemToDelete.group.id] });
      setItemToDelete(null);
      await fetchItems();
      setStatus("Wish deleted.");
      router.refresh();
    } catch { setError("This wish could not be deleted. Please try again."); }
    finally { setBusy(false); }
  };

  return (
    <>
      <Modal title="Delete wish" isOpen={!!itemToDelete} busy={busy} onClose={() => setItemToDelete(null)} className="bg-white" titleClassName="text-slate_gray" actions={<>
        <button type="button" disabled={busy} onClick={() => setItemToDelete(null)} className="px-4 py-3 text-slate_gray">Cancel</button>
        <button type="button" onClick={confirmDelete} disabled={busy} className="px-4 py-3 rounded-lg bg-red-700 text-white disabled:opacity-60">{busy ? "Deleting…" : "Delete wish"}</button>
      </>}>
        <p className="text-slate_gray">Delete &quot;{itemToDelete?.item_name}&quot;? This cannot be undone.</p>
        {error && <p role="alert" className="mt-3 text-red-800">{error}</p>}
      </Modal>
      <Modal title="Edit wish" isOpen={!!editingId} busy={busy} onClose={() => setEditingId(null)} className="bg-[#fdfbf7]" titleClassName="text-slate_gray">
        {editingId && <form onSubmit={handleSave} aria-label="Edit wish" aria-busy={busy}>
          <fieldset disabled={busy} className="min-w-0 w-full space-y-4 text-slate_gray">
            <div><label htmlFor={`name-${editingId}`}>Wish name</label><input id={`name-${editingId}`} value={editedName} onChange={(event) => setEditedName(event.target.value)} required className="w-full min-w-0 max-w-full mt-2 p-3 text-base rounded-lg border border-slate-500" /></div>
            <div><label htmlFor={`store-${editingId}`}>Brand or store</label><input id={`store-${editingId}`} value={editedStore} onChange={(event) => setEditedStore(event.target.value)} className="w-full min-w-0 max-w-full mt-2 p-3 text-base rounded-lg border border-slate-500" /></div>
            <div><label htmlFor={`description-${editingId}`}>Description</label><textarea id={`description-${editingId}`} value={editedDescription} onChange={(event) => setEditedDescription(event.target.value)} className="w-full min-w-0 max-w-full mt-2 p-3 text-base rounded-lg border border-slate-500 resize-y" /></div>
            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{error}</p>}
            <div className="flex flex-wrap gap-2"><button type="submit" className="px-4 py-3 rounded-lg bg-[#315b47] text-white">{busy ? "Saving…" : "Save changes"}</button><button type="button" onClick={() => setEditingId(null)} className="px-4 py-3">Cancel</button></div>
          </fieldset>
        </form>}
      </Modal>
      {error && !itemToDelete && !editingId && <div role="alert" className="mb-4 p-3 rounded-lg bg-red-50 text-red-800">{error} <button type="button" onClick={fetchItems} className="underline p-2">Reload wishes</button></div>}
      <p role="status" className="mb-4">{loading ? "Loading wishes…" : status}</p>
      {!loading && filteredItems.length === 0 && <p className="py-8">{groupId ? "You haven't added any wishes to this group yet." : "No wishes yet. Choose Add a wish to start."}</p>}
      {viewMode === "carousel" ? (
        <div className="min-w-0 space-y-10">
          {carouselGroups.map((group) => <section key={group.id} className="min-w-0">
            <h2 className="mb-4 text-xl font-bold text-[#315b47]">{group.name}</h2>
            <WishlistCarousel
              items={group.items.map((item) => ({ id: item.id, name: item.item_name, description: item.description, link: item.link, image_url: item.image_url, user_id: userId }))}
              shelfTitle={`Your wishlist for ${group.name}`}
              currentUserId={userId}
              showGiftAssignments={false}
              onEditItem={(id) => { const item = items.find((wish) => wish.id === id); if (item) handleEdit(item); }}
              onDeleteItem={(id) => { const item = items.find((wish) => wish.id === id); if (item) { setError(""); setStatus(""); setItemToDelete(item); } }}
            />
          </section>)}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredItems.map((item) => <article key={item.id} className="p-5 lined-paper torn-paper rounded-t-lg border border-bone min-w-0">
            <h2 className="font-bold text-lg break-words">{item.item_name}</h2>
            {item.store && <p className="mt-1">{item.store}</p>}
            <p className="mt-3 text-sm">Group: {item.group?.name || "Unavailable group"}</p>
            <p className="mt-1 text-sm text-slate-600">Added on {new Date(item.created_at).toLocaleDateString()}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button type="button" id={`edit-${item.id}`} onClick={() => handleEdit(item)} disabled={busy} aria-label={`Edit ${item.item_name}`} className="flex items-center gap-2 py-3 px-2 text-[#315b47]"><Pencil size={18} aria-hidden="true" />Edit</button>
              <button type="button" onClick={() => { setError(""); setStatus(""); setItemToDelete(item); }} disabled={busy} aria-label={`Delete ${item.item_name}`} className="flex items-center gap-2 py-3 px-2 text-red-800"><Trash2 size={18} aria-hidden="true" />Delete</button>
            </div>
          </article>)}
        </div>
      )}
    </>
  );
}
