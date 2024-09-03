import { CloseIcon } from "@chakra-ui/icons"
import { Box, IconButton, Text } from "@chakra-ui/react"
import { useOutletContext } from "react-router-dom"
import { Context } from "../../App";
import { useEffect, useState } from "react";
import Userstory_Details_Accordian from "../User_Story/userstoryDetailsAccoridian";
import Add_Userstory_Accordian from "../User_Story/addUserstoryAccordian";
import { FeatureDetails } from "../../Pages/Project";

export type Userstory = {
    name: string,
    description: string,
    status: string,
    id: number
}

type Prop = {
    projectId: number,
    stories: Userstory[],
    featuredetails: FeatureDetails
}

const sampleuserstories = [
    {
        name: "User Story",
        description: "this is a description for user story.",
        status: "2/10"
    },
    {
        name: "User Story",
        description: "this is a description for user story.",
        status: "7/10"
    },
    {
        name: "User Story", description: "this is a description for user story.",
        status: "3/10"
    },
    {
        name: "User Story",
        description: "this is a description for user story.",
        status: "2/10"
    },
    {
        name: "User Story",
        description: "this is a description for user story.",
        status: "1/10"
    },
    {
        name: "User Story",
        description: "this is a description for user story.",
        status: "0/10"
    },
]

export default function Userstory_Modal({ stories, featuredetails, projectId }: Prop) {
    const context = useOutletContext() as Context;

    const [userstories, setUserStories] = useState(stories);

    const [bg, setBg] = useState('');
    // good colors
    // rgb(112, 187, 245); 
    // rgb(135, 53, 80);
    // rgb(235, 178, 134);
    // rgb(29, 156, 247);
    // rgb(243, 5, 220);
    // rgb(184, 124, 99);
    // gb(137, 249, 234);
    // rgb(235, 92, 58);
    // rgb(189, 5, 195);
    // rgb(156, 169, 101);
    // rgb(235, 91, 116);
    // rgb(9, 118, 143);
    // rgb(227, 148, 158);

    // rgb(57, 18, 228);
    // rgb(249, 162, 215);
    // rgb(148, 37, 4);
    //rgb(131, 92, 54);
    //rgb(65, 101, 127);
    // rgb(42, 122, 201);
    //rgb(213, 123, 216);

    //rgb(89, 66, 140);
    //rgb(137, 179, 4);
    // rgb(17, 185, 52);
    useEffect(() => {
        function randomColor() {
            const color1 = Math.floor(Math.random() * 255).toString();
            const color2 = Math.floor(Math.random() * 255).toString();
            const color3 = Math.floor(Math.random() * 255).toString();

            const rgb = `rgb(${color1}, ${color2}, ${color3})`
            setBg(rgb)
        }
        randomColor()
    }, [])


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
                background={bg}
                position="relative"
                h="fit-content"
                maxH="95%"
                w="75%"
                mt="3%"
                borderRadius="15px"
                overflowY="auto"
                sx={
                    {
                        '::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }
                }
            >
                <Box display="flex" flexDirection="column" gap={10}
                >
                    <Box display="flex" w="95%" m="0px auto" mt={4} >
                        <Box flex={1}>
                            <Text fontWeight="bold" fontSize="20px">{featuredetails.name}</Text>
                            <Text fontWeight="bold">{featuredetails.description || "There is no decription."}</Text>
                        </Box>
                        <Box>
                            <IconButton
                                w="20px"
                                background="none"
                                onClick={context.toggleUserStory}
                                aria-label='Edit'
                                icon={<CloseIcon />} size="sm"
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        h="100%"
                        w="95%"
                        m="0 auto"
                        boxShadow="dark-lg"
                        mb={4}
                    >
                        <Userstory_Details_Accordian userstory={userstories} />
                        <Add_Userstory_Accordian projectId={projectId} featureId={featuredetails.id} userstories={userstories} setUserStories={setUserStories} />
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}