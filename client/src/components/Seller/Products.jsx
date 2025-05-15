import React, { useState, useEffect } from "react";
import {
    Box, Typography, TextField, Button, MenuItem, Paper,
    Avatar, Chip, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { SetProducts } from "../../redux/ProductSlice";
import axios from "axios";
import toast from "react-hot-toast";

// icons
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

const Products = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.Product);
    const { categories } = useSelector((state) => state.Category);
    const user = useSelector((state) => state.Auth.user);

    const [formMode, setFormMode] = useState("add");
    const [editId, setEditId] = useState(null);

    const [productName, setProductName] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productOffer, setProductOffer] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productImage, setProductImage] = useState([]);

    const [product, setProduct] = useState(null);

    const resetForm = () => {
        setProduct(null);
        setProductName("");
        setProductTitle("");
        setBrand("");
        setProductPrice("");
        setProductOffer("");
        setProductDescription("");
        setProductCategory("");
        setProductQuantity("");
        setProductImage([]);
        setEditId(null);
        setFormMode("add");
    };

    const fetchProducts = () => {
        axios.get("http://localhost:5000/allproducts")
            .then(res => dispatch(SetProducts(res.data.products)))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchProducts();
    }, [dispatch]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProductImage(files);
    };

    const handleEdit = (product) => {
        setProduct(product);
        setFormMode("edit");
        setEditId(product._id);
        setProductName(product.productName);
        setProductTitle(product.productTitle);
        setBrand(product.brand);
        setProductPrice(product.productPrice);
        setProductOffer(product.productOffer);
        setProductDescription(product.productDescription);
        setProductCategory(product.productCategory);
        setProductQuantity(product.productQuantity);
        setProductImage([]);
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/seller/delete-product/${id}`);
            if (res.data.success) {
                toast.success("Product deleted successfully");
                fetchProducts();
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete product");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("productTitle", productTitle);
            formData.append("brand", brand);
            formData.append("productPrice", productPrice);
            formData.append("productOffer", productOffer);
            formData.append("productDescription", productDescription);
            formData.append("productCategory", productCategory);
            formData.append("productQuantity", productQuantity);
            formData.append("createdBy", user?._id);

            if (productImage.length > 0) {
                productImage.forEach((img) => {
                    formData.append("productImage", img);
                });
            } else if (formMode === "edit") {
                formData.append("retainOldImages", "true");
            }

            let res;

            if (formMode === "add") {
                res = await axios.post("http://localhost:5000/seller/dashboard/create-product", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                });
            } else {
                res = await axios.put(`http://localhost:5000/seller/update-product/${editId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                });
            }

            if (res.data.success) {
                toast.success(res.data.message);
                fetchProducts();
                resetForm();
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const getCategoryName = (categoryId) => {
        const found = categories.find((cat) => cat._id === categoryId);
        return found ? found.categoryName : categoryId;
    };

    return (
        <Box p={4}>
            <Box className="form-container">
                <Typography variant="h5" gutterBottom>
                    {formMode === "add" ? "Add New Product" : "Edit Product"}
                </Typography>

                <Box
                    component={Paper}
                    p={2}
                    mb={4}
                    display="grid"
                    gap={2}
                    gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
                >
                    <TextField label="Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                    <TextField label="Title" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} required />
                    <TextField label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                    <TextField label="Price" type="number" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))} required />
                    <TextField label="Offer (%)" type="number" value={productOffer} onChange={(e) => setProductOffer(e.target.value)} />
                    <TextField label="Quantity" type="number" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
                    <TextField label="Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} multiline rows={1} required />
                    <TextField
                        select
                        label="Category"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        required
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>{cat.categoryName}</MenuItem>
                        ))}
                    </TextField>

                    {/* Start of Image Upload */}
                    <Box>
                        <TextField
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500"
                        />

                        {formMode === "edit" && (
                            <>
                                {/* Existing Images */}
                                {product?.productImage?.length > 0 && (
                                    <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                                        {product.productImage.map((imgObj, index) => (
                                            <Avatar
                                                key={index}
                                                src={`http://localhost:5000/uploads/${imgObj.img}`}
                                                variant="square"
                                                sx={{ width: 56, height: 56 }}
                                                title="Existing Image"
                                            />
                                        ))}
                                    </Box>
                                )}

                                {/* New Selected Image Previews */}
                                {productImage.length > 0 && (
                                    <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                                        {productImage.map((file, index) => (
                                            <Avatar
                                                key={index}
                                                src={URL.createObjectURL(file)}
                                                variant="square"
                                                sx={{ width: 56, height: 56, border: "2px solid green" }}
                                                title="New Selected Image"
                                            />
                                        ))}
                                    </Box>
                                )}

                                <Typography variant="caption" color="textSecondary">
                                    * Leave empty to keep existing images
                                </Typography>
                            </>
                        )}
                    </Box>
                    {/* End of Image Upload */}
                </Box>

                <Box display="flex" gap={2}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: "#246275", padding: "10px", flex: 1 }}
                    >
                        {formMode === "add" ? "SUBMIT" : "UPDATE"}
                    </Button>
                    {formMode === "edit" && (
                        <Button
                            onClick={resetForm}
                            variant="outlined"
                            sx={{ padding: "10px", backgroundColor: "#5c5d3c", color: "white" }}
                        >
                            Cancel Edit
                        </Button>
                    )}
                </Box>
            </Box>

            {/* Product Table */}
            <Box className="table-container">
                <Typography variant="h5" gutterBottom mt={6}>
                    All Products
                </Typography>

                <TableContainer component={Paper} sx={{ maxHeight: 350, overflow: "auto" }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {["Actions", "Images", "Name", "Title", "Brand", "Price", "Offer (%)", "Discount", "After Discount", "Description", "Category", "Quantity", "In Stock", "Rating", "Reviews", "Created By", "Created At"].map((header, index) => (
                                    <TableCell key={index} align="center" sx={{ fontWeight: "bold", fontSize: "12px", backgroundColor: "#f5f5f5", top: 0, zIndex: 1 }}>
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell align="center">
                                        <Button onClick={() => handleEdit(product)} sx={{ minWidth: "unset", mr: 1 }}><EditSquareIcon /></Button>
                                        <Button color="error" onClick={() => handleDelete(product._id)} sx={{ minWidth: "unset" }}><DeleteIcon /></Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box position="relative" display="inline-block">
                                            <Avatar
                                                src={`http://localhost:5000/uploads/${product.productImage?.[0]?.img}`}
                                                variant="square"
                                                sx={{ width: 40, height: 40 }}
                                            />
                                            {product.productImage?.length > 1 && (
                                                <Box
                                                    position="absolute"
                                                    top={0}
                                                    right={0}
                                                    bgcolor="rgba(0,0,0,0.6)"
                                                    color="white"
                                                    fontSize="10px"
                                                    px={0.5}
                                                    borderRadius="4px"
                                                >
                                                    +{product.productImage.length - 1}
                                                </Box>
                                            )}
                                        </Box>
                                    </TableCell>

                                    <TableCell align="center">{product.productName}</TableCell>
                                    <TableCell sx={{ maxWidth: 120, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} align="center">{product.productTitle}</TableCell>
                                    <TableCell align="center">{product.brand}</TableCell>
                                    <TableCell align="center">Tk{product.productPrice}</TableCell>
                                    <TableCell align="center">{product.productOffer}%</TableCell>
                                    <TableCell align="center">Tk{product.productDiscount}</TableCell>
                                    <TableCell align="center">Tk{product.productPriceAfterDiscount}</TableCell>
                                    <TableCell sx={{ maxWidth: 120, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} align="center">{product.productDescription}</TableCell>
                                    <TableCell align="center">{getCategoryName(product.productCategory)}</TableCell>
                                    <TableCell align="center">{product.productQuantity}</TableCell>
                                    <TableCell align="center">
                                        <Chip label={product.inStock ? "Yes" : "No"} color={product.inStock ? "success" : "error"} size="small" />
                                    </TableCell>
                                    <TableCell align="center">{product.productRatings}/5</TableCell>
                                    <TableCell align="center">
                                        {product.productReviews?.length ? product.productReviews.map((r, i) => (
                                            <Typography key={i} variant="body2">- {r.reviews}</Typography>
                                        )) : "No reviews"}
                                    </TableCell>
                                    <TableCell align="center">{product.createdBy?.name || product.createdBy}</TableCell>
                                    <TableCell align="center">{new Date(product.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Products;
