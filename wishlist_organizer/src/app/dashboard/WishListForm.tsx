"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";

interface Group {
  id: string;
  name: string;
}

export default function WishlistForm({ userId }: { userId: string }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [storeName, setStoreName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // fetch all of users groups
  useEffect(() => {
    async function fetchUserGroups() {
      try {
        // fetch all groups that user created
        const { data: adminGroups } = await supabase
          .from("groups")
          .select("id, name")
          .eq("creator_id", userId);

        // fetch all groups that user is member
        const { data: memberGroups } = await supabase
          .from("user_groups")
          .select("group:groups(id, name)")
          .eq("user_id", userId)
          .eq("role", "member");

        // join and remove duplicates
        const combinedGroups = [
          ...(adminGroups || []),
          ...(memberGroups?.map((mg) => mg.group) || []),
        ];
        const uniqueGroups = Array.from(
          new Map(
            (combinedGroups as { id: string; name: string }[]).map((g) => [
              g.id,
              g,
            ])
          ).values()
        );

        setGroups(uniqueGroups);
      } catch (err) {
        console.error("Error fetching groups:", err);
        setError("Failed to load groups");
      }
    }

    if (userId) {
      fetchUserGroups();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!selectedGroupId) {
      setError("Please select a group for this wishlist item");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("wishlists")
        .insert([
          {
            user_id: userId,
            group_id: selectedGroupId,
            item_name: itemName,
            store: storeName || null,
            description: description || null,
            link: link || null,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      // Clear form
      setItemName("");
      setDescription("");
      setStoreName("");
      setLink("");
      setSelectedGroupId("");
      setSuccess(true);

      console.log("Item added successfully:", data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred while adding the item";
      setError(message);
      console.error("Error details:", error);
    }
  };

  return (
    <div className="max-w-lg mt-[25px]">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="font-raleway bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Item added successfully. Please Refresh Your Page!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="font-raleway">
          <label className="text-primary_text block mb-2">
            Group<span className="text-red-600">*</span>
          </label>
          <select
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            className="w-full p-2 bg-primary_text rounded text-dark_gray"
            required
          >
            <option value="">
              <p className="">Select a Group</p>
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="font-raleway">
          <label className="text-primary_text block mb-2">
            Item Name<span className="text-red-600">*</span>
          </label>
          <input
            placeholder="e.g. Socks"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full p-2 bg-primary_text rounded text-dark_gray"
            required
          />
        </div>

        <div className="font-raleway">
          <label className="text-primary_text block mb-2">Brand/Store</label>
          <input
            placeholder="e.g. Nike"
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full p-2 bg-primary_text rounded text-dark_gray"
          />
        </div>

        <div className="font-raleway">
          <label className="text-primary_text block mb-2">Description</label>
          <textarea
            placeholder="e.g. size, color, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-primary_text rounded text-dark_gray"
          />
        </div>

        <div className="font-raleway">
          <label className="text-primary_text block mb-2">Link</label>
          <input
            placeholder="e.g. https://nike.com/store"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 bg-primary_text rounded text-dark_gray"
          />
        </div>

        <button
          type="submit"
          className="font-raleway w-full bg-washed_gray text-white p-2 rounded transition-transform transform active:scale-90"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
