import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, useMediaQuery } from '@mui/material';
import { CiCirclePlus } from "react-icons/ci";
import { useTheme } from '@mui/material/styles';
import './addservice.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const paperStyle = {
        padding: 20,
        height: 'auto',
        width: isSmallScreen ? '90%' : 580,
        margin: "100px auto"
    };
    const btnstyle = { margin: '8px 0' };
    const fieldStyle = { margin: '10px 0' };

    const [icon, setIcon] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [color, setColor] = useState("");
    let navigate=useNavigate();
   
    const createService = () => {
        const data = { icon, title, body, color };
        axios.post("http://localhost:3001/service", data,{
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            } else {
               
                // Clear the fields
                setIcon("");
                setTitle("");
                setBody("");
                setColor("");
                navigate('/adminserv')
            }
        });
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <CiCirclePlus size={50} />
                        <h2>Add A Service</h2>
                    </Grid>
                    <TextField
                        style={fieldStyle}
                        label='Icon'
                        placeholder='Enter icon image'
                        fullWidth
                        required
                        value={icon}
                        onChange={(event) => { setIcon(event.target.value) }}
                    />
                    <TextField
                        style={fieldStyle}
                        label='Title'
                        placeholder='Enter title'
                        fullWidth
                        required
                        value={title}
                        onChange={(event) => { setTitle(event.target.value) }}
                    />
                    <TextField
                        style={fieldStyle}
                        label='Description'
                        placeholder='Enter Description'
                        fullWidth
                        required
                        value={body}
                        onChange={(event) => { setBody(event.target.value) }}
                    />
                    <TextField
                        style={fieldStyle}
                        label='Color'
                        placeholder='Enter Color'
                        fullWidth
                        required
                        value={color}
                        onChange={(event) => { setColor(event.target.value) }}
                    />
                    <Button
                        onClick={createService}
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Create Service
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AddService;
