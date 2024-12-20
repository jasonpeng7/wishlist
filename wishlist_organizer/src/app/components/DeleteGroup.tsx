'use client';

import { useFormStatus } from 'react-dom';

export default function DeleteGroupButton({ 
  groupId, 
  deleteGroup 
}: { 
  groupId: string;
  deleteGroup: (formData: FormData) => Promise<void>;
}) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      const formData = new FormData();
      formData.append('groupId', groupId);
      deleteGroup(formData);
    }
  };

  return (
    <div className="">
      <h3 className="text-lg font-medium text-red-600 mb-2">Warning</h3>
      <p className="text-sm text-primary_text mb-4">
        Once you delete a group, there is no going back. Please be certain.
      </p>
      <button 
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded
        transition-transform transform active:scale-90"
      >
        Delete Group
      </button>
    </div>
  );
}