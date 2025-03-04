"use server";

import { redirect } from "next/navigation";

import { signUpSchema } from "@/schemas/auth/register/register";
import { createClient } from "@/utils/supabase/server";

// Server action for handling registration.
export async function registerUser(formData: FormData) {
  // Initialize Supabase with SSR cookie handling.

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;

  const supabase = await createClient();
  const signUpData = signUpSchema.safeParse({
    email,
    password,
    first_name,
    last_name,
  });

  if (!signUpData.success) {
    throw new Error("Invalid form data");
  }

  // Call Supabase auth.signUp and pass additional user metadata if needed.
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/login");
}
