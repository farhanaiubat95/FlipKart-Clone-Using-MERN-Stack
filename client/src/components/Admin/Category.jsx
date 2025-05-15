import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import toast from "react-hot-toast";
import { SetCategories } from "../../redux/CategorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Category?.categories) || [];
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [openRows, setOpenRows] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);

  const createCategoryList = (categories, options = [], depth = 0) => {
    for (let category of categories) {
      options.push({ value: category._id, label: category.categoryName });
      if (category.children && category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleFileChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/allcategories")
      .then((res) => {
        dispatch(SetCategories(res.data.categories));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!categoryName || !categoryImage) {
      return alert("Please fill all fields");
    }
    try {
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("parentId", parentId);
      formData.append("categoryImage", categoryImage);

      const res = await axios.post(
        "http://localhost:5000/admin/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Category created successfully");
        setCategoryName("");
        setParentId("");
        setCategoryImage(null);
        fetchCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (!categoryName) {
      return alert("Please fill category name");
    }

    try {
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("parentId", parentId || "");
      if (categoryImage) {
        formData.append("categoryImage", categoryImage);
      }

      const res = await axios.put(
        `http://localhost:5000/admin/updatecategory/${editCategoryData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Category updated successfully");
        dispatch(
          SetCategories(
            categories.map((cat) =>
              cat._id === res.data.category._id ? res.data.category : cat
            )
          )
        );

        setEditMode(false);
        setEditCategoryData(null);
        setCategoryName("");
        setParentId("");
        setCategoryImage(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  };

  const handleEditClick = (category) => {
    setEditMode(true);
    setEditCategoryData(category);
    setCategoryName(category.categoryName);
    setParentId(category.parentId || "");
    setCategoryImage(null);
  };

  const mainCategories = categories.filter((cat) => !cat.parentId);
  const subCategories = categories.filter((cat) => cat.parentId);
  const totalCategoryCount = categories.length;

  const getSubcategories = (parentId) =>
    categories.filter((cat) => cat.parentId === parentId);

  const handleToggle = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await axios.delete(
          `http://localhost:5000/admin/deletecategory/${categoryId}`
        );
        if (res.data.success) {
          toast.success("Category deleted successfully");
          dispatch(
            SetCategories(categories.filter((cat) => cat._id !== categoryId))
          );
          fetchCategories();
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete category");
      }
    }
  };

  const levelColors = [
    "#ffffff",
    "#e1f5fe",
    "#fbe9e7",
    "#e8eaf6",
    "#e0f7fa",
    "#e8f5e9",
    "#fff3e0",
    "#ede7f6",
    "#fce4ec",
  ];

  const renderCategoryRow = (cat, level = 0) => {
    const subcategories = getSubcategories(cat._id);
    const hasSubs = subcategories.length > 0;

    return (
      <React.Fragment key={cat._id}>
        <TableRow
          sx={{
            backgroundColor: levelColors[level % levelColors.length],
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#2462751a",
              cursor: "pointer",
              transition: "all 0.3s ease",
            },
          }}
        >
          <TableCell>
            {hasSubs && (
              <IconButton size="small" onClick={() => handleToggle(cat._id)}>
                {openRows[cat._id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            )}
          </TableCell>

          <TableCell>
            <Typography fontWeight={500} sx={{ paddingLeft: `${level * 20}px` }}>
              {cat.categoryName}
            </Typography>
          </TableCell>

          <TableCell>
            <img
              src={cat.categoryImage}
              className="w-[50px] h-[50px] rounded-full"
              alt=""
            />
          </TableCell>

          <TableCell>
            <div className="flex gap-2">
              <Button size="small" variant="contained" onClick={() => handleEditClick(cat)}>
                Edit
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleDelete(cat._id)}
              >
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>

        {hasSubs &&
          openRows[cat._id] &&
          subcategories.map((sub) => renderCategoryRow(sub, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <Box>
      {/* Category Count Summary */}
      <Box className="flex flex-wrap justify-around items-center gap-4 px-6 py-4 bg-[#f1f5f9] shadow-md">
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#246275" }}>
          Total Categories: {totalCategoryCount}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#246275" }}>
          Main Categories: {mainCategories.length}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#246275" }}>
          Subcategories: {subCategories.length}
        </Typography>
      </Box>

      <Box className="flex justify-end p-3 bg-[#28325682]">
        <Button
          variant="contained"
          sx={{ backgroundColor: "#246275" }}
          onClick={() => {
            setEditMode(false);
            setEditCategoryData(null);
            setCategoryName("");
            setParentId("");
            setCategoryImage(null);
          }}
        >
          Add New Category
        </Button>
      </Box>

      <Box className="flex justify-between xl:flex-row flex-col items-start p-6 gap-6">
        {/* Add/Edit Form */}
        <Box className="form-box w-full xl:w-[40%] rounded-5xl border shadow-lg">
          <Card>
            <CardContent className="space-y-6 p-6">
              <Typography
                sx={{
                  color: "#246275",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
                className="text-2xl font-bold text-center py-5"
              >
                {editMode ? "Edit Category" : "Add New Category"}
              </Typography>

              <TextField
                sx={{ mb: 2 }}
                label="Category Name"
                variant="outlined"
                fullWidth
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="parent-category-label">Parent Category</InputLabel>
                <Select
                  labelId="parent-category-label"
                  value={parentId}
                  label="Parent Category"
                  onChange={(e) => setParentId(e.target.value)}
                >
                  {createCategoryList(categories).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />

              <Button
                onClick={editMode ? handleUpdate : handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
                className="!mt-4"
                sx={{ backgroundColor: "#246275", padding: "10px" }}
              >
                {editMode ? "UPDATE" : "SUBMIT"}
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Category Table */}
        <Box className="table-box w-full xl:w-[60%]">
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Expand</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Category Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mainCategories.map((cat) => renderCategoryRow(cat))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
