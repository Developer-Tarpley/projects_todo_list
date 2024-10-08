import { Avatar, Box, Button, Heading, IconButton, Text, useToast } from "@chakra-ui/react"
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom"
import { Context } from "../App";
import User_Details_Row from "../Components/Profile/User_Details_Row";
import { useState } from "react";


export type DATA = {
    email: string,
    name: string,
    username: string,
}

export default function User_Profile() {
    const loaderdata = useLoaderData() as DATA;
    const [data, setData] = useState(loaderdata)
    const navigate = useNavigate();
    const toast = useToast();
    const context = useOutletContext() as Context;

    // console.log("u-profile data: ", data);

    function acclogout() {
        localStorage.removeItem("token");
        context.toggleLog();
        navigate("/login");

        toast({
            title: 'Log out successful',
            description: "We'll see you next time.",
            status: 'success',
            duration: 3000,
            isClosable: false,
        })
    }

    async function usersDelete(){
        if(!window.confirm("Are you sure that you want to delete account?")){
          console.log("enjoy");
          return;
        }
        
        const token = localStorage.getItem("token");

        try{
            const response = await fetch('http://localhost:3075/auth/u/delete',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            })

            if(!response.ok){
                const data = await response.json();
                throw new Error(data);
            }

            if(response.ok){
                localStorage.removeItem('token')
                const data = await response.json();
                console.log(data)
                toast({
                    title: 'See you next time!',
                    description: "Great! Your account has been successfully deleted.",
                    status: 'success',
                    duration: 3000,
                    isClosable: false,
                })
            }

        }catch(error){
            console.log(error);
            
            toast({
                title: 'oops!',
                description: "something went wrong. Please try again",
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
        }
    }

    return (
        <Box gap={4} py={20}>
            <Heading textAlign="center">Account Details</Heading>
            <Text textAlign="center">{`Welcome ${data.name}! you could manage your account details here.`}</Text>
            <Box
                w="60%"
                py={20}
                gap={10}
                display="flex"
                m="0px auto"
            >
                <Box display="flex" alignItems="center">
                    <Avatar size='2xl' name='' bg='red.500' />
                </Box>
                <Box display="flex" flexDir="column" gap={4} w="100%">
                    <User_Details_Row setdata={setData} field={"Name"} value={data.name} username={data.username}/>
                    <User_Details_Row setdata={setData} field={"Email"} value={data.email} username={data.username}/>
                    <User_Details_Row setdata={setData} field={"Username"} value={data.username} username={data.username}/>
                    <User_Details_Row setdata={setData} field={"Password"} value={"***********"} username={data.username}/>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" w="60%" m="0 auto" gap={4} >
                <Button onClick={acclogout} w={"20%"}>Log Out</Button>
                <Button onClick={usersDelete} border="1px" borderColor="red" _hover={{ bg: 'red', color: '#ffffff' }} w={"25%"}>Delete Account</Button>
            </Box>

        </Box>
    )
}