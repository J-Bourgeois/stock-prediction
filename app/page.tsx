"use server";

import {
  fetchNvidiaStock,
  fetchAppleStock,
  fetchMicrosoftStock,
} from "@/lib/fetchStocks";

import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/session";
import prisma from "@/lib/prisma";

import HomeClientPage from "@/components/HomeClientPage";

export default async function Home() {
  try {
    const [nvidiaData, appleData, microsoftData] = await Promise.all([
      fetchNvidiaStock(),
      fetchAppleStock(),
      fetchMicrosoftStock(),
    ]);

    const cookieStore = await cookies();
    const cookie = cookieStore.get("token")?.value;
    const session = await verifyJwt(cookie);

    let user = null;
    let isLoggedIn = false;

    if (!session) {
      return (
        <HomeClientPage
          nvidiaStock={nvidiaData}
          appleStock={appleData}
          microsoftStock={microsoftData}
          isLoggedIn={isLoggedIn}
        />
      );
    }

    const { email } = session as { email: string };

    user = await prisma.user.findUnique({
      where: { email },
    });
    isLoggedIn = !!user;
    

    return (
      <HomeClientPage
        nvidiaStock={nvidiaData}
        appleStock={appleData}
        microsoftStock={microsoftData}
        isLoggedIn={isLoggedIn}
      />
    );
  } catch (error) {
    console.error("Error fetching Stock Data:", error);
    return (
      <HomeClientPage
        nvidiaStock={{
          data: [],
          meta: {
            date_from: "",
            date_to: "",
          },
        }}
        appleStock={{
          data: [],
          meta: {
            date_from: "",
            date_to: "",
          },
        }}
        microsoftStock={{
          data: [],
          meta: {
            date_from: "",
            date_to: "",
          },
        }}
        isLoggedIn
      />
    );
  }
}
