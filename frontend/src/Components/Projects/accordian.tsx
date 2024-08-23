import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";



export default function Accordian() {
    const [select, setSelect] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function handleSingleSelection() {
        setSelect(!select);
    }

    function addProject() {

    }

    return (
        //container
        <Box
        // w="65%"
        // maxW="700px"
        // m="20px auto"
        >
            {/* <Heading as="h1" fontSize="3xl" p="20px" mb="20px" textAlign="center">This is the accordian component!!!</Heading> */}
            {/* {accordion wrapper} */}
            <Box
                // p="0 20px"
                m={10}
            >

                {/* {accordian} */}
                <Box
                    // cursor="pointer"
                    w="65%"
                >
                    {/* {heading} */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        background="#fff"
                        p={2}
                        // h={"58px"}
                    // p="15px 20px"
                    // border="2px solid #333"
                    >
                        <Heading as="h2" fontSize="xl" lineHeight="40px">Add Project</Heading>
                        {
                            select ?
                                <IconButton
                                    onClick={handleSingleSelection}
                                    variant='outline'
                                    colorScheme='blue'
                                    aria-label='open dropdown'
                                    fontSize='xs'
                                    icon={<MinusIcon />}
                                />
                                :
                                <IconButton
                                    onClick={handleSingleSelection}
                                    variant='outline'
                                    colorScheme='blue'
                                    aria-label='open dropdown'
                                    fontSize='xs'
                                    icon={<AddIcon />}
                                />
                        }

                    </Box>
                    {
                        select &&
                        <Box
                            background="#fff"
                            p="15px 20px"
                            // border="2px solid #333"
                            borderTop="1px solid #333"
                            fontSize="xl"
                        //  display="none"
                        >
                            <FormControl isRequired w="100%">
                                <FormLabel>Project Name</FormLabel>
                                <Input type='text' value={name ? name : ""} onChange={(e) => [setName(e.target.value)]} />
                                {/* {!isErrorName ? null : <FormErrorMessage>Name is required.</FormErrorMessage>} */}
                            </FormControl>

                            <FormControl w="100%">
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder="(...Optional)" size={"sm"} value={description ? description : ""} onChange={(e) => [setDescription(e.target.value)]} />
                                {/* {!isErrorName ? null : <FormErrorMessage>Name is required.</FormErrorMessage>} */}
                            </FormControl>

                            <Button onClick={addProject} w="100%">Add Project</Button>
                        </Box>
                    }

                </Box>



            </Box>
        </Box>
    )
}