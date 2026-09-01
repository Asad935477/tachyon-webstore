"use client";

import { useState } from "react";

import { AuthShell } from "@/components/auth-shell";
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

export default function LoginPage() {
	const [showSignIn, setShowSignIn] = useState(false);

	return (
		<AuthShell>
			{showSignIn ? (
				<SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
			) : (
				<SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
			)}
		</AuthShell>
	);
}
