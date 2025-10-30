"use client";

import { useState } from 'react';
import ConfirmationModal from '../../../components/ConfirmationModal';
import DeleteGroupButton from '@/app/components/DeleteGroup';

interface GroupSettingsProps {
  group: {
    id: string;
    hide_gift_getters: boolean;
  };
  updateHideGiftGetters: (groupId: string, hide: boolean) => Promise<void>;
  deleteGroup: (formData: FormData) => Promise<void>;
}

export default function GroupSettings({ group, updateHideGiftGetters, deleteGroup }: GroupSettingsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSetting, setCurrentSetting] = useState(group.hide_gift_getters);

  const handleToggle = () => {
    setIsModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    const newValue = !currentSetting;
    try {
      await updateHideGiftGetters(group.id, newValue);
      setCurrentSetting(newValue);
    } catch (error) {
      console.error("Failed to update setting:", error);
      alert("There was an error updating the setting. Please check the server logs and your database permissions (RLS).");
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="mt-8 mb-24 font-raleway text-primary_text">
        <h2 className="text-xl font-semibold mb-4">Group Settings</h2>
        <div className="bg-primary_text p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white">Hide Gift Getters</span>
            <button
              onClick={handleToggle}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                currentSetting ? 'bg-green-500' : 'bg-red-600'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  currentSetting ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <DeleteGroupButton groupId={group.id} deleteGroup={deleteGroup} />
        </div>
      </section>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmToggle}
        title="Confirm Change"
        message={
          currentSetting
            ? "Turning this OFF will allow all group members to see who has claimed a gift. Are you sure?"
            : "Turning this ON will hide who has claimed a gift from all members. Are you sure?"
        }
      />
    </>
  );
}
