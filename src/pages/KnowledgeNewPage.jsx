import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

import { Paper, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, TextField, Button, Select, MenuItem, Slider, Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KnowledgeNewPage = () => {
    
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

  
    const handleChange = (event) => {
        setFormData(prevState => (
            {
                ...prevState,
                [event.target.name]: event.target.value
            }
        ))
    }

    const handleSubmit = (event) => {
        
        // Prevent page reload
        event.preventDefault();

        toast.success(formData);
        toast.error("Error Message Here");
        console.log(formData);
    };

    const navigate = useNavigate();


    return (
        <div className="form-page">
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            limit={1}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />

        <Paper className="paper" sx={{ minWidth: 325, minHeight: 500 }}>
            <form className="register-form" name="registerForm" onSubmit={handleSubmit}>
            <h1>Create New Knowledge</h1>
            <div>
                <FormControl
                    sx={{ width: '100ch' }}
                    margin="normal"
                >
                    <TextField 
                        id="title"
                        name="title" 
                        label="Title" 
                        variant="outlined" 
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </FormControl>             
            </div>
            <div>
                <FormControl
                    sx={{ width: '100ch' }}
                    margin="normal"
                >
                    <TextareaAutosize 
                        id="description"
                        name="description" 
                        variant="outlined" 
                        value={formData.description}
                        onChange={handleChange}
                        required
                        multiline
                        minRows={20}
                        placeholder="Description *"
                    />
                </FormControl>
            </div>       

            <div style={{marginTop: '12px'}}>
                <Button variant="contained" size="large" type="submit">Submit</Button>
            </div>        
            </form>
        </Paper>
        </div>
    )
}

export default KnowledgeNewPage;