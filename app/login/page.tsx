"use client"

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";


export default function loginPage() {
    const searchParams = useSearchParams();
    const signupSuccess = searchParams.get("signup") === "success";

    useEffect(() => {
        if (signupSuccess) {
            toast("User created! Please Sign in");
        }
    }, [signupSuccess]);


  return (
    <div className="flex flex-col items-center w-full pt-6">
      <p>Welcome to the login page!</p>
    </div>
  );
}
