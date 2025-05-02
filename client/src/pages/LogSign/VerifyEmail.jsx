import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { post } from "../../API/ApiEndPoints";
import { toast } from "react-hot-toast";
import { TextField, Button } from "@mui/material";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("verifyEmail");
    if (!savedEmail) {
      toast.error("No email found for verification.");
      navigate("/signup");
    } else {
      setEmail(savedEmail);
    }
  }, []);

  const handleVerify = async () => {
    try {
      const request = await post("/verifyemail", {
        email: email,
        otp: otp,
      });
      const response = request.data;

      if (response.success) {
        toast.success(response.message);
        localStorage.removeItem("verifyEmail");
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Verification failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-[87vh]">
      <div className="pt-8 flex items-center justify-center">
        <div className="flex bg-white rounded-lg shadow-md w-[800px] h-[500px] overflow-hidden">
          {/* Left Side */}
          <div className="w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-between ">
            <div>
              <h2 className="text-3xl font-bold mb-2">Verify Email</h2>
              <p className="text-sm mb-4">
                Enter the OTP we sent to your email to complete your signup.
              </p>
            </div>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
              alt="Verify"
              className="w-full h-auto mt-4"
            />
          </div>

          {/* Right Side */}
          <div className="w-1/2 p-8 flex flex-col ">
            <h2 className="text-2xl font-bold mb-4 ">Enter OTP</h2>
            <p className="text-sm mb-4  text-gray-600">
              Sent to: {email}
            </p>
            <TextField
              label="Enter OTP"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleVerify}
              sx={{
                mt: 3,
                py: 1,
                borderRadius: 0,
                backgroundColor: "#fb641b",
                "&:hover": { backgroundColor: "#fb641b" },
              }}
            >
              Verify Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
