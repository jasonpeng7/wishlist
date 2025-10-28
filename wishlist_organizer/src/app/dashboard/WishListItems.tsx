'use client';

import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../../utils/supabase";
import { Pencil, Trash2, X, Check } from "lucide-react"; // Using lucide-react for icons

type WishlistItem = {
    id: string;
    item_name: string;
    group: {
        id: string;
        name: string;
    }
    description: string;
    link: string | null;
    store: string;
    created_at: string;
};

export default function WishlistItems({ userId }: { userId: string}) {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState("");
    const [editedStore, setEditedStore] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const fetchItems = useCallback(async() => {
        const {data, error} = await supabase
        .from('wishlists')
        .select(`
            *,
            group: groups(id, name)
        `)
        .eq('user_id', userId)
        .order('created_at', {ascending: false});

        if(error) {
            console.error('Error fetching items:', error);
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
            .from('wishlists')
            .update({
                item_name: editedName,
                store: editedStore
            })
            .eq('id', editingId);

        if (error) {
            console.error('Error updating item:', error);
            return;
        }

        setEditingId(null);
        fetchItems();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            const { error } = await supabase
                .from('wishlists')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting item:', error);
                return;
            }

            fetchItems();
        }
    };

    return (
        <>
            {items.length === 0 ? (
                <div className="flex justify-center items-center w-full h-36">
                    <p className="text-primary_text text-lg font-raleway">No items yet</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-[25px] sm:mx-0 mb-[100px] font-raleway">
                    {items.map((item) => (
                        <div key={item.id} className="p-4 rounded-md bg-dark_gray h-36 overflow-y-auto relative">
                            <div className="space-y-2">
                                {editingId === item.id ? (
                                    <div className="flex flex-col gap-2 relative pb-[25px]">
                                        <h1 className="flex text-primary_text justify-center underline">Editing Item</h1>
                                        
                                        <h1 className="text-primary_text">
                                            Item name: 
                                        </h1>

                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                            className="w-full p-1 rounded bg-primary_text text-dark_gray"
                                        />

                                        <h1 className="text-primary_text">
                                            Store:
                                        </h1>

                                        <input
                                            type="text"
                                            value={editedStore}
                                            onChange={(e) => setEditedStore(e.target.value)}
                                            className="w-full p-1 rounded bg-primary_text text-dark_gray"
                                        />

                                        <h1 className="text-primary_text">
                                            Description:
                                        </h1>

                                        <textarea
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        className="w-full p-1 rounded bg-primary_text text-dark_gray"
                                        />

                                        <div className="absolute top-0 right-2">
                                            <div className="flex gap-2">
                                                <button onClick={handleSave} className="text-green-500">
                                                    <Check size={16} />
                                                </button>
                                                <button onClick={() => setEditingId(null)} className="text-red-500">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>  
                                        <h1 className="font-semibold text-primary_text">Group: <span className="text-washed_gray">{item.group.name}</span></h1>
                                        <h3 className="font-normal text-primary_text min-h-14">{item.item_name} | {item.store}</h3>
                                        <p className="text-sm text-gray-500">
                                            Added on: {new Date(item.created_at).toLocaleDateString()}
                                        </p>
                                        <div className="absolute bottom-4 right-2 flex gap-2">
                                            <button 
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}