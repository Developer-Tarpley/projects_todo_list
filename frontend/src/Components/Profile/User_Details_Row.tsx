import { EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";

type PROPS = {
    field: string,
    value: string
}

export default function User_Details_Row({ field, value }: PROPS) {
    return (
        <Box display="flex" w="100%">
            <Text flex={1} lineHeight="32px">
                {field}:
            </Text>
            <Text flex={1} lineHeight="32px">
                {value}
            </Text>
            <IconButton aria-label='Edit' icon={<EditIcon />} size="sm" />
        </Box>
    )
}