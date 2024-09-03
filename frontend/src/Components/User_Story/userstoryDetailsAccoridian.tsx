import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { Userstory } from "../Projects/userstory_modal";


type Props = { userstory: Userstory[] }

export default function Userstory_Details_Accordian({ userstory }: Props) {
    const [select, setSelect] = useState(false);
    const [dataindex, setIndex] = useState(0);

    function handleSingleSelection() {
        if (select === false) {
            setSelect(!select);
        } else {
            setSelect(!select);
        }
    }
    

    return (
        //container
        <Box m={4}>
            {/* {accordion wrapper} */}
            {
                userstory.map((story, index) => {
                    return (
                        <Box key={`${story.name}${index}`} boxShadow={'2xl'} display="flex" flexDirection="column">
                            {/* {accordian} */}
                            <Box mt={4} >
                                {/* {heading} */}
                                <Box display="flex" justifyContent="space-between" background="#fff" p={2}>
                                    <Text flex={3}>{story.name}</Text>
                                    <Text flex={1}>{story.status}</Text>
                                    {
                                        (select && index === dataindex) ?
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
                                                onClick={() => [setIndex(index), handleSingleSelection()]}
                                                variant='outline'
                                                colorScheme='blue'
                                                aria-label='open dropdown'
                                                fontSize='xs'
                                                icon={<AddIcon />}
                                            />
                                    }

                                </Box>
                                {
                                    (select && index === dataindex) &&
                                    <Box background="#fff" p="2" boxShadow="lg" borderTop="1px solid lightgray" fontSize="xl" >
                                        <Text>{story.description}</Text>
                                    </Box>
                                }
                            </Box>
                        </Box>
                    )
                })
            }

        </Box >
    )
}