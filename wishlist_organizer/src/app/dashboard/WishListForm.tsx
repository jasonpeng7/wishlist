'use client';

import { useState } from "react";
import { supabase } from "../../../utils/supabase";
export default function WishlistForm({ userId }: { userId: string }) {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      console.log("Submitting with user ID:", userId); // Debug log

      const { data, error } = await supabase
        .from('wishlists')
        .insert([
          {
            user_id: userId,
            item_name: itemName,
            store: storeName || null,
            description: description || null, // Handle empty description
            link: link || null, // Handle empty link
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error); // Debug log
        throw error;
      }

      // Clear form
      setItemName('');
      setDescription('');
      setStoreName('');
      setLink('');
      setSuccess(true);

      console.log('Item added successfully:', data); // Debug log

    } catch (error: any) {
      setError(error.message || 'An error occurred while adding the item');
      console.error('Error details:', error);
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
          Item added successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="font-raleway">
          <label className="text-primary_text block mb-2 ">Item Name<span className="text-red-600">*</span></label>
          <input
            placeholder="e.g. Socks"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full p-2 bg-primary_text rounded bg text-dark_gray"
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