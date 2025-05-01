import userModel from "../model/userModel.js";


// get all users
export const Getuser = async (req, res) => {
    try {
        const customer = await userModel.find({ role: "customer" });
        const admin = await userModel.find({ role: "admin" });
        const seller = await userModel.find({ role: "seller" });

        // Count the number of users per role
        const totalUser = await userModel.countDocuments({ role: { $in: ["customer", "admin", "seller"] } });
        const totalCustomer = await userModel.countDocuments({ role: "customer" });
        const totalAdmin = await userModel.countDocuments({ role: "admin" });
        const totalSeller = await userModel.countDocuments({ role: "seller" });

        res.status(200).json({
            success: true,
            counts: {
                totalUser,
                totalAdmin,
                totalCustomer,  
                totalSeller,
            },
            users: {
                admin,
                customer,
                seller,
            }     
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error while fetching users." });
    }
}

// Get user by ID
export const GetUserById = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
};
  
// Update user by ID
export const UpdateUser = async (req, res) => {
    try {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
};
  

// delete user
export const DeleteUser = async (req, res) => {
    try {
        const userId= req.params.id;
        const checkAdmin = await userModel.findById(userId);
        if(checkAdmin.role == "admin"){
            return res.status(409).json({ message: "Admin cannot be deleted by admin" });
        }

        const user = await userModel.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        console.log(error);
    }
}

// toggle user activity (enable/disable)
export const ToggleUserActivity = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // toggle activity
        user.activity = !user.activity;
        await user.save();

        res.status(200).json({ success: true, message: `User ${user.activity ? "enabled" : "disabled"} successfully`, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        console.log(error);
    }
}


// get user count per month
// get user count per month separately for customer & seller
export const GetUserStats = async (req, res) => {
    try {
        const stats = await userModel.aggregate([
            {
              $match: {
                createdAt: { $exists: true },
                role: { $in: ["customer", "seller"] }
              }
            },
            {
              $group: {
                _id: {
                  month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                  role: "$role"
                },
                total: { $sum: 1 } // counts users created in that month
              }
            },
            {
              $sort: { "_id.month": 1 }
            }
          ]);
          
  
      // Get total counts
      const totalCustomer = await userModel.countDocuments({ role: "customer" });
      const totalSeller = await userModel.countDocuments({ role: "seller" });
      const totalUser = await userModel.countDocuments({ role: { $in: ["customer", "admin", "seller"] } });
      res.status(200).json({
        success: true,
        stats,
        totals: {
          customer: totalCustomer,
          seller: totalSeller,
          totaluser: totalUser
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error while fetching user stats." });
    }
  };
  