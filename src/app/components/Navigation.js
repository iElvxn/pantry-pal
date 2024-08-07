'use client'

import { useAuth } from "./AuthProvider";
import { Box, Typography, ThemeProvider, useRadioGroup } from "@mui/material";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const uid = useAuth();
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await auth.signOut();

        } catch (error) {

        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: '16px' }}>
            <a className="navbar-brand" href="/">
                <Typography className="purple-text" sx={{ fontSize: { xs: '20px', sm: '24px' } }}>PalPantry</Typography>
            </a>
            <span className="navbar-toggler-icon"></span>
            <div>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                    <Typography className="nav-item active" sx={{ fontSize: { xs: '20px', sm: '24px' } }}>
                        <a className="nav-link yellow-text" href="/ingredient">Ingredients</a>
                    </Typography>
                    <Typography className="nav-item" sx={{ fontSize: { xs: '20px', sm: '24px' } }}>
                        {uid ?
                            <a onClick={handleSignOut} className="nav-link red-text" href="/login">Log Out</a>
                            :
                            <a className="nav-link red-text" href="/login">Login</a>
                        }
                    </Typography>
                </Box>
            </div>
        </Box>
    )
}