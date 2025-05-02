import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../API/ApiEndPoints";
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { SetUser } from "../../redux/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const request = await post("/login", { username, password });
      const response = request.data;

      if (response.success) {
        if (response.user.role === "admin") {
          navigate("/admin/dashboard"); // Redirect to admin dashboard

        } else if (response.user.role === "seller") {
          navigate("/seller/dashboard"); // Redirect to seller dashboard
        } else if (response.user.role === "customer") {
          navigate("/myaccount"); // Redirect to customer dashboard     
        }else {
          navigate("/");
        }


        toast.success(response.message);
        dispatch(SetUser(response.user)); // Dispatch the user data to the Redux store
      } else {
        toast.error(response.message);
      }

      console.log("Response:", response);
    } catch (error) {
      console.error("Error during login:", error);
    }

  };

  return (
    <div className="bg-gray-100 min-h-[87vh]">
      <div className="pt-8 flex items-center justify-center">
        <div className="flex w-[880px] h-[530px] bg-white shadow-lg overflow-hidden">

          {/* Left Side */}
          <div className="w-[340px] bg-[#2874f0] text-white p-8 flex flex-col justify-between items-center">
            <span>
              <h2 className="text-3xl font-bold mb-4">Login</h2>
              <p className="text-md">
                Get access to your Orders, Wishlist and Recommendations
              </p>
            </span>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
              alt="Login Illustration"
              className="mt-8"
            />
          </div>

          {/* Right Side */}
          <div className="w-[540px] p-8">
            <form onSubmit={handleSubmit} className="h-[530px] flex flex-col justify-between">

              {/* Divider-1 */}
              <div className="mb-6 h-[80%]">
                <div>
                  <TextField
                    label="Enter your username"
                    variant="standard"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4">
                  <TextField
                    label="Enter your password"
                    variant="standard"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
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
                  sx={{ fontSize: "16px", backgroundColor: "#fb641b", "&:hover": { backgroundColor: "#fb641b" } }}
                >
                  Login
                </Button>
              </div>

              {/* Divider-2 */}
              <div className="mt-6 text-center h-[20%]">
                <span className="text-md font-semibold text-gray-600">
                  New to Flipkart?{" "}
                  <Link to="/signup" className="text-blue-600 cursor-pointer">Create an account</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
