import { Box, Link } from "@mui/material";

const ContactInfo = () => (
  <Box sx={{ lineHeight: 3 }}>
    <Link
      underline="none"
      display="block"
      href="#"
      color="inherit"
      sx={{ lineHeight: 2 }}
    >
      +1 232 232 454
    </Link>
    <Link
      underline="none"
      display="block"
      href="#"
      color="inherit"
      sx={{ lineHeight: 2 }}
    >
      Seattle, Street, 1
    </Link>
    <Link
      underline="none"
      display="block"
      href="#"
      color="inherit"
      sx={{ lineHeight: 2 }}
    >
      email@email.com
    </Link>
    <Link
      underline="none"
      display="block"
      href="#"
      color="inherit"
      sx={{ lineHeight: 2 }}
    >
      8am-5pm, Mon-Sun
    </Link>
  </Box>
);

export default ContactInfo;
