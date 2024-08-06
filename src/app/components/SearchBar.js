import { useEffect, useState } from 'react';
import { TextField, Button, Container, Input, Box, Typography } from '@mui/material';
import { doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/navigation'

export default function SearchBar( {uid} ) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        handleSearch();
    },[searchQuery])

    const handleSearch = async () => {
        console.log(searchQuery)
        if (searchQuery.trim() === '') {
            setResults([]);
            return;
        }
        const userRef = doc(db, "users", uid);

        const q = query(
            collection(userRef, 'ingredients'),
            where('name', '>=', searchQuery),
            where('name', '<=', searchQuery + '\uf8ff') // Ensures we get all matches including those starting with searchQuery
        );

        const querySnapshot = await getDocs(q);
        const searchResults = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setResults(searchResults);
    };

    const router = useRouter();

    const handleClick = (id) => {
        router.push(`/ingredient/${id}`)
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Box>
                <Input
                    label="Search Ingredients"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => {setSearchQuery(e.target.value);}}
                    sx={{ marginBottom: '16px', color: 'black' }}
                />
                <Button variant="contained" onClick={handleSearch}>
                    Search
                </Button>
            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
                {results.map((result) => (
                    <Button onClick={() => handleClick(result.id)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2px', borderRadius: '15px', gap: '16px', width: "350px" }}>
                        <Box key={result.id}>
                            <Typography variant='h6'>{result.name}</Typography>
                            <Typography>{result.description}</Typography>
                        </Box>
                    </Button>
                ))}
            </Box>
        </Box>
    );
}
