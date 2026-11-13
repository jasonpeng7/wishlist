import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "../../../../../utils/auth";
import { supabase } from "../../../../../utils/supabase";
import { inviteReturnPath } from "../../../../../utils/invites";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in to join this group." }, { status: 401 });

  try {
    const { inviteId } = await request.json();
    if (typeof inviteId !== "string" || !inviteReturnPath(`/join/${inviteId}`)) {
      return NextResponse.json({ error: "This invitation link is invalid." }, { status: 400 });
    }
    const { data: group, error: groupError } = await supabase.from("groups").select("id").eq("invite_code", inviteId.toUpperCase()).single();
    if (groupError && groupError.code !== "PGRST116") return NextResponse.json({ error: "The invitation could not be checked. Please try again." }, { status: 503 });
    if (!group) return NextResponse.json({ error: "This invitation is no longer valid. Ask the organizer for a new link." }, { status: 404 });

    const { data: membership, error: memberError } = await supabase.from("user_groups").select("group_id").eq("group_id", group.id).eq("user_id", user.id).single();
    if (memberError && memberError.code !== "PGRST116") return NextResponse.json({ error: "Your membership could not be checked. Please try again." }, { status: 503 });
    if (membership) return NextResponse.json({ groupId: group.id });

    const { error } = await supabase.from("user_groups").insert({ group_id: group.id, user_id: user.id, role: "member" });
    if (error) {
      // A repeated request may have completed the same membership already.
      const { data: existing } = await supabase.from("user_groups").select("group_id").eq("group_id", group.id).eq("user_id", user.id).single();
      if (!existing) return NextResponse.json({ error: "The group could not be joined. Please try again." }, { status: 500 });
    }
    revalidatePath("/groups");
    return NextResponse.json({ groupId: group.id });
  } catch {
    return NextResponse.json({ error: "The invitation could not be processed. Please try again." }, { status: 500 });
  }
}
