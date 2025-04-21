import React, { Component, useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Paper, styled, colors } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// Apply styles
const Components = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 2,
    padding: '10px',
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 600,
    width: '100%',
    padding: '20px',
    borderRadius: 3,
    background: '#e6e6e617',
    boxShadow: 'none',
    color: '#ffffff',
}))

const FormGrid = styled(Grid)(({ theme }) => ({
}))

const FormTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        backgroundColor: 'transparent', // Ensure background is transparent by default
        color: '#fff', // White text color
    },
    '& .MuiInputLabel-root': {
        color: '#fff', // White label color
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#fff', // White border
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#808080', // Gray border on hover
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#fff', // White border when focused
    },
    '& .MuiInputBase-input': {
        color: '#fff', // White text color inside the field
    },
    '& .MuiInputBase-input::placeholder': {
        color: '#fff', // White placeholder color
    },
    // Remove background color when focused (clicking the field)
    '&.Mui-focused .MuiInputBase-input': {
        color: '#fff',
        backgroundColor: 'transparent', // No background color when focused
    },
}))

const WhiteFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
        color: '#fff',
        '& fieldset': {
            borderColor: '#fff',
        },
        '&:hover fieldset': {
            borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
}));

const WhiteSelect = styled(Select)(({ theme }) => ({
    color: '#fff',
}));

const WhiteMenuItem = styled(MenuItem)(({ theme }) => ({
    color: '#000', // Optional: keep dropdown options black for contrast
}));

const PayForm = ({ product }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        currency: 'BDT',
        productID: product?.id || '',
        price: product?.price.cost || '',
    });


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const validate = () => {
        let temp = {};
        temp.fullName = formData.fullName ? '' : 'Full name is required';
        temp.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Valid email required';
        temp.phone = formData.phone.length >= 10 ? '' : 'Valid phone number required';
        temp.address = formData.address ? '' : 'Address is required';
        temp.city = formData.city ? '' : 'City is required';
        setErrors(temp);
        return Object.values(temp).every(x => x === '');
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted', formData);
            // Reset or send to server

            // Send to server
            fetch("http://localhost:5000/order",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((res) => res.json())
            .then((result) => {
                window.location.replace(result.url);
                console.log(result);
            })

        }else{
            console.log('Form validation failed');
        }
    };


    return (
        <Components>
            <StyledPaper elevation={4} >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
                    Payment System
                </Typography>
                <Box style={{ marginTop: 20 }} component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <input type="hidden" name="productId" value={product?.id} />
                        <FormGrid item xs={12}>
                            <FormTextField
                                label="Full Name"
                                name="fullName"
                                fullWidth
                                value={formData.fullName}
                                onChange={handleChange}
                                error={Boolean(errors.fullName)}
                                helperText={errors.fullName}
                            />
                        </FormGrid>
                        <FormGrid item xs={12}>
                            <FormTextField
                                label="Email"
                                name="email"
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                        </FormGrid>
                        <FormGrid item xs={12}>
                            <FormTextField
                                label="Phone"
                                name="phone"
                                fullWidth
                                value={formData.phone}
                                onChange={handleChange}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone}
                            />
                        </FormGrid>
                        <FormGrid item xs={12}>
                            <FormTextField
                                label="Price"
                                name="price"
                                fullWidth
                                value={`Tk ${product.price.cost}`}
                                InputProps={{
                                    readOnly: true,
                                    style: {
                                        fontWeight: 600,
                                    },
                                }}
                            />
                        </FormGrid>


                        <FormGrid item xs={12}>
                            <WhiteFormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                <WhiteSelect
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    label="City"
                                >
                                    <WhiteMenuItem value="Dhaka">Dhaka</WhiteMenuItem>
                                    <WhiteMenuItem value="Chittagong">Chittagong</WhiteMenuItem>
                                    <WhiteMenuItem value="Mymensingh">Mymensingh</WhiteMenuItem>
                                    <WhiteMenuItem value="Khulna">Khulna</WhiteMenuItem>
                                    <WhiteMenuItem value="Barishal">Barishal</WhiteMenuItem>
                                    <WhiteMenuItem value="Rajshahi">Rajshahi</WhiteMenuItem>
                                    <WhiteMenuItem value="Sylhet">Sylhet</WhiteMenuItem>
                                </WhiteSelect>
                            </WhiteFormControl>
                        </FormGrid>
                        <FormGrid item xs={12}>
                            <FormTextField
                                label="Address"
                                name="address"
                                fullWidth
                                multiline
                                rows={1}
                                value={formData.address}
                                onChange={handleChange}
                                error={Boolean(errors.address)}
                                helperText={errors.address}
                            />
                        </FormGrid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </StyledPaper>
        </Components>
    );
};


export default PayForm
