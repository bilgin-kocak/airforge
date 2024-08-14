import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { GitHub, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} AirForge. All rights reserved.
          </Typography>
          <Box>
            <IconButton
              color="inherit"
              aria-label="GitHub"
              component="a"
              href="https://github.com/bilgin-kocak/airforge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Twitter"
              component="a"
              href="https://twitter.com/AirDAOOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="LinkedIn"
              component="a"
              href="https://www.linkedin.com/company/airdao/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          <Link href="#" color="inherit" sx={{ mx: 1, my: 0.5 }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1, my: 0.5 }}>
            Terms of Service
          </Link>
          <Link
            href="mailto:kocakbilgin@gmail.com"
            color="inherit"
            sx={{ mx: 1, my: 0.5 }}
          >
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
