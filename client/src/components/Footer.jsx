import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import React from "react";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#0f1b2d", color: "#fff", pt: 6, pb: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src="/images/new_logo.svg"
                  alt="KK Mart"
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  KK Mart
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  maxWidth: 350,
                }}
              >
                Your one-stop destination for premium products at affordable
                prices. Quality is our priority, and customer satisfaction is
                our goal.
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <SocialIcon
                  icon={<FacebookIcon />}
                  href="https://facebook.com"
                />
                <SocialIcon icon={<TwitterIcon />} href="https://twitter.com" />
                <SocialIcon
                  icon={<InstagramIcon />}
                  href="https://instagram.com"
                />
                <SocialIcon
                  icon={<GitHubIcon />}
                  href="https://github.com/kkapil94"
                />
                <SocialIcon
                  icon={<LinkedInIcon />}
                  href="https://www.linkedin.com/in/kapil-khatri-151413249/"
                />
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                position: "relative",
                display: "inline-block",
                pb: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "30px",
                  height: "3px",
                  backgroundColor: "primary.main",
                  borderRadius: "3px",
                },
              }}
            >
              Quick Links
            </Typography>

            <Stack spacing={1}>
              <FooterLink href="/" text="Home" />
              <FooterLink href="/products" text="Products" />
              <FooterLink href="/cart" text="Cart" />
              <FooterLink href="/account" text="My Account" />
            </Stack>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                position: "relative",
                display: "inline-block",
                pb: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "30px",
                  height: "3px",
                  backgroundColor: "primary.main",
                  borderRadius: "3px",
                },
              }}
            >
              Customer Service
            </Typography>

            <Stack spacing={1}>
              <FooterLink href="#" text="Track Order" />
              <FooterLink href="#" text="Returns & Refunds" />
              <FooterLink href="#" text="Shipping Info" />
              <FooterLink href="#" text="FAQ" />
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                position: "relative",
                display: "inline-block",
                pb: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "30px",
                  height: "3px",
                  backgroundColor: "primary.main",
                  borderRadius: "3px",
                },
              }}
            >
              Stay Connected
            </Typography>

            <Stack spacing={2}>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                Subscribe to our newsletter for updates, promotions, and
                exclusive offers.
              </Typography>

              <Box
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle newsletter subscription here
                }}
              >
                <TextField
                  placeholder="Your email address"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "4px 0 0 4px",
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    height: "40px",
                    borderRadius: "0 4px 4px 0",
                  }}
                >
                  <SendIcon />
                </Button>
              </Box>

              <Stack spacing={1.5}>
                <ContactItem
                  icon={<LocationOnIcon fontSize="small" />}
                  text="123 Commerce Street, Shopville, India"
                />
                <ContactItem
                  icon={<PhoneIcon fontSize="small" />}
                  text="+91 123-456-7890"
                />
                <ContactItem
                  icon={<EmailIcon fontSize="small" />}
                  text="support@kkmart.com"
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{ mt: 6, pt: 3, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} md="auto">
              <Typography
                variant="body2"
                color="rgba(255, 255, 255, 0.6)"
                textAlign={{ xs: "center", md: "left" }}
              >
                © {new Date().getFullYear()} KK Mart. All rights reserved. |
                Designed with ❤️ by Kapil Khatri
              </Typography>
            </Grid>

            <Grid item xs={12} md="auto">
              <Stack
                direction="row"
                spacing={3}
                divider={
                  <Box
                    sx={{ borderLeft: "1px solid rgba(255, 255, 255, 0.2)" }}
                  />
                }
                sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
              >
                <Link
                  href="#"
                  underline="hover"
                  color="rgba(255, 255, 255, 0.6)"
                  sx={{ fontSize: "0.875rem" }}
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  underline="hover"
                  color="rgba(255, 255, 255, 0.6)"
                  sx={{ fontSize: "0.875rem" }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  underline="hover"
                  color="rgba(255, 255, 255, 0.6)"
                  sx={{ fontSize: "0.875rem" }}
                >
                  Cookies
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

// Helper components
function FooterLink({ href, text }) {
  return (
    <Link
      href={href}
      underline="hover"
      sx={{
        color: "rgba(255, 255, 255, 0.7)",
        transition: "all 0.2s",
        "&:hover": {
          color: "white",
          paddingLeft: "4px",
        },
      }}
    >
      {text}
    </Link>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "50%",
        bgcolor: "rgba(255, 255, 255, 0.1)",
        color: "white",
        transition: "all 0.2s",
        "&:hover": {
          bgcolor: "primary.main",
          transform: "translateY(-3px)",
        },
      }}
    >
      {icon}
    </Link>
  );
}

function ContactItem({ icon, text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ color: "primary.main" }}>{icon}</Box>
      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
        {text}
      </Typography>
    </Box>
  );
}
