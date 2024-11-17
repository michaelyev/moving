import { Box, Typography } from "@mui/material";
import React from "react";

interface ISectionLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  fullHeight?: boolean;
  position?: boolean;
  marginTop?: number;
}

const SectionLayout = ({
  title,
  subtitle,
  children,
  fullHeight = false,
  position = false,
  marginTop = 0,
}: ISectionLayoutProps) => {
  return (
    <Box
      height={fullHeight ? "calc(100vh - 88px)" : "100%"}
      position={position ? "relative" : "static"}
      mt={marginTop}
    >
      <Typography
        variant="h3"
        sx={{
          typography: { xs: "h4", md: "h3" },
          textAlign: { xs: "center", md: "left" }, // Center on mobile, left on desktop
        }}
        lineHeight={1}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          typography: { xs: "body1", md: "h6" },
          textAlign: { xs: "center", md: "left" }, // Center on mobile, left on desktop
        }}
        lineHeight={2}
        marginBottom={3}
      >
        {subtitle}
      </Typography>
      {children}
    </Box>
  );
};

export default SectionLayout;
