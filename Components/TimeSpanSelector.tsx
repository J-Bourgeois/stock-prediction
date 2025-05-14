"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/Store";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronDown } from "lucide-react";
import { setTimeSpan } from "@/store/timeSpanSlice";
import { cn } from "../lib/utils";

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
      <p className="xs:opacity-100 opacity-0 text-sm text-muted-foreground">Time Span</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="relative w-[150px] justify-start"
          >
            {timeSpanSelector ? (
              <>
                {timeSpanSelector.label}
                <div className="chevronDown absolute right-2">
                  <ChevronDown />
                </div>
              </>
            ) : (
              <>Set time span{<ChevronDown />}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 max-w-6/12 m-auto"
          side="bottom"
          align="start"
        >
          <div className="grid gap-2 w-full">
            {timeOptions.map((time) => {
              return (
                <div key={time.label} data-key={time.label} className="relative flex items-center justify-between">
                  <Button
                    value={time.value}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      timeSpanSelector.selectedTimeSpan === time.value
                        ? ""
                        : dispatch(setTimeSpan(time.value));
                      setOpen(false);
                    }}
                  >
                    {time.label}
                  </Button>
                  <Check
                    className={cn(
                      "absolute right-2 h-4 w-4",
                      timeSpanSelector.selectedTimeSpan === time.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
