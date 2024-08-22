import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



export default function Reset_PWD() {
    const { id, token } = useParams();
    const toast = useToast();
    const navigate = useNavigate();

    const [pass, setPass] = useState("");
    const [passconfirm, setPassconfirm] = useState("");

    const [inputErrorPWD, setInputErrorPWD] = useState(false);
    const [inputErrorPWDconfirm, setInputErrorPWDconfirm] = useState(false);

    const isErrorpass = pass === "";
    const isErrorPassconfirm = pass !== passconfirm;



    async function resetSubmission() {
        // console.log("pass: ", pass)
        // console.log("pass-confirm: ", passconfirm)
        if (isErrorpass) {
            setInputErrorPWD(true);
        } else {
            if (isErrorPassconfirm) {
                setInputErrorPWDconfirm(true);
            }
        }
        try {

            const response = await fetch('http://localhost:3075/auth/new/reset_password/update', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: pass, id, token }),
            });

            if (!response.ok) {
                const data = await response.json();
                console.log("DATA: ", data);
                throw new Error(data);
            }

            if(response.ok){
                
                toast({
                    title: 'Success.',
                    description: "We've reset your password for you. Please log in!",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/login')
            }

        } catch (error) {
            console.log(error)
            toast({
                title: 'oops!',
                description: "We are unable to update your password at this time. Please try again later!",
                status: 'error',
                duration: 9000,
                isClosable: false,
            })
        }
    }

    return (
        <Box gap={4} py={20} >
            <Heading textShadow='1px 1px #ffffff' m='6' mb={8} textAlign={"center"}>Reset Your Password</Heading>
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
                <FormControl isRequired isInvalid={inputErrorPWD} w="100%">
                    <FormLabel>Password</FormLabel>
                    <Input type='password' value={pass} onChange={(e) => [setPass(e.target.value), setInputErrorPWD(false), setInputErrorPWDconfirm(false)]} />
                    {!isErrorpass ? null : <FormErrorMessage>Password is required.</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={inputErrorPWDconfirm} w="100%">
                    <FormLabel>Re-enter Password</FormLabel>
                    <Input type='password' value={passconfirm} onChange={(e) => [setPassconfirm(e.target.value), setInputErrorPWDconfirm(false)]} />
                    {!isErrorPassconfirm ? null : <FormErrorMessage>Passwords must match.</FormErrorMessage>}
                </FormControl>

                <Button onClick={resetSubmission} w="100%">Reset Password</Button>

            </Box>


            {/* end outer main Box */}
        </Box>

    )
}