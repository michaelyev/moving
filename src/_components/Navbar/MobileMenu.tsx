import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import { BookButton } from "../BookButton/BookButton";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pages: { name: string; link: string }[];
}

const MobileMenu = ({ open, onClose, pages }: MobileMenuProps) => {
  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          background:
            "linear-gradient(90deg, rgba(251,240,212,1) 0%, rgba(216,224,246,1) 100%)",
        },
      }}
    >
      <Box p={2}>
        <List>
          {pages.map((page) => (
            <ListItem key={page.name} disablePadding>
              <ListItemButton onClick={onClose}>
                <Link href={page.link} passHref>
                  <ListItemText
                    sx={{
                      color: "var(--info-main)",
                    }}
                    primary={page.name}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            sx={{
              px: 3,
              py: 1,
              border: 1,
              borderRadius: 8,
              borderColor: "var(--success-main)",
              color: "var(--info-main)",
            }}
            startIcon={<PhoneIcon />}
            component="a"
            href="tel:2062552708" // This makes the button initiate a call
          >
            Call
          </Button>
          <BookButton variant="header" />
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
