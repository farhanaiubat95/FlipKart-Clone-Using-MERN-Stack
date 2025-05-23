import userModel from "../model/userModel.js";
import Category from "../model/CategoriesModel.js";
import slugify from "slugify";

// get all users
export const Getuser = async (req, res) => {
  try {
    const customer = await userModel.find({ role: "customer" });
    const admin = await userModel.find({ role: "admin" });
    const seller = await userModel.find({ role: "seller" });

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


// create category
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      categoryName: cate.categoryName,
      slug: cate.slug,
      parentId: cate.parentId,
      //Build the full URL here
      categoryImage: cate.categoryImage,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

export const CreateCategory = async (req, res) => {
  try {
    console.log(req.file);
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a file" });
    }
  
    const categoryImage = 'http://localhost:5000/uploads/' + req.file.filename; // Store the path to the uploaded image
  
    const categoryObj = {
      categoryName: req.body.categoryName,
      categoryImage: categoryImage, 
      slug: slugify(req.body.categoryName), 
    };
  
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId; // Optional parent category
    }
    console.log(categoryObj);
    const category = await Category.create(categoryObj);
  
    res.status(201).json({ 
      success: true, 
      message: "Category created successfully", 
      category 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Category is not created successfully", 
      error: error.message 
    });
    console.error(error);
  }
};  

// get all categories
export const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});  // This gives array

    if (categories) {
      const totalCategories = await Category.countDocuments({});
      const categoryList = createCategories(categories);  // Pass the array
      res.status(200).json({
        success: true,
        totalCategories,
        message: "Categories fetched successfully",
        categoryList,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
    console.log(error);
  }
};


// Update Category
export const UpdateCategory = async (req, res) => {
  try {
    const { categoryName, parentId } = req.body;
    let updatedData = {
  categoryName,
  parentId: parentId || null,
  categoryImage: "", // Initialize as empty string
};

// Then update image only if uploaded
if (req.file) {
  updatedData.categoryImage = `http://localhost:5000/uploads/${req.file.filename}`;
} else {
  // Remove categoryImage if no image uploaded
  delete updatedData.categoryImage;
}

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    console.log(error);
  }
};



// delete category
export const DeleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully", category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    console.log(error);
  }
};