import { z } from "zod";

export const signUpSchema = z
    .object({
        email: z
            .string()
            .email({
                message: "Email không hợp lệ",
            })
            .max(256, {
                message: "Email giới hạn 256 ký tự",
            }),
        password: z
            .string()
            .min(8, {
                message: "Mật khẩu phải có ít nhất 8 ký tự",
            })
            .max(256, {
                message: "Mật khẩu giới hạn 256 ký tự",
            })
            .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
                message: "Mật khẩu phải chứa ít nhất một chữ số, một chữ thường và một chữ hoa",
            }),
        confirm_password: z.string({
            required_error: "Vui lòng xác nhận mật khẩu",
        }),
        username: z
            .string()
            .min(2, {
                message: "Tên đăng nhập phải có ít nhất 2 ký tự",
            })
            .max(256, {
                message: "Tên đăng nhập giới hạn 256 ký tự",
            }),
        first_name: z
            .string()
            .min(2, {
                message: "Tên phải có ít nhất 2 ký tự",
            })
            .max(256, {
                message: "Tên giới hạn 256 ký tự",
            }),
        last_name: z
            .string()
            .min(2, {
                message: "Họ phải có ít nhất 2 ký tự",
            })
            .max(256, {
                message: "Họ giới hạn 256 ký tự",
            }),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirm_password"],
    });
