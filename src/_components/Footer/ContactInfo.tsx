import { Box, Link } from "@mui/material";
import { BookButton } from "../BookButton/BookButton";

const ContactInfo = () => (
  <Box sx={{ lineHeight: 3 }}>
    {/* Phone Number */}
    <BookButton variant="regular" />
    <Link
      underline="none"
      display="block"
      href="tel:2062552708"
      color="inherit"
      sx={{ lineHeight: 2 }}
    >
      206-923-8356
    </Link>

    {/* Address */}
    <Link
      underline="none"
      display="block"
      href="https://www.google.com/maps/place/518+NE+102nd+St,+Seattle,+WA+98125"
      target="_blank"
      rel="noopener noreferrer"
      color="inherit"
      sx={{ lineHeight: 2 }}
    >
      518 NE 102nd St, Seattle, WA 98125
    </Link>

    {/* Email */}
    <Link
      underline="none"
      display="block"
      href="mailto:michael@movestream.us"
      color="inherit"
      sx={{ lineHeight: 2 }}
    >
      michael@movestream.us
    </Link>

    {/* Business Hours */}
    <Link
      underline="none"
      display="block"
      color="inherit"
      sx={{ lineHeight: 2 }}
    >
      8am-5pm, Mon-Sun
    </Link>
  </Box>
);

export default ContactInfo;
