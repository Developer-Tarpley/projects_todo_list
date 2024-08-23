import { Box, ChakraProvider } from '@chakra-ui/react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './Components/Header';
import { useState } from 'react';

type DATA = {
  email: string,
  name: string,
  username: string
}

export type Context = {
  loggedin: Boolean,
  toggleLog: () => void,
  showReset: Boolean,
  toggleReset: () => void,
}

function App() {
  const data = useLoaderData() as DATA | undefined;
  const [loggedin, setloggedin] = useState(data?.username !== undefined)
  const [showReset, setShowReset] = useState(false)

  function toggleReset() {
    setShowReset(!showReset);
  }

  function toggleLog() {
    setloggedin(!loggedin);
  }

  const context: Context = {
    loggedin,
    toggleLog,
    showReset,
    toggleReset
  }

  // console.log("data hook: ",data);
  // console.log("Logged In: ",loggedin);

  return (
    <ChakraProvider>
      <Box bg={"lightgray"} h={"100vh"} overflow={'scroll'} className='mainBox'>
        <Header loggedin={loggedin} />
        <Outlet context={context} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
