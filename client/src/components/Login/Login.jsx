import React from 'react'
import {VStack,Input, ButtonGroup,FormErrorMessage,FormControl,FormLabel,Button} from "@chakra-ui/react"
const Login = () => {
  return (
    <VStack as="form" w={{base: "90%", md:"500px"}} m="auto"
    justify="center" h="100vh">
        <FormControl>
            <FormLabel>Username</FormLabel>
            <Input name="username" placeholder='Enter username' autoComplete='off'/>
            <FormErrorMessage>Invalid username</FormErrorMessage>
        </FormControl>

        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" placeholder='Enter password' autoComplete='off'/>
            <FormErrorMessage>Invalid password</FormErrorMessage>
        </FormControl>
        
        <ButtonGroup>
            <Button colorScheme='teal'>Log in</Button>
            <Button>Create Account</Button>
        </ButtonGroup>
    </VStack>
  )
}

export default Login