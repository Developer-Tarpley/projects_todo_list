import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Userstory } from "../Projects/userstory_modal";

type Props = {
    featureId:number,
    projectId:number,
    userstories: Userstory[],
    setUserStories: React.Dispatch<React.SetStateAction<Userstory[]>>
}

export default function Add_Userstory_Accordian({projectId, featureId, setUserStories, }: Props) {
    const toast = useToast();

    const [select, setSelect] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [isErrorInput, setIsErrorInput] = useState(false);
    const isErrorName = name === "" && isErrorInput

    function handleSingleSelection() {
        if (select === false) {
            setSelect(!select);
            setIsErrorInput(false);
        } else {
            setSelect(!select);
            setIsErrorInput(false);
            setName("");
            setDescription("");
        }

    }

    async function addUserStory() {
        setIsErrorInput(true);
        const token = localStorage.getItem("token");

        if (name === "") { return; }

        try {
            const response = await fetch('http://localhost:3075/auth/u/create_user_story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    featureId: featureId,
                    projectId: projectId,
                })
            })
            if (!response.ok) {
                throw new Error("ERROR adding projects");
            }
            const data = await response.json();

            setUserStories(data)
            setName("");
            setDescription("");
            setSelect(false);

            toast({
                title: 'Success.',
                description: "You have added a feature.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

        } catch (error) {
            console.log("ERROR: ", error);
            toast({
                title: 'oops!',
                description: "Sorry a feature cannot be added at this time. Please try again.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        //container
        <Box m={4} >
            {/* {accordion wrapper} */}
            <Box>
                {/* {accordian} */}
                <Box>
                    {/* {heading} */}
                    <Box display="flex" justifyContent="space-between" background="#fff" p={2}>
                        <Heading as="h2" fontSize="xl" lineHeight="40px">Add User Story</Heading>
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
                        <Box background="#fff" p="2" boxShadow="lg" borderTop="1px solid lightgray" fontSize="xl"
                        >
                            <FormControl isRequired isInvalid={isErrorName} w="100%" mb={4}>
                                <FormLabel>User Story Name</FormLabel>
                                <Input type='text' value={name ? name : ""} onChange={(e) => [setName(e.target.value), setIsErrorInput(false)]} />
                                {!isErrorName ? null : <FormErrorMessage>User Story Name is required.</FormErrorMessage>}
                            </FormControl>

                            <FormControl w="100%" mb={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder="(...Optional)" size={"sm"} value={description ? description : ""} onChange={(e) => [setDescription(e.target.value)]} />
                            </FormControl>

                            <Button onClick={addUserStory} w="100%">Create User Story</Button>
                        </Box>
                    }

                </Box>

            </Box>
        </Box>
    )
}