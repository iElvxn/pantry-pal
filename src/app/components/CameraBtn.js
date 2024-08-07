import { Box, Button, Container } from "@mui/material";
import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";

export default function CameraBtn({ image, setImage }) {
    const camera = useRef(null);

    return (
        <Container sx={{display: 'flex', justifyContent:'center', alignItems: "center", flexDirection: 'column'}}>
            <Box sx={{ position: 'relative', width: '300px', height: '300px', overflow: 'hidden', borderRadius: "7px" }}>
                <Camera ref={camera} aspectRatio={1} />
            </Box>
            <Button onClick={() => setImage(camera.current.takePhoto())}>Take photo</Button>
            {image && <img style={{ width: "250px", borderRadius: "7px" }} src={image} alt='Taken photo' />}
        </Container>
    );
}
