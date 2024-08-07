'use client'

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'


export default function IngredientCard({ ingredient }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/ingredient/${ingredient.id}`)
    }


    return (
        <Button onClick={handleClick} sx={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', padding: '16px', borderRadius: '7px', gap: '16px' }}>
            {ingredient.img ?
                <Box component="img" src={ingredient.img} sx={{ height: '250px', width: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '7px' }}></Box>
                :
                <Box component="img" src="https://pusheen.com/wp-content/uploads/2020/12/What-Sweet-Quiz-SocialResults_Donut-1-e1608220861325.jpg" sx={{height: '250px', width: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '7px'}}></Box>
            }
            <Typography sx={{ color: 'cyan', fontSize: "18px" }}>{ingredient.name}</Typography>
            <Typography sx={{ color: '#39FF14', fontSize: "18px" }}>${ingredient.price}</Typography>
            <Typography sx={{ color: 'yellow', fontSize: "18px" }}>Quantity: {ingredient.quantity}</Typography>
        </Button>
    );
}