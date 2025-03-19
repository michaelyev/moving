'use client'
import { Box } from "@mui/joy";
import React, { useEffect, useState } from "react";

export const GoogleReviewMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen width
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 600); // Adjust breakpoint if needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const scriptId = "EmbedSocialWidgetScript";

      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://embedsocial.com/cdn/aht.js";
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, [isMobile]);

  // Do not render anything on non-mobile screens
  if (!isMobile) return null;

  return (
    <Box
      sx={{
        position: "relative",
        bottom: { sm: "50px" },
        right: { sm: "20px" }
      }}
      className="embedsocial-widget"
      data-ref="37a3fbda41dc3959a41ea9007e14abb6"
    />
  );
};



