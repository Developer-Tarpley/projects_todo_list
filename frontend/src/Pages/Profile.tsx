import { Box, Button, Text, useToast } from "@chakra-ui/react"
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom"
import { Context } from "../App";


export default function User_Profile() {
    const data = useLoaderData();
    const navigate = useNavigate();
    const toast = useToast();
    const context = useOutletContext() as Context;

    // console.log("data: ", data);

    function acclogout(){
        localStorage.removeItem("token");
        context.toggleLog();
        navigate("/login");

        toast({
            title: 'Log out successful',
            description: "We'll see you next time.",
            status: 'success',
            duration: 9000,
            isClosable: false,
        })
    }

    return (
        <Box>
            <Text>Account Details</Text>
            <Button onClick={acclogout}>Log Out</Button>
        </Box>
    )
}