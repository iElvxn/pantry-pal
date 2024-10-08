import theme from "./theme";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box, Typography, ThemeProvider } from "@mui/material";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import Navigation from "./components/Navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PantryPal",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <body className={inter.className}>
            <Navigation/>
            <main>
              {children}
            </main>
          </body>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}



