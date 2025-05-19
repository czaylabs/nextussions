"use client";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { PasswordInput } from "@workspace/ui/components/password-input";
import {
	IconAlertCircle,
	IconBrandGoogle,
	IconLoader2,
} from "@tabler/icons-react";
import { login } from "@/actions/auth.action";
import { useActionState, useState } from "react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@workspace/ui/components/alert";
import Link from "next/link";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [state, action, isPending] = useActionState(login, undefined);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			{state?.error?.global && (
				<Alert variant="destructive">
					<IconAlertCircle className="h-4 w-4" />
					<AlertTitle>Hata!</AlertTitle>
					<AlertDescription>{state.error.global}</AlertDescription>
				</Alert>
			)}
			<Card>
				<CardHeader>
					<CardTitle>Hesabına Giriş Yap</CardTitle>
					<CardDescription>
						E-posta adresin ve şifren ile giriş yap.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={action}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">E-posta Adresi</Label>
								<Input
									disabled={isPending}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									type="email"
									name="email"
									placeholder="m@example.com"
									required
								/>
								{state?.error?.email && (
									<p className="text-sm text-red-500">{state.error.email}</p>
								)}
							</div>
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password">Şifre</Label>
									<a
										href="#"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Şifreni mi unuttun?
									</a>
								</div>
								<PasswordInput
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									disabled={isPending}
									name="password"
									id="password"
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button disabled={isPending} type="submit" className="w-full">
									{isPending ? (
										<IconLoader2 className="h-4 w-4 animate-spin" />
									) : (
										"Giriş Yap"
									)}
								</Button>
								<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
									<span className="relative z-10 bg-background px-2 text-muted-foreground">
										Veya
									</span>
								</div>
								<Button
									disabled={isPending}
									variant="outline"
									className="w-full"
								>
									<IconBrandGoogle />
									Google ile giriş yap
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Henüz bir hesabın yok mu?{" "}
							<Link href="/register" className="underline underline-offset-4">
								Aramıza Katıl
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
