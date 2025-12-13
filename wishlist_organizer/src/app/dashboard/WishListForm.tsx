"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabase";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Gift, Sparkles, Heart } from "lucide-react"; // Festive icons

interface Group {
  id: string;
  name: string;
}

export default function WishlistForm({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const searchParams = useSearchParams();
  const defaultGroup = searchParams.get("groupId") || "";
  const [selectedGroupId, setSelectedGroupId] = useState(defaultGroup);

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
      const { error: insertError } = await supabase
        .from("wishlists")
        .insert([
          {
            user_id: userId,
            group_id: selectedGroupId,
            item_name: itemName,
            store: storeName || null,
            description: description || null,
            link: link || null,
            favorited: favorite ? true : false,
            image_url: imageUrl,
          },
        ])
        .select();

      if (insertError) {
        console.error("Supabase error:", insertError);
        throw insertError;
      }

      // Invalidate React Query cache for the group so the new item appears immediately
      await queryClient.invalidateQueries({
        queryKey: ["groupWishlist", selectedGroupId],
      });

      // Redirect to the group's wishlist page
      router.push(`/groups/${selectedGroupId}/wishlists`);
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
    <div className="max-w-lg mt-[25px] relative">
      {/* Decorative Ribbon Header */}
      <div className="absolute -top-12 -right-12 z-10 pointer-events-none rotate-12 opacity-90 hidden sm:block">
        <svg width="120" height="120" viewBox="0 0 100 100">
          <path
            d="M50 50 Q80 20 90 50 T 50 90"
            fill="none"
            stroke="#c41e3a"
            strokeWidth="8"
          />
          <path
            d="M50 50 Q20 20 10 50 T 50 90"
            fill="none"
            stroke="#c41e3a"
            strokeWidth="8"
          />
          <circle cx="50" cy="50" r="10" fill="#bf9a2f" />
        </svg>
      </div>

      <div className="bg-[#fdfbf7] p-4 rounded-lg shadow-xl border-4 border-[#c41e3a] relative overflow-hidden">
        {/* Festive Background Pattern (Subtle) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#0b6b3a_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 text-center mb-8">
          <div className="inline-block bg-[#0b6b3a] text-white px-6 py-2 rounded-full transform -rotate-2 shadow-md border-2 border-white mb-2">
            <h2 className="text-xl font-bold flex items-center gap-2 font-raleway tracking-wide">
              <Gift size={20} />
              <span>Santa&apos;s Wishlist</span>
              <Sparkles size={20} className="text-yellow-300" />
            </h2>
          </div>
          <p className="text-[#4a3b2a]/80 text-sm mt-2 font-medium italic">
            Add a gift so the elves know what to make! 🎁
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 shadow-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="font-raleway">
            <label className="text-[#0b6b3a] font-bold block mb-2 uppercase text-xs tracking-wider">
              Group <span className="text-red-600">*</span>
            </label>
            {groups.length === 0 ? (
              <Link
                href="/groups"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-full transition-transform transform active:scale-90 hover:bg-green-700 shadow-sm"
              >
                Join or Create a Group
              </Link>
            ) : (
              <div className="relative">
                <select
                  value={selectedGroupId}
                  onChange={(e) => setSelectedGroupId(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-[#bf9a2f] rounded-lg text-[#4a3b2a] focus:ring-2 focus:ring-[#c41e3a] focus:border-[#c41e3a] outline-none shadow-sm appearance-none cursor-pointer font-medium"
                  required
                >
                  <option value="">Select a Group for this Gift</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#bf9a2f]">
                  ▼
                </div>
              </div>
            )}
          </div>

          <div className="font-raleway">
            <label className="text-[#0b6b3a] font-bold block mb-2 uppercase text-xs tracking-wider">
              Item Name <span className="text-red-600">*</span>
            </label>
            <input
              placeholder="e.g. Red Knit Socks"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-3 bg-white border-2 border-[#bf9a2f] rounded-lg text-[#4a3b2a] placeholder-[#4a3b2a]/40 focus:ring-2 focus:ring-[#c41e3a] focus:border-[#c41e3a] outline-none shadow-sm transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="font-raleway">
              <label className="text-[#0b6b3a] font-bold block mb-2 uppercase text-xs tracking-wider">
                Brand/Store
              </label>
              <input
                placeholder="e.g. Nike"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-3 bg-white border-2 border-[#bf9a2f]/50 rounded-lg text-[#4a3b2a] placeholder-[#4a3b2a]/40 focus:ring-2 focus:ring-[#c41e3a] outline-none shadow-sm"
              />
            </div>

            <div className="font-raleway">
              <label className="text-[#0b6b3a] font-bold block mb-2 uppercase text-xs tracking-wider">
                Web Link
              </label>
              <input
                placeholder="https://..."
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-3 bg-white border-2 border-[#bf9a2f]/50 rounded-lg text-[#4a3b2a] placeholder-[#4a3b2a]/40 focus:ring-2 focus:ring-[#c41e3a] outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="font-raleway">
            <label className="text-[#0b6b3a] font-bold block mb-2 uppercase text-xs tracking-wider">
              Description / Size / Color
            </label>
            <textarea
              placeholder="e.g. Size M, Bright Red, warm & fuzzy..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-white border-2 border-[#bf9a2f]/50 rounded-lg text-[#4a3b2a] placeholder-[#4a3b2a]/40 focus:ring-2 focus:ring-[#c41e3a] outline-none shadow-sm min-h-[100px]"
            />
          </div>

          <div className="bg-red-50/50 p-2 rounded-lg border-2 border-dashed border-red-200">
            <label className="flex flex-col items-center cursor-pointer group">
              <div className="flex flex-row items-center gap-2 mb-1">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={favorite}
                    onChange={(e) => setFavorite(e.target.checked)}
                    className="peer sr-only"
                  />
                  {/* Heart Button Replacement */}
                  <div
                    className={`transition-transform duration-200 ease-in-out hover:scale-110 ${
                      favorite
                        ? "text-[#c41e3a] scale-110"
                        : "text-gray-300 hover:text-[#c41e3a]/50"
                    }`}
                  >
                    <Heart
                      size={20}
                      fill={favorite ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth={favorite ? 0 : 2}
                      className={favorite ? "animate-pulse" : ""}
                    />
                  </div>
                </div>
                <div
                  className={`font-bold transition-colors select-none ${
                    favorite ? "text-[#c41e3a]" : "text-gray-500"
                  }`}
                >
                  <span>I really want this!</span>
                </div>
              </div>
              <span className="text-xs font-regular text-gray-500 text-center">
                Marking this item as a favorite will make it stand out in the
                wishlist!
              </span>
            </label>
          </div>

          <div className="font-raleway">
            <label className="text-[#0b6b3a] font-bold block mb-2 uppercase text-xs tracking-wider">
              Upload Photo
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-[#4a3b2a] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#0b6b3a] file:text-white hover:file:bg-[#08522e] cursor-pointer border-2 border-[#bf9a2f]/30 rounded-lg p-2 bg-white"
              />
            </div>
          </div>

          {imagePreview && (
            <div className="mt-4 p-2 bg-white border border-gray-200 rounded-lg shadow-sm inline-block transform rotate-2">
              <p className="text-xs text-gray-500 mb-1 text-center font-mono">
                Photo Preview
              </p>
              <div className="relative w-24 h-24">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  fill
                  className="rounded-md object-cover border border-gray-100"
                />
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#c41e3a] text-white font-bold text-lg p-4 rounded-full shadow-lg border-2 border-white hover:bg-[#a01830] hover:shadow-xl transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  Wrapping Gift...
                </>
              ) : (
                <>
                  <span>Add to Wishlist</span>
                  <span>🎁</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
