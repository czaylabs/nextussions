import { authClient } from "./client";

type ErrorTypes = Partial<
	Record<
		keyof typeof authClient.$ERROR_CODES,
		{
			en: string;
			tr: string;
		}
	>
>;

const errorCodes = {
	USER_ALREADY_EXISTS: {
		en: "user already registered",
		tr: "Kullanıcı zaten kayıtlı",
	},
	USER_NOT_FOUND: {
		en: "user not found",
		tr: "Kullanıcı bulunamadı",
	},
	INVALID_PASSWORD: {
		en: "invalid password",
		tr: "geçersiz şifre",
	},
	INVALID_EMAIL_OR_PASSWORD: {
		en: "invalid email or password",
		tr: "Geçersiz e-posta veya şifre",
	},
	INVALID_EMAIL: {
		en: "invalid email",
		tr: "geçersiz e-posta",
	},
	INVALID_TOKEN: {
		en: "invalid token",
		tr: "geçersiz token",
	},
	SESSION_EXPIRED: {
		en: "session expired",
		tr: "oturum süresi dolmuş",
	},
} satisfies ErrorTypes;

export const getAuthErrorMessage = (code: string, lang: "en" | "tr") => {
	if (code in errorCodes) {
		return errorCodes[code as keyof typeof errorCodes][lang];
	}
	return "";
};
