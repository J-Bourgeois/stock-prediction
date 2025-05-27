"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/actions";

export const SignupForm = () => {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form action={action} className="grid gap-4 bg-slate-900 rounded-xl p-4">
      <div className="flex justify-between items-center">
        <label htmlFor="name" className="p-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          className="border rounded-xl p-2"
        />
      </div>
      {state?.errors?.name && <p className="text-red-500">{state.errors.name}</p>}
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
      {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
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
      {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
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
      Sign Up
    </button>
  );
}
