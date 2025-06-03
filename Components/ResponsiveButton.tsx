import { useEffect, useState } from "react";

import { Button } from "./ui/button";

export default function ResponsiveButton() {
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");

    const updateButtonText = () => {
      if (mediaQuery.matches) {
        setButtonText("Ask AI");
      } else {
        setButtonText("Ask AI if you should buy this stock!");
      }
    };

    updateButtonText();

    mediaQuery.addEventListener("change", updateButtonText);

    return () => {
      mediaQuery.removeEventListener("change", updateButtonText);
    };
  }, []);
  return <Button>{buttonText}</Button>;
}
