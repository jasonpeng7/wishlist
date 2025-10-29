import { redirect } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import Link from "next/link";
import NavBar from "@/app/components/navbar";
import { getSessionUser } from "../../../../../wishlist_organizer/utils/auth";

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

    redirect("/groups");
  }

  return (
    <div className="christmas-stripes">
      <NavBar />
      <div className="font-raleway bg-[#f7f9fb] h-screen items-center justify-center mx-auto px-[20px] mt-20 rounded-t-3xl p-6 md:p-8 lg:p-10">
        <h1 className="text-2xl font-bold mb-6 text-primary_text">
          Join a Group
        </h1>

        {searchParams?.error && (
          <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {searchParams.error}
          </div>
        )}

        <form action={joinGroup} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-primary_text"
            >
              Enter Invite Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              className="mt-1 block w-full rounded-md  px-3 py-2 bg-primary_text"
              placeholder="Enter code"
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/groups"
              className="text-primary_text hover:text-washed_gray px-4 py-2
                transition-transform transform active:scale-90"
            >
              Back
            </Link>
            <button
              type="submit"
              className="max-w-fit bg-green-600 text-white px-4 py-2 rounded
                transition-transform transform active:scale-90"
            >
              Join Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
