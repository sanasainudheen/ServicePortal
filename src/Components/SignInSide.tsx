import { Component } from "react";
import * as React from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AuthService from "../Services/auth.service";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ILogin from '../types/login';
import  { useState, ChangeEvent } from "react";
import DashBoard from "../Components/DashBoard";
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

 class SignInSide extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }
  handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    this.setState({
      message: "",
      loading: true
    });


    AuthService.login(username, password).then(
      () => {
          //console.log(localStorage.getItem("user"));
        this.props.history.push("/"); 
        <DashBoard/>      
        window.location.reload();

      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: "Invalid Credentials"
        });
      }
    );
  }
  render() {
    const { loading, message } = this.state;

    const initialValues = {
      username: "",
      password: "",
    };

  return (
    <div className="fill-window">
    <Formik
    initialValues={initialValues}
    validationSchema={this.validationSchema}
    onSubmit={this.handleLogin}
  >
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: '~/Login.png',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
           
              <Form>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                 margin="normal"
                 
                 fullWidth
                 label="Username"
                 autoComplete="username"
                 autoFocus
                name="username" type="text" className="form-control" />
               
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                 margin="normal"
                 
                 fullWidth
                 label="Password"
                name="password" type="password" className="form-control" />
               
              </div>

              <div className="form-group">
              <Button type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </Button>
              </div>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              </Form>
            </Box>
         
        </Grid>
      </Grid>
    </ThemeProvider>
    </Formik>
    </div>
  );
}
}
export default withRouter(SignInSide);