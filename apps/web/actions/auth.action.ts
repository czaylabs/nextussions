"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth/client";
import { getAuthErrorMessage } from "@/lib/auth/error-message";
import { loginSchema, registerSchema } from "@/validations/auth.validation";
import { APIError, BetterAuthError } from "better-auth";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
	const email = formData.get("email");
	const password = formData.get("password");

	const {
		success: validationSuccess,
		data: validationData,
		error: validationError,
	} = loginSchema.safeParse({
		email,
		password,
	});

	console.log(validationSuccess, validationData, validationError);

	if (!validationSuccess) {
		return {
			success: false,
			error: {
				email: validationError.flatten().fieldErrors.email,
				password: validationError.flatten().fieldErrors.password,
			},
		};
	}

	try {
		await auth.api.signInEmail({
			body: {
				email: validationData.email,
				password: validationData.password,
			},
		});
	} catch (error) {
		console.log();

		return {
			success: false,
			error: {
				global:
					getAuthErrorMessage((error as APIError).body?.code!, "tr") ||
					"Bir hata oluştu.",
			},
		};
	}

	return redirect("/");
}

export async function register(prevState: any, formData: FormData) {
	const email = formData.get("email");
	const password = formData.get("password");
	const name = formData.get("name");

	const {
		success: validationSuccess,
		data: validationData,
		error: validationError,
	} = registerSchema.safeParse({
		email,
		password,
		name,
	});

	if (!validationSuccess) {
		return {
			success: false,
			error: {
				email: validationError.flatten().fieldErrors.email,
				password: validationError.flatten().fieldErrors.password,
				name: validationError.flatten().fieldErrors.name,
			},
		};
	}

	try {
		await auth.api.signUpEmail({
			body: {
				email: validationData.email,
				password: validationData.password,
				name: validationData.name,
			},
		});
	} catch (error) {
		return {
			success: false,
			error: {
				global: getAuthErrorMessage((error as APIError).body?.code!, "tr"),
			},
		};
	}

	return redirect("/");
}
