import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "E-posta adresi zorunludur." })
		.email({ message: "Geçerli bir e-posta adresi girin." }),
	password: z.string().min(1, { message: "Şifre alanı zorunludur" }),
});

export const registerSchema = z.object({
	email: z
		.string()
		.min(1, { message: "E-posta adresi zorunludur." })
		.email({ message: "Geçerli bir e-posta adresi girin." }),
	password: z.string().min(8, { message: "Şifre en az 8 karakter olmalıdır." }),
	name: z.string().min(1, { message: "İsim alanı zorunludur" }),
});
