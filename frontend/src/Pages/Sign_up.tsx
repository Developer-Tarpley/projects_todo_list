import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

function isnotValidEmail(email : string){
    const isValidEmail = RegExp(/\S+[@]\w+[.]\w+/);
    if(email.match(isValidEmail)){
        return false;
    }else{
        return true;
    }
}
function isnotValidLength(username : string){
    const isValidUsername = RegExp(/\S{8,}/);
    if(username.match(isValidUsername)){
        return false;
    }else{
        return true;
    }
}
function isnotValidPWD(password : string){
    const isValidPWD = RegExp(/d/);
    if(password.match(isValidPWD)){
        return false;
    }else{
        return true;
    }
}

export default function Sign_up() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [inputErrorName, setInputErrorName] = useState(false);
    const [inputErrorEmail, setInputErrorEmail] = useState(false);
    const [inputErrorUsername, setInputErrorUsername] = useState(false);
    const [inputErrorPWD, setInputErrorPWD] = useState(false);

    const isErrorName = name === "" && inputErrorName;
    const isErrorEmail = isnotValidEmail(email) && inputErrorEmail;
    const isErrorUsername = isnotValidLength(username) && inputErrorUsername;
    const isErrorPWD = password === "" && inputErrorPWD;


    async function signupSubmission() {
        setInputErrorName(true);
        setInputErrorEmail(true);
        setInputErrorUsername(true);
        setInputErrorPWD(true);

        if (name === "" || isnotValidEmail(email) || username === "" || password === "") {
            console.log("Error has Occured!")!
        } else {
            const response = await fetch(`http://localhost:3075/auth/sign_up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, username, password }),
            });
            const data = response;

            if (data.ok) {
                console.log('data: ', data)
                setInputErrorName(false);
                setInputErrorEmail(false);
                setInputErrorUsername(false);
                setInputErrorPWD(false);
                setName("");
                setEmail("");
                setUsername("");
                setPassword("");
            } else {
                // show error message
            }
        }

    }// end func.




    return (
        <Box gap={4} >
            <Heading textAlign={"center"}>Create an Account</Heading>
            <Box
                w="75%"
                gap={4}
                display="flex"
                flexDir="column"
                justifyContent="center"
                m="0px auto"
            >
                <FormControl isRequired isInvalid={isErrorName} w="100%">
                    <FormLabel>Name</FormLabel>
                    <Input type='text' value={name ? name : ""} onChange={(e) => [setName(e.target.value), setInputErrorName(false)]} />
                    {!isErrorName ? null : <FormErrorMessage>Name is required.</FormErrorMessage>}
                </FormControl>

                <FormControl isRequired isInvalid={isErrorEmail} w="100%">
                    <FormLabel>Email</FormLabel>
                    <Input type='email' value={email ? email : ""} onChange={(e) => [setEmail(e.target.value), setInputErrorEmail(false)]} />
                    {!isErrorEmail ? null : <FormErrorMessage>A valid email is required.</FormErrorMessage>}
                </FormControl>

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

                {/* <FormControl isRequired isInvalid={isErrorName} w="100%">
                    <FormLabel>Name</FormLabel>
                    <Input type='text' value={name ? name : ""} onChange={(e) => [setName(e.target.value), setInputError(false)]} />
                    {!isErrorName ? null : <FormErrorMessage>Enter a name.</FormErrorMessage>}
                </FormControl> */}

                <Button onClick={signupSubmission} w="100%">Sign Up</Button>
            </Box>


            {/* end outer main Box */}
        </Box>

    )
}