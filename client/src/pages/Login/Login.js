import React,{useState,useContext} from 'react';
import { Grid, Paper, TextField, Button, Typography, Link, useMediaQuery } from '@mui/material';
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from '@mui/material/styles';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/Authcontext';


const Login = () => {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const paperStyle = {
        padding: 20,
        height: 'auto',
        width: isSmallScreen ? '90%' : 580,
        height: isSmallScreen ? '90%' : 480,
        margin: "100px auto",
        position: 'relative', 
        zIndex: 1001,
     
    };
    const btnstyle = { margin: '8px 0' };
    const fieldStyle = { margin: '10px 0' };

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()
    const {setAuthstate}=useContext(AuthContext)

    const login = () => {
        const data = { userName:name,password:password,role:"user"};
        axios.post("http://localhost:3001/user/login", data).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            } else {      
                localStorage.setItem("accessToken",response.data.token)
                setAuthstate({userName:response.data.userName,id:response.data.id,role:response.data.role,status:true})
                navigate('/')
               
            }
        });
    };

   

    return (
        <div className="login-container">
            <div className="background"></div>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8} lg={6}>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <FaUserCircle size={50} />
                            <h2>Login</h2>
                        </Grid>
                        <TextField style={fieldStyle} label='Username' placeholder='Enter username' fullWidth required onChange={(event) => { setName(event.target.value) }} />
                        <TextField style={fieldStyle} label='Password' placeholder='Enter password' type='password' fullWidth required  onChange={(event) => { setPassword(event.target.value) }}/>
                        <Button onClick={login} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Login</Button>
                        <Typography>
                            <Link href="#">
                                Forgot password ?
                            </Link>
                        </Typography>
                        <Typography> Do you have an account ?
                            <Link href="/register">
                                Sign Up
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;
