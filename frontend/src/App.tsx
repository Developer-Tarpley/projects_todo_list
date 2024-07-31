import { Box, Button, ChakraProvider, Input } from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function handleApiTest(){
    try{
      const response = await fetch('http://localhost:3075/name',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName})
      });
      const data = await response.text();

      if(data){
        console.log(data);
      }
    }catch(error){
      console.log(error);
    }
  }
  // async function handleApiTest(){
  //   try{
  //     const response = await fetch('http://localhost:3075');
  //     const data = await response.text();

  //     if(data){
  //       console.log(data);
  //     }
  //   }catch(error){
  //     console.log(error);
  //   }
  // }
  return (
   <ChakraProvider>
    <Box m={10} display={'flex'} gap={4}>Hi from app!
    <Input onChange={(e)=>setFirstName(e.target.value)} placeholder='Enter First Name' />
    <Input onChange={(e)=>setLastName(e.target.value)} placeholder='Enter Last Name' />
    <Button colorScheme='blue' onClick={handleApiTest}>Add Name</Button>
    </Box>
   </ChakraProvider>
  );
}

export default App;
