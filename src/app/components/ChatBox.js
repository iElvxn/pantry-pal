'use client'

import { Box, Button, Container, Input, Typography } from "@mui/material"
import { useState } from "react"
import { chatAI } from "../openai";

export default function ChatBox({ }) {
    const [msg, setMsg] = useState("");
    const [msgArray, setMsgArray] = useState([]);

    const handleSubmit = async () => {
        setMsgArray([{ role: "user", content: `${msg}` }]);
        const tempMsgArray = await chatAI(msg);
        setMsgArray(tempMsgArray);
        console.log(tempMsgArray[0])
        setMsg("");
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography className="yellow-text" variant="h4" sx={{textAlign: 'center', fontSize: {xs: '24px', sm: "32px"}}}>Chat With PantryPal</Typography>
            <Box sx={{ width: '100%', height: '65vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
                {msgArray.map((message) => (
                    <>
                        {message.role == 'user' ?
                            <Box sx={{ display: "flex", flexDirection: 'row', textAlign: 'right', maxWidth: '100%', alignSelf: 'flex-end', gap: '16px' }}>
                                <Box component='img' sx={{ width: '50px', height: '50px', borderRadius: '25px' }} src="https://pusheen.com/wp-content/uploads/2020/12/What-Sweet-Quiz-SocialResults_Donut-1-e1608220861325.jpg"></Box>

                                <Box>
                                    <Typography sx={{color: 'cyan'}}>You</Typography>
                                    <Typography sx={{ whiteSpace: "pre-wrap" }}>{message.content}</Typography>
                                </Box>
                            </Box>
                            :
                            <Box sx={{ display: "flex", flexDirection: 'row', textAlign: 'left', maxWidth: '100%', gap: '16px' }}>
                                <Box component='img' sx={{ width: '50px', height: '50px', borderRadius: '25px' }} src="https://pusheen.com/wp-content/uploads/2020/12/What-Sweet-Quiz-SocialResults_Donut-1-e1608220861325.jpg"></Box>
                                <Box>
                                    <Typography className="purple-text">PantryPal</Typography>
                                    <Typography sx={{ whiteSpace: "pre-wrap" }}>{message.content}</Typography>
                                </Box>
                            </Box>
                        }

                    </>

                ))}
            </Box>
            <Box sx={{padding: '16px'}}>
                <Input value={msg} onChange={(e) => { setMsg(e.target.value) }}></Input>
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
        </Container>
    )
}