// @ts-nocheck

import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";

// Define internal types
type CardItemProps = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  author?: string;
};

type UniversalCardLayoutProps = {
  variant: "benefits" | "reviews" | "workflow";
  data: CardItemProps[] | { processes: CardItemProps[]; processes2: CardItemProps[] };
  buttonProps?: {
    text: string;
    sx?: object;
  };
};

// Internal Card Item Component for rendering each item
const CardItemComponent: React.FC<CardItemProps> = ({ title, description, content, author }) => (
  <Box>
    <Typography variant="h6">{title}</Typography>
    {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
    {content && <Typography variant="body2">{content}</Typography>}
    {author && <Typography variant="caption" color="text.secondary">- {author}</Typography>}
  </Box>
);

const UniversalCardLayout: React.FC<UniversalCardLayoutProps> = ({
  variant,
  data,
  buttonProps = {
    text: "Calculate Price",
    sx: { mt: 3 },
  },
}) => {
  const renderBenefits = (items: CardItemProps[]) => {
    const firstGroup = items.slice(0, 3);
    const secondGroup = items.slice(3, 6);

    return (
      <Box
        display="flex"
        height="100%"
        justifyContent="center"
        gap={3}
        alignItems="center"
        sx={{
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        <Card
          sx={{
            padding: 3,
            display: "flex",
            gap: 3,
            flexDirection: "column",
            borderRadius: 8,
            maxWidth: "500px",
          }}
        >
          {firstGroup.map((item) => (
            <CardItemComponent key={item.id} title={item.title} description={item.description} />
          ))}
        </Card>
        <Card
          sx={{
            padding: 3,
            borderRadius: 8,
            maxWidth: "500px",
            display: "flex",
            gap: 3,
            flexDirection: "column",
          }}
        >
          {secondGroup.map((item) => (
            <CardItemComponent key={item.id} title={item.title} description={item.description} />
          ))}
        </Card>
      </Box>
    );
  };

  const renderReviews = (items: CardItemProps[]) => (
    <Box display="flex" mt={3} gap={6} sx={{ display: { xs: "none", lg: "flex" } }} justifyContent="space-between">
      {items.map((review) => (
        <CardItemComponent key={review.id} content={review.content} author={review.author} title={review.title} />
      ))}
    </Box>
  );

  const renderWorkflow = (data: { processes: CardItemProps[]; processes2: CardItemProps[] }) => (
    <Box>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "905px",
          borderRadius: 8,
          padding: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          {data.processes.map((card) => (
            <CardItemComponent key={card.id} description={card.description} title={card.title} />
          ))}
        </Box>
        <Box sx={{ width: 302, height: 302, borderRadius: 8, backgroundColor: "grey.300", mt: { xs: 2, md: 0 } }} />
      </Card>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "905px",
          borderRadius: 8,
          padding: 2,
          mt: 8,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ width: 302, height: 302, borderRadius: 8, backgroundColor: "grey.300", mb: { xs: 2, md: 0 } }} />
        <Box ml={3}>
          {data.processes2.map((card) => (
            <CardItemComponent key={card.id} description={card.description} title={card.title} />
          ))}
          <Button
            variant="contained"
            color="primary"
            sx={{
              ...buttonProps.sx,
              display: variant === "workflow" ? "block" : "none",
            }}
          >
            {buttonProps.text}
          </Button>
        </Box>
      </Card>
    </Box>
  );

  const renderContent = () => {
    switch (variant) {
      case "benefits":
        return renderBenefits(data as CardItemProps[]);
      case "reviews":
        return renderReviews(data as CardItemProps[]);
      case "workflow":
        return renderWorkflow(data as { processes: CardItemProps[]; processes2: CardItemProps[] });
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        mt: 14,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Our Benefits
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Why Choose Us? Unmatched Service, Reliability, and Care.
      </Typography>
      {renderContent()}
    </Box>
  );
};

