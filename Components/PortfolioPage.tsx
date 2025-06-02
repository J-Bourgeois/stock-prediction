import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/session";
import { cookies } from "next/headers";
import { PortfolioWrapper } from "./PortfolioWrapper";
import { homeStocksApi } from "@/app/types/homeStocksInterface";

interface Props {
  nvidiaStock: homeStocksApi;
  appleStock: homeStocksApi;
  microsoftStock: homeStocksApi;
}

export async function PortfolioPage({
  nvidiaStock,
  appleStock,
  microsoftStock,
}: Props) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("token")?.value;
  const session = await verifyJwt(cookie);

  if (!session) return;

  const { email } = session as { email: string };

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      Portfolio: {
        include: {
          stockSelections: {
            include: {
              stock: true,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <PortfolioWrapper
        userData={user}
        nvidiaStock={nvidiaStock}
        appleStock={appleStock}
        microsoftStock={microsoftStock}
      />
    </>
  );
}
