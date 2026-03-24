import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

function LoginFallback() {
  return (
    <div className="h-10 w-full max-w-sm animate-pulse rounded-2xl bg-[var(--rm-grey-light)]" />
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold tracking-wide text-[var(--rm-grey)]">
          إدارة المجمع السكني
        </p>
        <p className="mt-1 text-lg font-semibold text-[var(--rm-navy)]">
          بوابة السكان والإدارة
        </p>
      </div>
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
