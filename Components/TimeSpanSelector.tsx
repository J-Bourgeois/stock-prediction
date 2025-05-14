import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/Store";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronDown } from "lucide-react";

const timeOptions = ["30 Days", "60 Days", "90 Days", "180 Days"];

export default function TimeSpanSelector() {
    const [open, setOpen] = useState(false);


  const timeSpanSelector = useSelector((state: RootState) => state.timeSpan);
  const dispatch = useDispatch<AppDispatch>();

  return;
}

