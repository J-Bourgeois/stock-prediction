import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/session";
import { cookies } from "next/headers";

export async function PortfolioPage() {
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
          stockSelections: true,
        },
      },
    },
  });


  return (
    <div className="flex flex-col w-full h-screen">
      {user?.Portfolio && user.Portfolio[0]?.stockSelections.length > 0 ? (
        user.Portfolio[0].stockSelections.map((item, index) => <div key={index}></div>)
      ) : (
        <p className="p-6 m-auto text-slate-400">
          Oops! Looks like you don't have any stocks in your portfolio! Go to
          the home page to add some!
        </p>
      )}
    </div>
  );
}
