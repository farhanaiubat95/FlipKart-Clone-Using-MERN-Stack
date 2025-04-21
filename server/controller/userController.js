import User from "../model/userModel.js";  // Make sure this matches

export const userSignup = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if (exist) return response.status(401).json('Username already exists');

        const newUser = new User(request.body);  // Corrected this line
        await newUser.save(); 

        response.status(200).json('User is Registered Successfully');
    } catch (e) {
        console.error('Signup Error:', e);  // Log the actual error
        response.status(500).json({ error: e.message });
    }
};


// Login
export const userLogin=async(request, response) => {
    try{
        const username= request.body.username;
        const password= request.body.password;

        let user = await User.findOne({username:username,password:password});

        if(user){
            return response.status(200).json({data:user, message:'Login Successful'});
        }else{
            return response.status(401).json('Invalid Credentials');      
        }
        
    }catch (e) {
        console.error('Login Error:', e);  // Log the actual error
        response.status(500).json({ error: e.message });
    }
}

export const getUserDetails = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Don't send password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };