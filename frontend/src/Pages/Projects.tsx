import { Box, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { DATA } from "./Profile";
import Accordian from "../Components/Projects/accordian";

type Project = {
    name: string,
    description: string,
    status: string
}

const fake_data: Project[] = [
    {
        name: "Project-A",
        description: "This is the description for project A. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?",
        status: "To-Do"
    },
    {
        name: "Project-B",
        description: "This is the description for project B. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?",
        status: "To-Do"
    },
    {
        name: "Project-C",
        description: "This is the description for project C. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?",
        status: "In-Progress"
    },
    {
        name: "Project-D",
        description: "This is the description for project D. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?",
        status: "In-Progress"
    },
    {
        name: "Project-E",
        description: "This is the description for project E. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, assumenda?",
        status: "Done"
    },
]


export default function Projects() {
    const data = useLoaderData() as DATA;
    console.log("DATA: ", data)

    return (
        <Box>
            <Text>
                {data.name}'s Projects
            </Text>
            <Box m={10}>

                {
                    fake_data.map((project) => {
                        return (
                            <Box
                                border="1px solid"
                                w="65%"
                                display="flex"
                                p={4}
                                mb={6}
                                background="#fff"
                                >
                                <Text w="15%">
                                    {project.name}
                                </Text>
                                <Text flex={1} noOfLines={1}>
                                    {project.description}
                                </Text>
                                <Text w="15%" ml="10">
                                    {project.status}
                                </Text>
                            </Box>
                        )
                    })
                }
            </Box>
            <Accordian/>
        </Box>//end projects function
    )
}