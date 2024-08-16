import { CloseIcon } from "@chakra-ui/icons"
import { Box, Button, IconButton, Input, Text, useToast } from "@chakra-ui/react"
import { useOutletContext } from "react-router-dom"
import { Context } from "../../App";
import { useState } from "react";
import { isnotValidEmail } from "../../Pages/Sign_up";


export default function User_Reset_Modal() {
    const context = useOutletContext() as Context;
    const toast = useToast();

    const [email, setEmail] = useState("");
    async function submitEmail() {

        try {
            const invalidEmail = isnotValidEmail(email)
            if (invalidEmail) {
                toast({
                    title: 'oops!',
                    description: "Please enter a valid email address!",
                    status: 'error',
                    duration: 9000,
                    isClosable: false,
                })
                return;
            }
            const response = await fetch('http://localhost:3075/auth/reset_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            if (!response.ok) {
                // console.clear();
                const data = await response.json()
                throw new Error(JSON.stringify(data));
            }

            if (response.ok) {
                console.log("RES: ", await response.text())
                setEmail("");
                toast({
                    title: 'Success',
                    description: "Please check your email for further directions.",
                    status: 'success',
                    duration: 9000,
                    isClosable: false,
                })
                context.toggleReset();
            }


        } catch (error: any) {
            const errorObj = JSON.parse(error.message);
            if (errorObj.message === 'email not found.') {
                toast({
                    title: 'Success',
                    description: "Please check your email for further directions.",
                    status: 'success',
                    duration: 9000,
                    isClosable: false,
                })
            } else {
                toast({
                    title: 'oops!',
                    description: "Please enter a valid email address!",
                    status: 'error',
                    duration: 9000,
                    isClosable: false,
                })
            }
        }
    }

    return (
        <Box
            background="#00000085"
            position="fixed"
            top="0"
            left="0"
            zIndex="100"
            w="100%"
            h="100vh"
            display="flex"
            justifyContent="center"
        >

            <Box
                background="#fff"
                position="relative"
                h="25%"
                w="40%"
                mt="5%"
                borderRadius="15px"
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    h="100%"
                    w="80%"
                    m="0 auto"
                    gap={8}
                >
                    <IconButton
                        position="relative"
                        alignSelf="end"
                        w="20px"
                        background="none"
                        onClick={context.toggleReset}
                        aria-label='Edit'
                        icon={<CloseIcon />} size="sm"
                    />
                    <Box>
                        <Text fontWeight="bold" textAlign="center">Enter the email associated with your account:</Text>
                        <Input onChange={(e) => setEmail(e.target.value)} />
                    </Box>
                    <Button onClick={submitEmail} mb="10px">Send Verification Email</Button>
                </Box>
            </Box>

        </Box>
    )
}