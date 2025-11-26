"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "../../../utils/supabase";
import { Pencil, Trash2, X, Check } from "lucide-react"; // Using lucide-react for icons
import Modal from "../components/Modal";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type WishlistItem = {
  id: string;
  item_name: string;
  group: {
    id: string;
    name: string;
  };
  description: string;
  link: string | null;
  store: string;
  created_at: string;
};

export default function WishlistItems({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedStore, setEditedStore] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<WishlistItem | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  const uniqueGroups = useMemo(() => {
    const groups = items.map((item) => item.group);
    const unique = new Map();
    groups.forEach((g) => {
      if (g && g.id) unique.set(g.id, g);
    });
    return Array.from(unique.values());
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!selectedGroupId) return items;
    return items.filter((item) => item.group.id === selectedGroupId);
  }, [items, selectedGroupId]);

  const fetchItems = useCallback(async () => {
    const { data, error } = await supabase
      .from("wishlists")
      .select(
        `
            *,
            group: groups(id, name)
        `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching items:", error);
      return;
    }

    setItems(data || []);
  }, [userId]);

  useEffect(() => {
    fetchItems();
  }, [userId, fetchItems]);

  const handleEdit = (item: WishlistItem) => {
    setEditingId(item.id);
    setEditedName(item.item_name);
    setEditedStore(item.store);
    setEditedDescription(item.description);
  };

  const handleSave = async () => {
    if (!editingId) return;

    const { error } = await supabase
      .from("wishlists")
      .update({
        item_name: editedName,
        store: editedStore,
        description: editedDescription,
      })
      .eq("id", editingId);

    if (error) {
      console.error("Error updating item:", error);
      return;
    }

    setEditingId(null);
    fetchItems();

    // Invalidate React Query cache for the group
    const item = items.find((i) => i.id === editingId);
    if (item?.group?.id) {
      queryClient.invalidateQueries({
        queryKey: ["groupWishlist", item.group.id],
      });
    }
    router.refresh();
  };

  const openDeleteModal = (item: WishlistItem) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("id", itemToDelete.id);
    if (error) {
      console.error("Error deleting item:", error);
      return;
    }
    setIsDeleteModalOpen(false);

    // Invalidate cache before clearing itemToDelete
    if (itemToDelete?.group?.id) {
      queryClient.invalidateQueries({
        queryKey: ["groupWishlist", itemToDelete.group.id],
      });
    }

    setItemToDelete(null);
    fetchItems();
    router.refresh();
  };

  return (
    <>
      <Modal
        title="Delete Item"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        actions={
          <>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 rounded text-white"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded bg-red-600 text-white"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-white/70">
          Are you sure you want to delete
          {itemToDelete ? ` "${itemToDelete.item_name}"` : " this item"}? This
          action cannot be undone.
        </p>
      </Modal>
      {items.length > 0 && (
        <div className="flex justify-start mb-4 font-raleway sm:mx-0 items-center gap-2">
          <h1 className="text-slate_gray font-bold text-sm">
            Filter by Group:
          </h1>
          <select
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            className="p-1 rounded-md bg-[#96d8a2] border border-slate-300 text-slate_gray shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            <option value="">All Groups</option>
            {uniqueGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex justify-center items-center w-full mb-20">
          <p className="text-primary_text text-lg font-raleway">No items yet</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex justify-center items-center w-full mb-20">
          <p className="text-primary_text text-lg font-raleway">
            No items found for this group
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:mx-0 mb-[100px] font-raleway">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 pt-8 rounded-md bg-[#ede2cb] border border-slate-200 shadow-md h-48 relative font-raleway"
            >
              {/* Santa Hat Decoration */}
              <div className="absolute -top-2 -right-2 w-12 h-12 rotate-12 opacity-90 pointer-events-none z-10">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 80 Q 50 10 80 80" fill="#d62828" />
                  <circle cx="80" cy="80" r="12" fill="#fff" />
                  <rect
                    x="15"
                    y="75"
                    width="70"
                    height="18"
                    rx="8"
                    fill="#fff"
                  />
                </svg>
              </div>
              <div className="h-full overflow-y-auto pr-2">
                <div className="space-y-2">
                  {editingId === item.id ? (
                    <div className="flex flex-col gap-2 relative pb-[25px]">
                      <h1 className="flex text-orange-500 underline mb-2">
                        Editing Item
                      </h1>

                      <h1 className="text-slate_gray font-bold text-sm">
                        Item name:
                      </h1>

                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full p-1 rounded bg-white border border-slate-300 text-slate_gray"
                      />

                      <h1 className="text-slate_gray font-bold text-sm">
                        Store:
                      </h1>

                      <input
                        type="text"
                        value={editedStore}
                        onChange={(e) => setEditedStore(e.target.value)}
                        className="w-full p-1 rounded bg-white border border-slate-300 text-slate_gray"
                      />

                      <h1 className="text-slate_gray font-bold text-sm">
                        Description:
                      </h1>

                      <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="w-full p-1 rounded bg-white border border-slate-300 text-slate_gray"
                      />

                      <div className="absolute top-0 right-2">
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="text-green-500"
                          >
                            <Check size={24} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-red-500"
                          >
                            <X size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-slate_gray text-lg pr-8">
                        {item.item_name}{" "}
                        <span className="font-normal text-base">
                          from {item.store}
                        </span>
                      </h3>
                      <h1 className="font-normal text-slate_gray/70 text-sm uppercase tracking-wide mt-1">
                        Group:{" "}
                        <span className="text-slate_gray font-semibold">
                          {item.group.name}
                        </span>
                      </h1>
                      <p className="text-xs text-slate_gray/50 mt-4 italic">
                        Added on:{" "}
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                      <div className="absolute bottom-4 right-2 flex gap-8">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Pencil size={24} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(item)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
