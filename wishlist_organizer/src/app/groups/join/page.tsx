import { redirect } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import Link from "next/link";
import { getSessionUser } from "../../../../../wishlist_organizer/utils/auth";
import Santa from "@/app/components/Santa";
import "../../manage-group.css"; // Reuse card styles

export default async function JoinGroupPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  async function joinGroup(formData: FormData) {
    "use server";

    const userId = user?.id;
    if (!userId) {
      redirect("/sign-in");
      return;
    }

    const code = formData.get("code")?.toString().toUpperCase();

    if (!code) {
      redirect(
        "/groups/join?error=" +
          encodeURIComponent("Please enter an invite code")
      );
      return;
    }

    // find the group with matching unique invite code
    const { data: group } = await supabase
      .from("groups")
      .select("id")
      .eq("invite_code", code)
      .single();

    if (!group) {
      redirect(
        "/groups/join?error=" + encodeURIComponent("Invalid invite code")
      );
      return;
    }

    // Check if user is already a member
    const { data: existingMember } = await supabase
      .from("user_groups")
      .select("id")
      .eq("group_id", group.id)
      .eq("user_id", userId)
      .single();

    if (existingMember) {
      redirect(
        "/groups/join?error=" +
          encodeURIComponent("You are already a member of this group")
      );
      return;
    }

    // Add user to group
    const { error } = await supabase.from("user_groups").insert({
      group_id: group.id,
      user_id: userId,
      role: "member",
    });

    if (error) {
      redirect(
        "/groups/join?error=" + encodeURIComponent("Failed to join group")
      );
      return;
    }

    redirect(`/groups/${group.id}/wishlists`);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090a0f]">
      {/* Snow Effect */}
      <div className="snow-container absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 5 + 5}px`,
              height: `${Math.random() * 5 + 5}px`,
            }}
          />
        ))}
      </div>

      <Santa />

      <div className="relative z-10 font-raleway max-w-[600px] mx-auto bg-[#f7f9fb] min-h-screen mt-20 rounded-t-3xl p-6 md:p-10 shadow-2xl christmas-card">
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#c41e3a] drop-shadow-sm border-b-4 border-[#0b6b3a] pb-2 px-4 inline-block transform -rotate-1">
            Join a Group 🎄
          </h1>
        </div>

        {searchParams?.error && (
          <div className="mb-6 rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 text-red-700 font-bold shadow-sm flex items-center">
            <span className="mr-2 text-xl">⚠️</span> {searchParams.error}
          </div>
        )}

        <div className="bg-[#f0f0f0] p-8 rounded-xl border-2 border-dashed border-[#0b6b3a] shadow-inner">
          <p className="text-[#4a3b2a] mb-6 text-center italic">
            Received a magic code? Enter it below to unwrap your group access!
          </p>

          <form action={joinGroup} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-bold text-[#0b6b3a] mb-2 uppercase tracking-wide"
              >
                Enter Invite Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                className="mt-1 block w-full rounded-md px-4 py-3 bg-white border-2 border-[#c41e3a] text-xl font-mono text-center tracking-widest text-[#4a3b2a] focus:ring-4 focus:ring-[#0b6b3a]/30 focus:border-[#0b6b3a] outline-none shadow-sm transition-all"
                placeholder="Ex: XMAS24"
                required
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t border-gray-300">
              <Link
                href="/groups"
                className="text-[#4a3b2a] hover:text-[#c41e3a] font-bold px-4 py-2
                  transition-transform transform active:scale-95 flex items-center"
              >
                <span>←</span> <span className="ml-1">Back</span>
              </Link>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#c41e3a] text-white font-bold px-8 py-3 rounded-full hover:bg-[#a01830]
                  transition-all transform active:scale-95 shadow-lg border-2 border-white hover:shadow-xl flex items-center justify-center"
              >
                Join Group <span className="ml-2">🎁</span>
              </button>
            </div>
          </form>
        </div>

        {/* Festive decoration at bottom */}
        <div className="mt-8 text-center opacity-50">
          <div className="inline-block border-t-2 border-gray-300 w-16 mx-2 mb-1"></div>
          <span className="text-2xl">❄️</span>
          <div className="inline-block border-t-2 border-gray-300 w-16 mx-2 mb-1"></div>
        </div>
      </div>
    </div>
  );
}
