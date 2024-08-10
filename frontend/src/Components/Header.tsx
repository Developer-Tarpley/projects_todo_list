import { Box, Heading, Image } from "@chakra-ui/react";
import imglogo from "../assets/cwclogo.jpg";
import { Link } from "react-router-dom";
import { color } from "framer-motion";

const pages = [
    { name: "Log In", path: "/login", isloggedin: false },
    { name: "Sign Up", path: "/signup", isloggedin: false },
    { name: "Projects", path: "/projects", isloggedin: true },
    { name: "Account Details", path: "/u/profile", isloggedin: true },
]

type PROPS = {
    loggedin: Boolean,
}

export default function Header({ loggedin }: PROPS) {

    // console.log("are you logged in?: ",loggedin)
    return (
        <Box display="flex" borderBottom={"transparent"} boxShadow='dark-lg' >

            <Box p={4} display="flex" justifyContent="center" alignItems="center" >
                <Image
                    boxSize={"80px"}
                    borderRadius={"50%"}
                    src={imglogo}
                    alt="logo"
                />

                <Heading>LOGO</Heading>
            </Box>

            <Box w={"100%"} display="flex" justifyContent="space-around" alignItems="center">
                {
                    pages.map(page => {
                        if (
                            (loggedin && page.isloggedin) ||
                            (!loggedin && !page.isloggedin)
                        ) {

                            return (
                                <Link key={page.name} to={page.path}>
                                    <Box
                                        fontWeight={"bold"}
                                        fontSize={"xl"}
                                        color={"#C53030"}
                                        // color={"#ED64A6"}
                                        _hover={{
                                            color: "#000",
                                            textDecoration: "underline #000"
                                        }}>
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
