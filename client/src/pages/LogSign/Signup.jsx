import { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../API/ApiEndPoints";
import { toast } from 'react-hot-toast';


const Signup = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await post("/signup", {
        firstname,
        lastname,
        username,
        email,
        phone,
        address,
        password,
        role
      });

      const response = request.data;

      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("verifyEmail", email);
        navigate("/verifyemail");// Redirect to login page after successful signup
      } else {
        toast.error(response.message);
      }

      console.log("Response:", response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-[87vh]">
        <div className="pt-8 flex items-center justify-center">
          <div className="flex w-[880px] h-[730px] bg-white shadow-lg overflow-hidden">
            {/* Left Side */}
            <div className="w-[340px] bg-[#2874f0] text-white p-8 flex flex-col justify-between items-center">
              <span>
                <h3 className="text-3xl font-bold mb-4">Sign Up</h3>
                <h2 className="text-2xl font-bold mb-4">Looks like you're new here!</h2>
                <p className="text-md">
                  Sign up with your mobile number to get started
                </p>
              </span>
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
                alt="Signup Illustration"
                className="mt-8"
              />
            </div>

            {/* Right Side */}
            <div className="w-[540px] p-8 ">
              <form onSubmit={handleSubmit} className="mb-2 flex flex-col justify-between">
                <div>
                  <TextField
                    label="Enter your first name"
                    variant="standard"
                    fullWidth
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                  <TextField
                    label="Enter your last name"
                    variant="standard"
                    fullWidth
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="Enter your username"
                    variant="standard"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="Enter your email"
                    variant="standard"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="Enter your mobile number"
                    variant="standard"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="Enter your address"
                    variant="standard"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="Enter your password"
                    type="password"
                    variant="standard"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                  />
                  <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="user-role-label">User Role</InputLabel>
                    <Select
                      labelId="user-role-label"
                      id="user-role"
                      value={role}
                      required
                      onChange={handleChange}
                    >
                      <MenuItem value={"customer"}>Customer</MenuItem>
                      <MenuItem value={"seller"}>Seller</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <p className="text-sm text-gray-500 mb-3 mt-12">
                  By continuing, you agree to Flipkart's
                  <span className="text-blue-500 ml-1">Terms of Use</span> and
                  <span className="text-blue-500 ml-1">Privacy Policy</span>.
                </p>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#fb641b",
                    "&:hover": { backgroundColor: "#fb641b" },
                  }}
                >
                  Sign Up
                </Button>
              </form>

              <div className="mt-4 flex items-center text-center h-[40px] w-full border shadow-2xl hover:shadow-sky-300 hover:bg-[#2874f0] cursor-pointer transition duration-200 ">
                <Link
                  to="/login"
                  className="text-blue-500 font-medium w-full hover:text-white transition duration-200"
                  style={{ textDecoration: "none" }}
                >
                  Existing User? Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
