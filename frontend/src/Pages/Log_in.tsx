import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import User_Reset_Modal from "../Components/Login/User_Reset_Modal";



export default function Log_in() {
    const navigate = useNavigate();
    const toast = useToast();
    const context = useOutletContext() as Context;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [inputErrorUsername, setInputErrorUsername] = useState(false);
    const [inputErrorPWD, setInputErrorPWD] = useState(false);

    const isErrorUsername = username === "" && inputErrorUsername;
    const isErrorPWD = password === "" && inputErrorPWD;


    async function loginSubmission() {
        setInputErrorPWD(true);
        setInputErrorUsername(true);

        if (username === "" || password === "" ) {
            // console.log("Error has Occured!")
            return;
        } else {
                const response = await fetch(`http://localhost:3075/auth/log_in`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const data = await response.text();
                    // console.log('data: ', data)
                    context.toggleLog();

                    // would like to set this in env
                    const token = data;
                    localStorage.setItem("token", token);

                    // console.log("response: ", response.text())
                    setUsername("");
                    setPassword("");
                 

                    toast({
                        title: 'Successful Login.',
                        description: `Welcome back, ${username}`,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })

                    navigate(`/projects`);
                } else {
                    // show error message

                    setUsername("");
                    setPassword("");

                    toast({
                        title: '',
                        description: "oops! something went wrong. Please try again",
                        status: 'error',
                        duration: 9000,
                        isClosable: false,
                    })
                    // throw new Error("Error has occurred!")
                }

            
        }// end if.

    }// end func.

    // console.log("SHOW RESET: ",showReset)
    return (
        <Box gap={4} py={20} >
            {context.showReset && <User_Reset_Modal />}
            <Heading textShadow='1px 1px #ffffff' m='6' mb={8} textAlign={"center"}>Log into Account</Heading>
            <Box
                w="75%"
                h="350px"
                gap={4}
                display="flex"
                flexDir="column"
                justifyContent="center"
                m="0px auto"
                bg={"#F7FAFC"}
                borderRadius={"15px"}
                boxShadow='dark-lg'
                p={4}
            >
                <FormControl isRequired isInvalid={isErrorUsername} w="100%">
                    <FormLabel>Username</FormLabel>
                    <Input type='text' value={username ? username : ""} onChange={(e) => [setUsername(e.target.value), setInputErrorUsername(false)]} />
                    {!isErrorUsername ? null : <FormErrorMessage>Username is required.</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={isErrorPWD} w="100%">
                    <FormLabel>Password</FormLabel>
                    <Input type='password' value={password ? password : ""} onChange={(e) => [setPassword(e.target.value), setInputErrorPWD(false)]} />
                    {!isErrorPWD ? null : <FormErrorMessage>Password is required.</FormErrorMessage>}
                </FormControl>

                <Button onClick={loginSubmission} w="100%">Log In</Button>

                <Box
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
                 gap={4}
                 >
                    <Text>forgot your password?</Text>
                    <Button onClick={context.toggleReset}>Reset Password</Button>
                </Box>
                
            </Box>


            {/* end outer main Box */}
        </Box>

    )
}