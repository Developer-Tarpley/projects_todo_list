import { Box, Heading, Text } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DATA } from "./Profile";
import Accordian from "../Components/Projects/accordian";
import { useState } from "react";
import { Feature } from "./Project";

export type Project = {
    id: number,
    name: string,
    description: string,
    status: string
    features: Feature[]
}

type Loader_Data = {
    user: DATA,
    projects: Project[],
}


export default function Projects() {
    const data = useLoaderData() as Loader_Data;
    console.log("projects page loader data: ", data)
    const navigate = useNavigate();
    if(!data.user){
        navigate('/login')
    }

    const user = data.user as DATA
    const usersname = `${user.name[0].toUpperCase()}${user.name.slice(1,)}`;

    const [projects, setProjects] = useState(data.projects);

    function goToProject(id:number){
        navigate(`/u/project/${id}`);
    }

    return (
        <Box>
            <Heading textAlign="center" m="10">
                {usersname}'s Projects
            </Heading>
            <Box m={10}>
                {
                    projects.length === 0 ? <Heading textAlign="center" fontSize="30px">No Projects!</Heading> :
                    projects.map(((project, index) => {
                        return (

                            <Box
                                onClick={()=>goToProject(project.id)}
                                key={project.name + index}
                                border="1px solid"
                                m={"0px auto"}
                                w="65%"
                                display="flex"
                                p={4}
                                mb={6}
                                background="#fff"
                                _hover={{cursor:"pointer", borderColor: "blue.600", background: "blue.50"}}
                            >
                                <Text w="15%">{project.name}</Text>
                                <Text flex={1} noOfLines={1}>{project.description}</Text>
                                <Text w="15%" ml="10">{project.status}</Text>
                            </Box>
                        )
                    }))
                }
            </Box>
            <Accordian projects={projects} setProjects={setProjects} />
        </Box>//end projects function
    )
}