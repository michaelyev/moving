import { CardProps } from "@/types/types";
import { icons } from "../icons/icons";
import { Box, Typography } from "@mui/material";

const BenefitsCardItem = ({ description, title }: CardProps) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        {icons[title] && (
          <Box
            sx={{
              marginRight: 2,
              backgroundColor: "error.main",
              borderRadius: "50%",
              color: "success.main",
              padding: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icons[title]}
          </Box>
        )}
        <Typography
          component="div"
          fontWeight="500"
          sx={{
            lineHeight: { xs: 1, lg: 2 },
            fontWeight: { sm: 400, lg: 500 },
            typography: { xs: "h6", md: "h5" },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography variant="body1" component="div" lineHeight={1.5} mb={1.5}>
        {description}
      </Typography>
    </Box>
  );
};

export default BenefitsCardItem;
