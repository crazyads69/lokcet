"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { registerUser } from "@/app/(auth)/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas/auth/register/register";

export default function RegisterForm() {
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            username: "",
            confirm_password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        try {
            // Convert form data to FormData for the server action
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // Call the server action
            await registerUser(formData);

            // Reset server error if successful
            setServerError(null);
        } catch (error) {
            // Display server error to the user
            setServerError(error instanceof Error ? error.message : "An unexpected error occurred");
        }
    }

    return (
        <Form {...form}>
            {serverError && (
                <Alert className="mb-6" variant="destructive">
                    <AlertDescription>{serverError}</AlertDescription>
                </Alert>
            )}

            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Xác nhận mật khẩu</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirm Password" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Họ</FormLabel>
                            <FormControl>
                                <Input placeholder="Họ" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Tên" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={form.formState.isSubmitting} type="submit">
                    {form.formState.isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                </Button>
            </form>
        </Form>
    );
}
