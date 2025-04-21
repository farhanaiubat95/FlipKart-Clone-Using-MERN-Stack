import { useState, useContext } from 'react'
import { Box, Typography, TextField, Link, Button, FormControl, Input, InputAdornment, IconButton, InputLabel } from "@mui/material";
import { styled } from "@mui/material"

// Components
import { authenticateSignup, authenticateLogin } from '../../src/service/api.js'
import { DataContext } from '../context/DataProvider.jsx';

// Import icons
import images from "../assets/images/login.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Apply styles
const StyledLogin = styled(Box)`
    display: flex;
    align-items: center;
    width: 880px;
    height: 530px; 
    margin: 0 auto; 
    margin-top:20px;
`;

const StyledLeft = styled(Box)`
  box-sizing: border-box;
  height: 530px; 
  width: 340px;
  background-color: #2874f0;
`;

const StyledLeftBox = styled(Box)`
    padding:40px 10px ;

    & > .text-1{
     color: #fff;
     font-size: 25px;
     font-weight: 600;
     padding:10px 40px;

    }
      & > .text-2{
     color:rgb(234, 229, 229);
     font-size: 16px;
     font-weight: 500;
     padding:10px 40px;
     margin-bottom: 160px;
    }
`;
const StyledRight = styled(Box)`
    width:540px;
    background-color: #fff;
    height: 530px;
`;
const StyledRightBox = styled(Box)`
    padding:40px 40px ;
`;

const StyledTextField = styled(TextField)`
    width:100%;
    margin-bottom: 12px;

    &:focus-visible {
        margin-bottom: 20px;
    }

    &:hover {
        border-bottom: none;
    }

    & >.MuiOutlinedInput-notchedOutline {
      border-bottom: none;
    }
`;


// Account value - Login or signup button
const accountButton = {
    login: {
        view: 'login',
        heading: 'Login',
        text: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here!",
        text: 'Sign up with your mobile number to get started'
    }
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    mobile: '',
    password: ''
}

// Login component
const loginInitialValues = {
    username: '',
    password: ''
}
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [account, toggleAccount] = useState(accountButton.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState(false);

    const { setAccount } = useContext(DataContext);



    const handleClose = () => {
        toggleAccount(accountButton.login);
        setError(false);
    }

    const toggleSignupButton = () => {
        toggleAccount(accountButton.signup);
    }

    const toggleLoginButton = () => {
        toggleAccount(accountButton.login);
    }

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };
    // const handleMouseUpPassword = (event) => {
    //     event.preventDefault();
    // };

    // Catch data
    const onInputChange = (e) => {
        setSignup((signup) => {
            const updatedSignup = { ...signup, [e.target.name]: e.target.value };
            return updatedSignup;
        });
    };


    // Signup
    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
        setAccount(signup.username);
    }

    // Login
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        let response = await authenticateLogin(login);
        console.log(response);
        if (response.status === 200) {
            handleClose();
            setAccount(login.username);
        } else {
            setError(true);
        }
    }

    return (
        <>
            <StyledLogin onClose={handleClose}>
                <StyledLeft>
                    <StyledLeftBox className="left-inner">
                        <Typography className='text-1'>{account.heading}</Typography>
                        <Typography className='text-2'>{account.text}</Typography>
                        <Box style={{ textAlign: 'center' }}>
                            <img src={images} alt="" />
                        </Box>
                    </StyledLeftBox>
                </StyledLeft>
                <StyledRight>
                    <StyledRightBox>
                        <Box>
                            {
                                account.view === 'signup' &&
                                <>
                                    <StyledTextField onChange={(e) => onInputChange(e)} id="firstname" name='firstname' label="First Name" variant="standard" />
                                    <StyledTextField onChange={(e) => onInputChange(e)} id="lastname" name='lastname' label="Last Name" variant="standard" />
                                    <StyledTextField onChange={(e) => onInputChange(e)} id="username" name='username' label="Username" variant="standard" />
                                    <StyledTextField onChange={(e) => onInputChange(e)} id="email" name='email' label="Enter Email" variant="standard" />
                                    <StyledTextField onChange={(e) => onInputChange(e)} id="mobile" name='mobile' label="Enter Mobile number" variant="standard" />


                                    <form onSubmit={(e) => { e.preventDefault(); signupUser(); }}>
                                        <FormControl sx={{ width: '100%' }} variant="standard">
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                onChange={(e) => onInputChange(e)}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={showPassword ? 'hide password' : 'show password'}
                                                            onClick={handleClickShowPassword}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <Button type="submit" variant="contained" style={{ fontSize: 15, fontWeight: 600, height: 45, backgroundColor: "#fb641b", borderRadius: 0, marginTop: 15, width: "100%" }}>
                                            Continue
                                        </Button>
                                    </form>


                                </>
                            }
                            {
                                account.view === 'login' &&
                                <>
                                    <StyledTextField onChange={(e) => onValueChange(e)} name='username' id="standard-basic" label="Enter Username" variant="standard" />
                                    <StyledTextField onChange={(e) => onValueChange(e)} name='password' id="standard-basic" label="Enter Password" variant="standard" />
                                    {error && <Typography style={{ color: 'red', fontSize: 12, marginTop: 10, marginBottom: 10 }}>Please enter valid username & password</Typography>}
                                    <Typography style={{ fontSize: 12, marginTop: 30 }}>By continuing, you agree to Flipkart's <Link href="#" underline="none">{'Terms of Use'}</Link> and <Link href="#" underline="none">{'Privacy Policy'}</Link>.</Typography>
                                    <Button variant="contained" onClick={() => loginUser()} style={{ fontSize: 15, fontWeight: 600, height: 45, backgroundColor: "#fb641b", borderRadius: 0, textTransform: "none", marginTop: 15, width: "100%" }}>Login</Button>
                                </>
                            }
                        </Box>
                        {
                            account.view === 'signup' &&
                            <Box style={{ textAlign: 'center' }}>
                                <Button variant="contained" onClick={() => toggleLoginButton()} style={{ fontSize: 15, color: "#2874f0", fontWeight: 600, height: 45, backgroundColor: "#fff", borderRadius: 0, textTransform: "none", marginTop: 15, width: "100%" }}>
                                    Existing User? Login
                                </Button>
                            </Box>
                        }
                        {
                            account.view === 'login' &&
                            <Box style={{ textAlign: 'center', marginTop: 200 }}>
                                <Button href="" onClick={() => toggleSignupButton()} underline="none" style={{ fontSize: 14, fontWeight: 500, color: "#2874f0", textTransform: 'none' }}>New to Flipkart? Create an account</Button>
                            </Box>
                        }
                    </StyledRightBox>
                </StyledRight>
            </StyledLogin>
        </>
    )
}


export default Login
