"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabase";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { prepareWishPhoto } from "../../../utils/wishPhotos";
import { MAX_WISH_PHOTO_BYTES, WISH_PHOTO_SIZE_ERROR } from "../../../utils/wishPhotoLimits";

export type Group = { id: string; name: string };

type Props = {
  userId: string;
  groups: Group[];
  loadingGroups: boolean;
  groupId: string;
  onGroupChange: (id: string) => void;
  onCancel: () => void;
};

export default function WishlistForm({ userId, groups, loadingGroups, groupId, onGroupChange, onCancel }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const focused = useRef(false);
  useEffect(() => {
    if (loadingGroups || focused.current) return;
    formRef.current?.querySelector<HTMLElement>(groupId ? "#wish-name" : "#wish-group")?.focus();
    focused.current = true;
  }, [loadingGroups, groupId]);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [preparingPhoto, setPreparingPhoto] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!imageFile) { setImagePreview(""); return; }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (saving || preparingPhoto) return;
    setError("");
    setStatus("");
    if (!groups.some((group) => group.id === groupId)) { setError("Choose a group for this wish."); return; }
    if (!itemName.trim()) { setError("Enter a name for your wish."); return; }
    setSaving(true);
    let saved = false;
    let uploadingPhoto = false;
    try {
      let imageUrl = uploadedImageUrl;
      if (imageFile && !imageUrl) {
        uploadingPhoto = true;
        setStatus("Uploading photo…");
        if (imageFile.size > MAX_WISH_PHOTO_BYTES) throw new Error(WISH_PHOTO_SIZE_ERROR);
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: imageFile.name, type: imageFile.type, size: imageFile.size }),
        });
        if (response.status === 413) throw new Error(WISH_PHOTO_SIZE_ERROR);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Your photo could not be uploaded. Please try again.");
        if (!data.url || !data.path || !data.token || !data.contentType) throw new Error("Your photo could not be uploaded. Please try again.");
        const { error: uploadError } = await supabase.storage.from("wishlist-images")
          .uploadToSignedUrl(data.path, data.token, imageFile, { contentType: data.contentType });
        if (uploadError) throw new Error(uploadError.message || "Your photo could not be uploaded. Please try again.");
        imageUrl = data.url;
        setUploadedImageUrl(imageUrl);
        uploadingPhoto = false;
      }
      setStatus("Saving wish…");
      const { error: insertError } = await supabase.from("wishlists").insert([{
        user_id: userId,
        group_id: groupId,
        item_name: itemName.trim(),
        store: storeName || null,
        description: description || null,
        link: link || null,
        favorited: favorite,
        image_url: imageUrl,
      }]).select();
      if (insertError) throw insertError;
      saved = true;
      setStatus("Wish saved. Opening your group…");
      await queryClient.invalidateQueries({ queryKey: ["groupWishlist", groupId] });
      router.push(`/groups/${groupId}/wishlists`);
    } catch (cause) {
      setError(uploadingPhoto
        ? `${cause instanceof Error ? cause.message : "Your photo could not be uploaded."} Your entries are still here.`
        : "Your wish could not be saved. Your entries are still here. Please try again.");
      setStatus("");
    } finally {
      if (!saved) setSaving(false);
    }
  };

  const inputClass = "box-border w-full min-w-0 max-w-full min-h-12 p-3 mt-2 bg-white border border-slate-500 rounded-lg text-base text-slate_gray";

  return (
    <form ref={formRef} onSubmit={handleSubmit} aria-busy={saving || preparingPhoto} aria-labelledby="add-wish-title" className="min-w-0 max-w-full">
      <h2 id="add-wish-title" className="text-xl font-bold mb-2">Add a wish</h2>
      <p className="mb-5">Only a group and a wish name are required.</p>
      <fieldset disabled={saving || preparingPhoto} className="min-w-0 w-full max-w-full space-y-5">
        <div>
          <label htmlFor="wish-group" className="font-semibold">Group</label>
          <select id="wish-group" value={groupId} onChange={(event) => onGroupChange(event.target.value)} className={inputClass} required disabled={loadingGroups || saving}>
            <option value="">{loadingGroups ? "Loading groups…" : "Choose a group"}</option>
            {groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="wish-name" className="font-semibold">Wish name</label>
          <input id="wish-name" value={itemName} onChange={(event) => setItemName(event.target.value)} className={inputClass} placeholder="e.g. Red knit socks" required />
        </div>
        <details className="min-w-0 max-w-full rounded-lg border border-bone p-4">
          <summary className="cursor-pointer font-semibold break-words">Optional details: link, store, description, photo</summary>
          <div className="min-w-0 max-w-full space-y-5 mt-5">
            <div><label htmlFor="wish-store">Brand or store</label><input id="wish-store" value={storeName} onChange={(event) => setStoreName(event.target.value)} className={inputClass} /></div>
            <div><label htmlFor="wish-link">Product link</label><input id="wish-link" type="text" inputMode="url" value={link} onChange={(event) => setLink(event.target.value)} className={inputClass} placeholder="https://…" /></div>
            <div><label htmlFor="wish-description">Description, size, or color</label><textarea id="wish-description" value={description} onChange={(event) => setDescription(event.target.value)} className={`${inputClass} min-h-28 resize-y`} /></div>
            <div><label htmlFor="wish-photo">Photo</label><input ref={photoInputRef} id="wish-photo" type="file" accept="image/*,.heic,.heif" onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setImageFile(null);
              setUploadedImageUrl(null);
              setError("");
              setPreparingPhoto(true);
              setStatus("Preparing photo…");
              try {
                setImageFile(await prepareWishPhoto(file));
              } catch (cause) {
                setError(cause instanceof Error ? cause.message : "Your photo could not be prepared. Please choose another photo.");
                if (photoInputRef.current) photoInputRef.current.value = "";
              } finally {
                setPreparingPhoto(false);
                setStatus("");
              }
            }} className="block mt-2 w-full min-w-0 max-w-full text-sm" /><p className="mt-2 text-sm">Up to 20 MB per photo. iPhone HEIF/HEIC photos are converted to JPEG automatically.</p></div>
            {imagePreview && <Image src={imagePreview} alt="Selected wish photo" width={120} height={120} className="rounded-lg object-contain" />}
            {imageFile && <button type="button" onClick={() => {
              setImageFile(null);
              setUploadedImageUrl(null);
              if (photoInputRef.current) photoInputRef.current.value = "";
            }} className="px-4 py-3 rounded-lg border border-slate-500">Remove photo</button>}
          </div>
        </details>
        <label className="flex gap-3 items-center py-2"><input type="checkbox" checked={favorite} onChange={(event) => setFavorite(event.target.checked)} className="h-5 w-5 accent-[#a63142]" /><span>Mark as a favorite</span></label>
      </fieldset>
      {error && <p role="alert" className="my-4 rounded-lg bg-red-50 p-3 text-red-800">{error}</p>}
      <p role="status" className="my-3 text-sm">{status}</p>
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={saving || preparingPhoto || loadingGroups || groups.length === 0} className="px-5 py-3 rounded-lg bg-[#a63142] text-white font-semibold disabled:opacity-60">{saving ? "Saving…" : "Save wish"}</button>
        <button type="button" onClick={onCancel} disabled={saving} className="px-5 py-3 rounded-lg border border-slate-500 disabled:opacity-60">Cancel</button>
      </div>
    </form>
  );
}
