"use client";

import { Button } from "@tachyon-webstore/ui/components/button";
import { Input } from "@tachyon-webstore/ui/components/input";
import { Label } from "@tachyon-webstore/ui/components/label";
import { Separator } from "@tachyon-webstore/ui/components/separator";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

import Loader from "./loader";

export default function SignUpForm({
	onSwitchToSignIn,
}: {
	onSwitchToSignIn: () => void;
}) {
	const router = useRouter();
	const { isPending } = authClient.useSession();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					name: value.name,
				},
				{
					onSuccess: () => {
						router.push("/dashboard");
						toast.success("Account created");
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				},
			);
		},
		validators: {
			onSubmit: z.object({
				name: z.string().min(2, "Name must be at least 2 characters"),
				email: z.email("Invalid email address"),
				password: z.string().min(8, "Password must be at least 8 characters"),
			}),
		},
	});

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
				<p className="text-sm text-muted-foreground">
					Start building a better setup with Tachyon.
				</p>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="space-y-5"
			>
				<form.Field name="name">
					{(field) => (
						<div className="space-y-2">
							<Label htmlFor={field.name}>Name</Label>
							<div className="relative">
								<User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									id={field.name}
									name={field.name}
									placeholder="Your name"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									className="h-11 pl-10"
								/>
							</div>
							{field.state.meta.errors.map((error) => (
								<p key={error?.message} className="text-xs text-destructive">
									{error?.message}
								</p>
							))}
						</div>
					)}
				</form.Field>

				<form.Field name="email">
					{(field) => (
						<div className="space-y-2">
							<Label htmlFor={field.name}>Email</Label>
							<div className="relative">
								<Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									id={field.name}
									name={field.name}
									type="email"
									placeholder="you@example.com"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									className="h-11 pl-10"
								/>
							</div>
							{field.state.meta.errors.map((error) => (
								<p key={error?.message} className="text-xs text-destructive">
									{error?.message}
								</p>
							))}
						</div>
					)}
				</form.Field>

				<form.Field name="password">
					{(field) => (
						<div className="space-y-2">
							<Label htmlFor={field.name}>Password</Label>
							<Input
								id={field.name}
								name={field.name}
								type="password"
								placeholder="At least 8 characters"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								className="h-11"
							/>
							{field.state.meta.errors.map((error) => (
								<p key={error?.message} className="text-xs text-destructive">
									{error?.message}
								</p>
							))}
						</div>
					)}
				</form.Field>

				<form.Subscribe
					selector={(state) => ({
						canSubmit: state.canSubmit,
						isSubmitting: state.isSubmitting,
					})}
				>
					{({ canSubmit, isSubmitting }) => (
						<Button
							type="submit"
							size="lg"
							className="group h-11 w-full"
							disabled={!canSubmit || isSubmitting}
						>
							{isSubmitting ? "Creating account..." : "Create account"}
							<ArrowRight className="transition-transform group-hover:translate-x-0.5" />
						</Button>
					)}
				</form.Subscribe>
			</form>

			<div className="flex items-center gap-3">
				<Separator className="flex-1" />
				<span className="text-xs text-muted-foreground">Already have an account?</span>
				<Separator className="flex-1" />
			</div>

			<Button
				variant="outline"
				size="lg"
				className="h-11 w-full"
				onClick={onSwitchToSignIn}
			>
				Sign in
			</Button>
		</div>
	);
}
