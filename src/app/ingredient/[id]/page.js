import { Box, Container, Typography } from "@mui/material";
import "../../page.module.css"
import DetailHeader from "@/app/components/DetailHeader";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { redirect } from 'next/navigation'


export default async function IngredientDetail({ params }) {
    const id = params.id

    const getData = async (id) => {
        "use server"
        const docRef = doc(db, "ingredients", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Document data
            const data = docSnap.data();
            return data;
        } else {
            console.log('No such document!');
            return null;
        }
    }

    const deleteIngredient = async () => {
        "use server"
        const docRef = doc(db, "ingredients", id);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            await deleteDoc(docRef)
        }
    
        redirect(`/ingredient`)
    }
    
    const data = await getData(id);
    return (
        <div>
            {data ? (
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", gap: '32px' }}>
                    <DetailHeader data={data} deleteIngredient={deleteIngredient} id={id}/>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", gap: "32px", width: '100%', flexDirection: { xs: "column", sm: "row" } }}>
                        <Box>
                            <Typography sx={{ color: 'rgb(207, 0, 207)', fontSize: { xs: "20px", sm: '32px' } }}>{data.description}</Typography>
                            <Typography sx={{ color: 'rgb(0, 255, 0)', fontSize: { xs: "16px", sm: '24px' } }}>Price: ${data.price}</Typography>
                            <Typography sx={{ color: 'yellow', fontSize: { xs: "16px", sm: '24px' } }}>Quantity: {data.quantity}</Typography>
                        </Box>

                        <Box component="img" src={data.img} sx={{ width: { xs: '250px', md: '500px' }, borderRadius: '12px' }}></Box>
                    </Box>

                </Container>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
}