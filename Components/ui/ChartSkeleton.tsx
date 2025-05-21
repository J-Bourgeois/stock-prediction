import { Skeleton } from "./skeleton";

export function ChartSkeleton() {
  return (
    <>
      <Skeleton className="absolute top-2 left-2 max-w-6/12 min-w-[120px] h-6" />
      <Skeleton className="absolute top-2 right-2 w-[40px] min-h-6 h-6" />
      <div className="flex flex-col border border-foreground rounded-xl mt-10">
        <div className="flex flex-col justify-center gap-6 rounded-xl py-6">
          <div className="flex flex-col space-y-2 items-center">
            <Skeleton className=" w-6/12 h-6" />
            <Skeleton className=" w-10/12 h-6" />
          </div>
          <div className="px-6">
            <Skeleton className="min-h-[200px] h-[200px] w-full rounded-xl" />
          </div>
            <div className="flex items-start pl-6">
                <Skeleton className="min-w-3/12 w-3/12 max-xs:w-8/12 h-6" />
            </div>
        </div>
      </div>
      <div className="flex flex-col items-center pt-4">
        <Skeleton className="w-[190px] min-h-8" />
      </div>
    </>
  );
}
