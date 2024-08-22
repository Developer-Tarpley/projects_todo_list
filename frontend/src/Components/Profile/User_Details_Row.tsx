import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { isnotValidEmail } from "../../Pages/Sign_up";
import { DATA } from "../../Pages/Profile";

type PROPS = {
    field: string,
    value: string,
    username: string,
    setdata: React.Dispatch<React.SetStateAction<DATA>>
}

export default function User_Details_Row({ field, value, username, setdata }: PROPS) {
    const [updatefield, setUpdatefield] = useState(false);
    const [updatevalue, setUpdatevalue] = useState(value);
    const toast = useToast();

    async function handleDatachange() {
        const invalidemail = isnotValidEmail(updatevalue)
        if(field === 'Email' && invalidemail){
            toast({
                title: 'oops!',
                description: "Please enter a valid email.",
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
            return;
        }
        try {
            const token = localStorage.getItem("token")

            setUpdatefield(!updatefield)

            const response = await fetch(`http://localhost:3075/auth/edit_account_change`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username,
                    field: field.toLowerCase(),
                    value: updatevalue
                })
            })
            if (response.ok) {
                const data = await response.json()
                // console.log("Data details: ", data)
                setdata(data)
                
                toast({
                    title: 'Success',
                    description: "We've updated your account details!",
                    status: 'success',
                    duration: 3000,
                    isClosable: false,
                })
            }else{
                if(updatevalue === ''){
                    toast({
                        title: 'oops!',
                        description: "Please enter a valid value.",
                        status: 'error',
                        duration: 3000,
                        isClosable: false,
                    })
                    return;
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box display="flex" w="100%" gap={2}>
            <Text flex={1} lineHeight="32px">
                {field}:
            </Text>
            {
                updatefield ? (
                    <Input
                        onChange={(e) => setUpdatevalue(e.target.value)}
                        type={field === 'Password'? 'password': 'text'}
                        flex={1}
                        value={updatevalue}
                        h={"32px"}
                    />
                ) : (
                    <Text flex={1} lineHeight="32px">
                        {field === 'Password' ? '***********' : value}
                    </Text>
                )
            }

            <IconButton
                onClick={updatefield ? handleDatachange : () => setUpdatefield(!updatefield)}
                aria-label='Edit'
                icon={updatefield ? <CheckIcon /> : <EditIcon />} size="sm"
            />
        </Box>
    )
}