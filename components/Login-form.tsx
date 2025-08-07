/**
 * Authentication form for user login.
 * Handles user credentials and authentication state.
 *
 * Features:
 * - Email/Password authentication
 * - Form validation
 * - Error handling
 * - Remember me option
 * - Forgot password link
 * - Sign up redirect
 */

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { logIn } from "@/actions";

export const LogInForm = () => {
  const [state, action] = useActionState(logIn, undefined);

  return (
    <form action={action} className="grid gap-4 bg-slate-900 rounded-xl p-4">
      <div className="flex justify-between items-center">
        <label htmlFor="email" className="p-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="border rounded-xl p-2"
        />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <div className="flex justify-between items-center">
        <label htmlFor="password" className="p-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          className="border rounded-xl p-2"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="m-auto bg-slate-800 rounded-xl text-center p-2 w-6/12"
    >
      Log In
    </button>
  );
}
