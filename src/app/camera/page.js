'use client'

import { useState, useEffect, useRef } from "react";
import CameraBtn from "../components/CameraBtn";
import { Container } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import openAI from "../openai";
import { app } from "../firebase";
import CameraAdd from "../components/CameraAdd";

export default function PantryCamera() {
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState("");
    const [data, setData] = useState(null);
    const url = useRef();

    useEffect(() => {
        if (image) {
            console.log('ran')
            const blob = dataURItoBlob(image);
            const objectURL = URL.createObjectURL(blob);
            url.current = objectURL;
            uploadToFirebase(blob);
        }
    }, [image]);

    useEffect(() => {
        if (imgURL) {
            getDataFromURL(imgURL);
        }
    }, [imgURL]);

    const dataURItoBlob = (dataURI) => {
        if (dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }
    };

    const uploadToFirebase = async (blob) => {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${Date.now()}.jpg`);
        await uploadBytes(storageRef, blob)
        const downloadURL = await getDownloadURL(storageRef);
        const json = await openAI(downloadURL);
        console.log(json)
        setData(json);
    };

    const getDataFromURL = async(imgURL) => {
        const json = await openAI(imgURL);
        console.log(json)
        setData(json);
    }

    return (
        <Container> 
            
            {!data ?
                <CameraBtn image={image} setImage={setImage} imgURL={imgURL} setImgURL={setImgURL}/>
                :
                <CameraAdd data={data} />
            }
        </Container>
    )
}