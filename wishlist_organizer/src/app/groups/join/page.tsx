import { redirect } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import NavBar from "@/app/components/navbar";
import { getSessionUser } from "../../../../../wishlist_organizer/utils/auth";

export default async function JoinGroupPage() {
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
      console.error("Please enter an invite code");
      revalidatePath("/groups/join");
      return;
    }

    // find the group with matching unique invite code
    const { data: group } = await supabase
      .from("groups")
      .select("id")
      .eq("invite_code", code)
      .single();

    if (!group) {
      console.error("Invalid invite code");
      revalidatePath("/groups/join");
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
      console.error("You are already a member of this group");
      revalidatePath("/groups/join");
      return;
    }

    // Add user to group
    const { error } = await supabase.from("user_groups").insert({
      group_id: group.id,
      user_id: userId,
      role: "member",
    });

    if (error) {
      console.error("Failed to join group");
      revalidatePath("/groups/join");
      return;
    }

    redirect("/groups");
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-lg mx-auto px-[20px] pt-[100px] bg-midnight_blue h-screen font-raleway">
        <h1 className="text-2xl font-bold mb-6 text-primary_text">
          Join a Group
        </h1>

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
              className="max-w-fit bg-washed_gray text-white px-4 py-2 rounded
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
