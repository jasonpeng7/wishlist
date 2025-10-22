import { supabase } from "../../../../../../wishlist_organizer/utils/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // does user exist
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .single();

    if (findError && findError.code !== "PGRST116") {
      // PGRST116 means no rows found, if user not found throw err
      console.error("Error finding user:", findError);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    // hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // create new user
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ username, password_hash: passwordHash }]);

    if (insertError) {
      console.error("Error inserting user:", insertError);
      return NextResponse.json(
        { error: "Could not create user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
