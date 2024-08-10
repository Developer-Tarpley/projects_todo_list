import { Box, Heading, Image } from "@chakra-ui/react";
import imglogo from "../assets/cwclogo.jpg";
import { Link } from "react-router-dom";

const pages = [
    { name: "Log In", path: "/login", isloggedin: false },
    { name: "Sign Up", path: "/signup", isloggedin: false },
    { name: "Projects", path: "/projects", isloggedin: true },
    { name: "Profile", path: "/u/profile", isloggedin: true },
]

type PROPS = {
    loggedin: Boolean,
}

export default function Header({ loggedin }: PROPS) {

    // console.log("are you logged in?: ",loggedin)
    return (
        <Box display="flex" border="1px solid" >

            <Box p={4} display="flex" justifyContent="center" alignItems="center" border="1px solid yellow" >
                <Image
                    boxSize={"80px"}
                    borderRadius={"50%"}
                    src={imglogo}
                    alt="logo"
                />

                <Heading>LOGO</Heading>
            </Box>

            <Box w={"100%"} display="flex" justifyContent="space-around" alignItems="center" border="1px solid green">
                {
                    pages.map(page => {
                        if (
                            (loggedin && page.isloggedin) ||
                            (!loggedin && !page.isloggedin)
                        ) {

                            return (
                                <Link key={page.name} to={page.path}>
                                    <Box>
                                        {page.name}
                                    </Box>
                                </Link>
                            )
                        } else {
                            return null;
                        }
                    })
                }
            </Box>


        </Box>
    )
}
