"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";
import Image from "next/image";
import Link from "next/link";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!selectedGroupId) {
      setError("Please select a group for this wishlist item");
      return;
    }

    let imageUrl: string | null = null;

    // Step 1: Upload image if one is selected
    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to upload image.");
        }

        imageUrl = data.url;
      } catch (uploadError) {
        const message =
          uploadError instanceof Error
            ? uploadError.message
            : "An error occurred during upload.";
        setError(message);
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    // Step 2: Insert item into the wishlists table
    try {
      const { data, error: insertError } = await supabase
        .from("wishlists")
        .insert([
          {
            user_id: userId,
            group_id: selectedGroupId,
            item_name: itemName,
            store: storeName || null,
            description: description || null,
            link: link || null,
            image_url: imageUrl,
          },
        ])
        .select();

      if (insertError) {
        console.error("Supabase error:", insertError);
        throw insertError;
      }

      // Clear form
      setItemName("");
      setDescription("");
      setStoreName("");
      setLink("");
      setSelectedGroupId("");
      setImageFile(null);
      setImagePreview(null);
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
          {groups.length === 0 ? (
            <Link
              href="/groups"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-full transition-transform transform active:scale-90"
            >
              Join or Create a Group
            </Link>
          ) : (
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full p-2 bg-primary_text rounded text-white"
              required
            >
              <option value="">Select a Group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          )}
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
            className="w-full p-2 bg-primary_text rounded text-white"
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
            className="w-full p-2 bg-primary_text rounded text-white"
          />
        </div>

        <div className="font-raleway">
          <label className="text-primary_text block mb-2">Description</label>
          <textarea
            placeholder="e.g. size, color, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-primary_text rounded text-white"
          />
        </div>

        <div className="font-raleway">
          <label className="text-primary_text block mb-2">Link</label>
          <input
            placeholder="e.g. https://nike.com/store"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 bg-primary_text rounded text-white"
          />
        </div>

        <div className="font-raleway">
          <label className="text-primary_text block mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-primary_text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-bone file:text-dark_gray hover:file:bg-opacity-80"
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-primary_text mb-2">Image Preview:</p>
            <Image
              src={imagePreview}
              alt="Image preview"
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="font-raleway w-full bg-green-600 text-white p-2 rounded-full transition-transform transform active:scale-90 disabled:opacity-50"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Item"}
        </button>
      </form>
    </div>
  );
}
