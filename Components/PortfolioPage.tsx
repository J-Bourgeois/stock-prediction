import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/session";
import { cookies } from "next/headers";
import PortfolioStockPricesResponse from "./PortfolioStockPricesResponse";

interface Props {
  nvidiaStock: any;
  appleStock: any;
  microsoftStock: any;
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
    <div className="flex flex-col min-w-full w-full text-center items-center">
      {user?.Portfolio && user.Portfolio[0]?.stockSelections.length > 0 ? (
        user.Portfolio[0].stockSelections.map((stockSelection) => (
          <PortfolioStockPricesResponse
            key={stockSelection.stock.id}
            stockData={stockSelection.stock}
            nvidiaStock={nvidiaStock}
            appleStock={appleStock}
            microsoftStock={microsoftStock}
          />
        ))
      ) : (
        <p className="p-6 m-auto text-slate-400">
          Oops! Looks like you don't have any stocks in your portfolio! Go to
          the home page to add some!
        </p>
      )}
    </div>
  );
}
