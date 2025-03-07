"use server";

import { redirect } from "next/navigation";

import { signUpSchema } from "@/schemas/auth/register/register";
import { createClient } from "@/utils/supabase/server";

// Server action for handling registration.
export async function registerUser(formData: FormData) {
    try {
        // Initialize Supabase with SSR cookie handling.
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const first_name = formData.get("first_name") as string;
        const last_name = formData.get("last_name") as string;
        const username = formData.get("username") as string;
        const confirm_password = formData.get("confirm_password") as string;

        const supabase = await createClient();

        // Validate form data
        const signUpData = signUpSchema.safeParse({
            email,
            password,
            confirm_password,
            first_name,
            last_name,
            username,
        });

        if (!signUpData.success) {
            // Format and return validation errors
            const errorMessage = signUpData.error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            throw new Error(errorMessage);
        }

        // Call Supabase auth.signUp and pass additional user metadata if needed.
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name,
                    last_name,
                    username,
                },
            },
        });

        if (error) {
            throw new Error(error.message);
        }

        // Redirect on success
        redirect("/login");
    } catch (error) {
        // Re-throw the error to be handled by the client
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error occurred during registration");
    }
}
