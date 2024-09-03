import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, PropsOf, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Project } from "../../Pages/Projects";

type Props = {
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}

export default function Accordian({ projects, setProjects }: Props) {
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

    async function addProject() {
        setIsErrorInput(true);
        const token = localStorage.getItem("token");
        if (name === "") {
            return;
        }
        try {
            const response = await fetch('http://localhost:3075/auth/u/create_project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                })
            })
            if (!response.ok) {
                throw new Error("ERROR adding projects");
            }
            const data = await response.json();

            setProjects([...projects,
                {
                    name: data.name,
                    description: data.description,
                    status: data.status,
                    id: data.id,
                    features: data.features
                }
            ])

            setName("");
            setDescription("");
            setSelect(false);

            toast({
                title: 'Success.',
                description: "You have added a project.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

        } catch (error) {
            console.log("ERROR: ", error);
            toast({
                title: 'oops!',
                description: "Sorry a project cannot be added at this time. Please try again.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        //container
        <Box>
            {/* {accordion wrapper} */}
            <Box m={10}>
                {/* {accordian} */}
                <Box w="65%" m={"0px auto"}>
                    {/* {heading} */}
                    <Box display="flex" justifyContent="space-between" background="#fff" p={2}>
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
                        <Box background="#fff" p="15px 20px" borderTop="1px solid #333" fontSize="xl"
                        >
                            <FormControl isRequired isInvalid={isErrorName} w="100%" mb={4}>
                                <FormLabel>Project Name</FormLabel>
                                <Input type='text' value={name ? name : ""} onChange={(e) => [setName(e.target.value), setIsErrorInput(false)]} />
                                {!isErrorName ? null : <FormErrorMessage>Project Name is required.</FormErrorMessage>}
                            </FormControl>

                            <FormControl w="100%" mb={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder="(...Optional)" size={"sm"} value={description ? description : ""} onChange={(e) => [setDescription(e.target.value)]} />
                            </FormControl>

                            <Button onClick={addProject} w="100%">Create Project</Button>
                        </Box>
                    }

                </Box>

            </Box>
        </Box>
    )
}