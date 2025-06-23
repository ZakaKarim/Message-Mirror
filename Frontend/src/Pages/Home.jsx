import React from 'react'
import { Container,Box,Text,Tabs, TabList, Tab, TabPanels, TabPanel  } from "@chakra-ui/react"
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'


const Home = () => {
  return (
    <Container maxW="xl" centerContent alignItems="center"  >
      <Box 
      display="flex"
      justifyContent="center"
      p={4}
      bg="white"
      w="100%"
      // mt={40}
      m="40px 0 20px 0"
      borderRadius="lg"
      borderWidth="2px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" >
          Message-Mirror
        </Text>
      </Box>
      <Box bg='white' width={'100%'} p={4} borderRadius={'lg'} color='black' borderWidth={'2px'}>
      <Tabs isFitted variant="soft-rounded">
          <TabList mb="4">
            <Tab width={"50%"}  >Login</Tab>
            <Tab width={"50%"}  >Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home