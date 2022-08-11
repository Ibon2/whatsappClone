import React from 'react';
import {
    VStack,
    ButtonGroup,
    Button,
    Heading
} from '@chakra-ui/react';
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate();
    return (
        <Formik
        initialValues= {{ username: "", password:""} }
        validationSchema= {Yup.object({
            username: Yup.string()
                .required('Username required')
                .min(6, 'Username too short')
                .max(28, 'Username too large'),
            password: Yup.string()
                .required('Password required')
                .min(6, 'Password too short')
                .max(28, 'Password too large')}
            )}
            onSubmit={(values, actions) => {
                alert(JSON.stringify(values, null, 2));
                actions.resetForm();
            }}
        >
            <VStack
                as={Form}
                w={{ base: '90%', md: '500px' }}
                m="auto"
                justify="center"
                h="100vh"
                spacing="1rem"
            >
                <Heading>Log in</Heading>

                <TextField name="username" 
                placeholder="Enter username"
                autoComplete="off"
                label="Username"
                />
                <TextField name="password" 
                placeholder="Enter password"
                autoComplete="off"
                label="Password"
                />

                <ButtonGroup padding="1rem">
                    <Button colorScheme="teal">Log in</Button>
                    <Button onClick={()=>navigate("/register")}>Create Account</Button>
                </ButtonGroup>
            </VStack>
            </Formik>
    );
};

export default Login;
