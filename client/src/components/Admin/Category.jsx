import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { AddCategory } from "../../redux/CategorySlice";

import InputAdornment from '@mui/material/InputAdornment';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const CategoryTable = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Category.categories);
  const [openRows, setOpenRows] = useState({});

  // Filter main categories (those without a parentId)
  const mainCategories = categories.filter((cat) => !cat.parentId);

  // Get subcategories for a given parentId
  const getSubcategories = (parentId) =>
    categories.filter((cat) => cat.parentId === parentId);

  // Toggle the open state of a category row
  const handleToggle = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryImage: "",
    categoryType: "main", // 'main' or 'sub'
    parentId: "",
  });

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In real app, you'd upload and get URL
      setFormData((prev) => ({
        ...prev,
        categoryImage: URL.createObjectURL(file),
      }));
    }
  };

  // Handle form submission for adding a new category
  const handleSubmit = (e) => {
    e.preventDefault();

    const { categoryName, categoryImage, categoryType, parentId } = formData;
    if (!categoryName || !categoryImage) {
      return alert("Please fill all fields");
    }

    const newCategory = {
      _id: Date.now().toString(), // Temporary ID for demo purposes
      categoryName,
      categoryImage,
      parentId: categoryType === "sub" ? parentId : null,
    };

    dispatch(AddCategory(newCategory));

    // Reset form data after submission
    setFormData({
      categoryName: "",
      categoryImage: "",
      categoryType: "main",
      parentId: "",
    });
  };

  // Render a table row for a category, including its subcategories if any
  const renderCategoryRow = (cat, isSub = false) => {
    const subcategories = getSubcategories(cat._id);
    const hasSubs = subcategories.length > 0;

    return (
      <React.Fragment key={cat._id}>
        <TableRow
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#2462751a",
              cursor: "pointer",
              transition: "all 0.3s ease",
            },
          }}
          className={isSub ? "bg-gray-100" : ""}
        >
          <TableCell>
            {hasSubs && !isSub && (
              <IconButton size="small" onClick={() => handleToggle(cat._id)}>
                {openRows[cat._id] ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </IconButton>
            )}
          </TableCell>
          <TableCell>
            <div className={`flex items-center ${isSub ? "pl-8" : ""}`}>
              <Typography fontWeight={500}>{cat.categoryName}</Typography>
            </div>
          </TableCell>
          <TableCell>
            <Avatar
              variant="rounded"
              src={cat.categoryImage}
              alt={cat.categoryName}
              sx={{ width: 56, height: 40 }}
            />
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Button size="small" variant="contained">
                Edit
              </Button>
              <Button size="small" variant="contained" color="error">
                Delete
              </Button>
              {!isSub && (
                <Button size="small" variant="contained" color="success">
                  Add Sub
                </Button>
              )}
            </div>
          </TableCell>
        </TableRow>

        {/* Subcategory Rows */}
        {hasSubs &&
          openRows[cat._id] &&
          subcategories.map((sub) => renderCategoryRow(sub, true))}
      </React.Fragment>
    );
  };

  return (
    <Box className="p-6 flex lg:flex-row flex-col">
      <div className="w-[100%] lg:w-[50%]">
        <Paper className="p-6 my-6 shadow-md">
          <Typography variant="h6" className="mb-4">
            Add Category
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Category Name"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
            />

            <TextField
              type="file"
              onChange={handleImageUpload}
              label="Choose Category Image"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddPhotoAlternateIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              sx={{
                margin: "15px 0",
                width: "100%",
              }}
            />

            <FormControl fullWidth sx={{
              marginBottom: "15px"
            }}>
              <InputLabel>Category Type</InputLabel>
              <Select
                name="categoryType"
                value={formData.categoryType}
                label="Category Type"
                onChange={handleChange}
              >
                <MenuItem value="main">Main Category</MenuItem>
                <MenuItem value="sub">Sub Category</MenuItem>
              </Select>
            </FormControl>

            {formData.categoryType === "sub" && (
              <FormControl fullWidth>
                <InputLabel>Parent Category</InputLabel>
                <Select
                  name="parentId"
                  value={formData.parentId}
                  label="Parent Category"
                  onChange={handleChange}
                >
                  {mainCategories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Paper>
      </div>

      <div  className="w-[100%] lg:w-[50%]">
        <TableContainer component={Paper} className=" w-[50%] lg:w-[100%] shadow-md">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell />
                <TableCell>Category Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainCategories.map((cat) => renderCategoryRow(cat))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default CategoryTable;
