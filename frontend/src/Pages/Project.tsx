import { Box, Heading, Text } from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Project as TypeProject } from "./Projects";
import { useState } from "react";
import Feature_Accordian from "../Components/Projects/featureAccordian";
import Userstory_Modal, { Userstory } from "../Components/Projects/userstory_modal";
import { Context } from "../App";


export type Feature = {
    name: string,
    description: string,
    status: string,
    userStoryCount: number,
    userStoryComplete: number,
    id : number,
    userstory: Userstory[]
}

export interface FeatureDetails{
    name: string,
    description: string,
    id: number
}

const columns = [
    {
        name: "To Do"
    },
    {
        name: "In Progress"
    },
    {
        name: "Done!"
    }
]


export default function Project() {
    const context = useOutletContext() as Context;
    const data = useLoaderData() as TypeProject[];
    const project = data[0];

    const [features, setFeatures] = useState(project.features);
    const defaultFeatureDetails = {name:'', description:'', id:0}
    const [featuredetails, setFeatureDetails] = useState<FeatureDetails>(defaultFeatureDetails)
    const [featurestories, setFeatureStories] = useState<Userstory[]>([]);

    console.log("project page: ",featuredetails)
    // console.log("project id: ",project.id)

    function handleUserStorModal(name: string, description: string, id: number, stories: Userstory[]){
        const featureDetails = {
            ...defaultFeatureDetails,
            name : name,
            description: description,
            id: id
        }
        setFeatureDetails(featureDetails)
        setFeatureStories(stories);
        context.toggleUserStory();
    }

    return (
        <Box w="95%" m="10px auto">
            {context.showUserStory && <Userstory_Modal  stories={featurestories} featuredetails={featuredetails} projectId={project.id} />}
            <Box mb={10}>
                <Heading textAlign="left" m="5">{project.name}</Heading>
                <Text>{project.description || 'There is no description.'}</Text>
            </Box>

            <Box display="flex" gap={10} p={2}>
                {
                    columns.map((column, index) => {
                        return (
                            <Box
                                key={`${column}${index}`}
                                boxShadow='2xl'
                                background="#fff"
                                borderRadius="15px"
                                flex="1"
                                h="100%"
                            >
                                <Text textAlign="center" mb={2} fontSize={20}>{column.name}</Text>
                                {
                                    features.map((feature, index) => {
                                        {console.log("features mapping: ",feature.userstory)}

                                        if (column.name === feature.status) {

                                            return (
                                                <Box
                                                    onClick={()=>handleUserStorModal(feature.name,feature.description,feature.id,feature.userstory)}
                                                    key={`${feature}${index}`}
                                                    boxShadow='base'
                                                    display="flex"
                                                    p={4}
                                                    m={4}
                                                    _hover={{cursor: "pointer"}} 
                                                    >
                                                    <Text flex="1">{feature.name}</Text>
                                                    <Text>{feature.userStoryComplete}/{feature.userStoryCount}</Text>
                                                </Box>
                                            )
                                        }


                                    })
                                }

                                {
                                    column.name === "To Do" &&
                                    < Feature_Accordian project={project.id} features={features} setFeatures={setFeatures} />
                                }

                            </Box>
                        )
                    })
                }

            </Box>
            {/* </Box> */}
        </Box>
    )
}