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
  
  interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
    pages: string[];
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
              <ListItem key={page} disablePadding>
                <ListItemButton>
                  <ListItemText
                    sx={{
                      color: "var(--info-main)", // Используем глобальную переменную цвета
                    }}
                    primary={page}
                  />
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
            >
              Call
            </Button>
            <Button
              sx={{
                px: 3,
                py: 1,
                backgroundColor: "var(--primary-main)",
                color: "#fff",
                borderRadius: 8,
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Drawer>
    );
  };
  
  export default MobileMenu;
  