import { Avatar, Box, Button, Heading, IconButton, Text, useToast } from "@chakra-ui/react"
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom"
import { Context } from "../App";
import { EditIcon } from "@chakra-ui/icons";
import User_Details_Row from "../Components/Profile/User_Details_Row";


type DATA = {
    email: string,
    name: string,
    username: string
}

export default function User_Profile() {
    const data = useLoaderData() as DATA;
    const navigate = useNavigate();
    const toast = useToast();
    const context = useOutletContext() as Context;

    console.log("data: ", data);

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
                    <User_Details_Row field={"Name"} value={data.name}/>
                    <User_Details_Row field={"Email"} value={data.email}/>
                    <User_Details_Row field={"Username"} value={data.username}/>
                    <User_Details_Row field={"Password"} value={"********"}/>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" w="60%" m="0 auto" gap={4} >
                <Button onClick={acclogout} w={"20%"}>Log Out</Button>
                <Button border="1px" borderColor="red" _hover={{ bg: 'red', color: '#ffffff' }} w={"25%"}>Delete Account</Button>
            </Box>

        </Box>
    )
}