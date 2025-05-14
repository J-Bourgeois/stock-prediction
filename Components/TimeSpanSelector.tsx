import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/Store";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronDown } from "lucide-react";

type TimeSpan = {
  value: string;
  label: string;
};

const timeOptions: TimeSpan[] = [
  {
    value: "30 Days",
    label: "30 Days",
  },
  {
    value: "60 Days",
    label: "60 Days",
  },
  {
    value: "90 Days",
    label: "90 Days",
  },
  {
    value: "180 Days",
    label: "180 Days",
  },
];

export default function TimeSpanSelector() {
  const timeSpanSelector = useSelector((state: RootState) => state.timeSpan);
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Time Span</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {timeSpanSelector ? (
              <>{timeSpanSelector.label}{<ChevronDown/>}</>
            ) : (
              <>Set time span</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          /* side="right" */
          align="start"
        >
          <div className="grid gap-4">
            
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
