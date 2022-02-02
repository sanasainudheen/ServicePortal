import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AuthService from "../Services/auth.service";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Component } from "react";
import "../App.css";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  username: string,
  password: string,
  loading: boolean,
  message: string
};

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignIn:React.FC<Props>=(props)=> {
  const initialValues = {
   userName:'',
   password:''
 }
   const validationSchema = Yup.object({
    userName: Yup.string()
   .required("This field is required!")
   .max(50),
   password: Yup.string()
    .required("This field is required!"),   
});
   const formik = useFormik({
    initialValues: initialValues,
    validationSchema:validationSchema,
    onSubmit: values => {      
      handleLogin(values.userName,values.password)
     },
});
const handleLogin=(userName:string,password:string)=> { 
  AuthService.login(userName, password).then(response => {
      if (response.data.accessToken) {
       
        props.history.push("/");  
       // window.location.reload();  
      }
    })
    .catch((error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        if(error.response.status==400){
          alert("Invalid Credentials");
        }
    }
  );
}
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
 
  return (
    <div className="fill-window">
    
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
         
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"              
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            {formik.errors.userName ? 
      <div>{formik.errors.userName}</div> : null}
            <TextField
              margin="normal"            
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
           {formik.errors.password ? 
      <div>{formik.errors.password}</div> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
            </form>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
   
    </div>
  );
}

 export default withRouter(SignIn);
