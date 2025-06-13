"use client"

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LogInForm } from "@/components/Login-form";
import { toast } from "sonner";


export default function loginPage() {
    const searchParams = useSearchParams();
    const signupSuccess = searchParams.get("signup") === "success";
    const emailChangeSuccess = searchParams.get("emailChange") === "success";
    const passwordChangeSuccess = searchParams.get("passwordChange") === "success";

    useEffect(() => {
        if (signupSuccess) {
            toast("User created! Please Sign in");
        }

        if (emailChangeSuccess) {
          toast("Email changed! Please log back in")
        }

        if (passwordChangeSuccess) {
          toast("Password changed! Please log back in")
        }

    }, [signupSuccess, emailChangeSuccess, passwordChangeSuccess]);


  return (
    <div className="flex flex-col items-center w-full pt-24">
      <LogInForm/>
    </div>
  );
}
