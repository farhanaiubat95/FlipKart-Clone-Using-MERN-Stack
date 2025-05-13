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
  InputAdornment,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { AddCategory } from "../../redux/CategorySlice";
import { post } from "../../API/ApiEndPoints";
const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Category.categories);
  const [openRows, setOpenRows] = useState({});

 

  // Main Category
  const mainCategories = categories.filter((cat) => !cat.parentId);

  const getSubcategories = (parentId) =>
    categories.filter((cat) => cat.parentId === parentId);

  const handleToggle = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };



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

          <form onSubmit={handleSubmit} className="space-y-4" method="post" enctype="multipart/form-data">
            <TextField
              fullWidth
              label="Category Name"
              name="categoryName"
              value={categoryName}
              onChange={handleCategoryName}
            />

            <FormControl fullWidth sx={{ margin: "15px 0" }}>
              <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parentId}
                label="Select Category"
                name="parentId"
                onChange={handleParentId}
              >
                {
                  createCategoryList(categories).map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <input type="file" name="categoryImage" onChange={handleCategoryImage} />



            <Button type="submit" variant="contained" sx={{ backgroundColor: "#246275" }} fullWidth>
              Submit
            </Button>
          </form>

        </Paper>
      </div>

      <div className="w-[100%] lg:w-[50%]">
        <TableContainer component={Paper} className="w-full shadow-md">
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

export default Category;
