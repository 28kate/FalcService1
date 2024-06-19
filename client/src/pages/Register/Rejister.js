import React, {  useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Paper, TextField, Button, useMediaQuery } from '@mui/material';
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from '@mui/material/styles';
import './Register.css'; 

const Register = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const paperStyle = {
        padding: 20,
        height: 'auto',
        width: isSmallScreen ? '90%' : 480,
        height: isSmallScreen ? '90%' : 380,
        margin: "100px auto",
        position: 'relative', 
        zIndex: 1001, 
     
    };
    const btnstyle = { margin: '8px 0' };
    const fieldStyle = { margin: '10px 0' };

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()

    const register = () => {
        const data = { userName:name,password:password,role:"user"};
        axios.post("http://localhost:3001/user", data).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            } else {
                if(response.data !== "Fill in all fields")
                navigate('/login')
                console.log(response.data)
            
            }
        });
    };

   

    return (
        <div className="reg-container">
            <div className="background"></div> 
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8} lg={6}>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <FaUserCircle size={50} />
                            <h2>Sign Up</h2>
                        </Grid>
                        <TextField style={fieldStyle} label='Username' placeholder='Enter username' fullWidth required onChange={(event) => { setName(event.target.value) }} />
                        <TextField style={fieldStyle} label='Password' placeholder='Enter password' type='password' fullWidth required  onChange={(event) => { setPassword(event.target.value) }}/>
                        <Button onClick={register}type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign Up</Button>
                     
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Register;
