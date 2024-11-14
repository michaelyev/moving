// @ts-nocheck
import { ServiceCardProps } from "@/types/types";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ServiceCardItem = ({ description, features, title }: ServiceCardProps) => {
  return (
    <Grid
      item
      md={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
      id='services'
    >
      <Card
        sx={{
          height: "240px",
          width: {sm:"320px", xs: '315px'},
          padding: {  sm: 1, xs:2 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 3,
          borderRadius: 8,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#FFD231",
            zIndex: 1,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            fontWeight={500}
            sx={{
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginBottom: { xs: 1, sm: 2 },
            }}
          >
            {description}
          </Typography>
          <Typography
            variant="body1"
            component="ul"
            sx={{
              listStyleType: "disc",
              paddingLeft: 3,
              lineHeight: 2,
              marginBottom: { xs: 1, sm: 2 },
              color: "#343A40",
            }}
          >
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ServiceCardItem;
