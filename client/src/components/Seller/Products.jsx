import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Paper,
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { SetProducts } from "../../redux/ProductSlice"; // adjust path if needed
import axios from "axios";
import toast from "react-hot-toast";

const Products = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.Product);
    const { categories } = useSelector((state) => state.Category);

    const [productName, setProductName] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productOffer, setProductOffer] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [productImage, setProductImage] = useState([]);

    const handleFileChange = (e) => {
        setProductImage([...e.target.files]); // support multiple files
    };

    const fetchProducts = () => {
        axios.get("http://localhost:5000/allproducts")
            .then(res => {
                dispatch(SetProducts(res.data.products));
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchProducts();
    }, [dispatch]);

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
            formData.append("createdBy", createdBy);
            formData.append("inStock", true);

            productImage.forEach((img) => {
                formData.append("productImage", img);
            });

            const res = await axios.post(
                "http://localhost:5000/seller/dashboard/create-product",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                         
                    },
                }
            );


            if (res.data.success) {
                toast.success(res.data.message);
                fetchProducts();
                // Reset form
                setProductName("");
                setProductTitle("");
                setBrand("");
                setProductPrice("");
                setProductOffer("");
                setProductDescription("");
                setProductCategory("");
                setProductQuantity("");
                setCreatedBy("");
                setProductImage([]);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create product");
        }
    };

    const getCategoryName = (categoryId) => {
        const found = categories.find((cat) => cat._id === categoryId);
        return found ? found.categoryName : categoryId;
    };

    return (
        <Box p={4}>
            <Box>
                <Typography variant="h5" gutterBottom>
                    Add New Product
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
                    <TextField label="Price" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
                    <TextField label="Offer (%)" type="number" value={productOffer} onChange={(e) => setProductOffer(e.target.value)} />
                    <TextField label="Quantity" type="number" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
                    <TextField label="Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} multiline rows={1} />
                    <TextField
                        select
                        label="Category"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        required
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                                {cat.categoryName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Created By"
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                       file:rounded-full file:border-0 file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </Box>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ backgroundColor: "#246275", padding: "10px" }}
                >
                    SUBMIT
                </Button>
            </Box>

            <Box>
                <Typography variant="h5" gutterBottom mt={6}>
                    All Products
                </Typography>

                <div className="overflow-auto w-full ">
                    <div className="min-w-[600px] sm:min-w-[800px] md:min-w-[1000px] lg:min-w-[1300px] xl:min-w-[1600px]">
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {[
                                            "Images", "Name", "Title", "Brand", "Price", "Offer (%)", "Discount",
                                            "Description", "Category", "Quantity", "In Stock", "Rating", "Reviews",
                                            "Created By", "Created At",
                                        ].map((header, index) => (
                                            <TableCell key={index} align="center" sx={{ fontWeight: "bold", fontSize: "12px", whiteSpace: "nowrap" }}>
                                                {header}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell align="center">
                                                {product.productImage?.map((imgObj, i) => (
                                                    <Avatar
                                                        key={i}
                                                        src={`http://localhost:5000/uploads/${imgObj.img}`}
                                                        alt="product"
                                                        variant="square"
                                                        sx={{ width: 40, height: 40, mr: 0.5 }}
                                                    />
                                                ))}
                                            </TableCell>
                                            <TableCell align="center">{product.productName}</TableCell>
                                            <TableCell align="center">{product.productTitle}</TableCell>
                                            <TableCell align="center">{product.brand}</TableCell>
                                            <TableCell align="center">${product.productPrice}</TableCell>
                                            <TableCell align="center">{product.productOffer}%</TableCell>
                                            <TableCell align="center">${product.productDiscount}</TableCell>
                                            <TableCell align="center">{product.productDescription}</TableCell>
                                            <TableCell align="center">
                                                {getCategoryName(product.productCategory)}
                                            </TableCell>
                                            <TableCell align="center">{product.productQuantity}</TableCell>
                                            <TableCell align="center">
                                                <Chip label={product.inStock ? "Yes" : "No"} color={product.inStock ? "success" : "error"} size="small" />
                                            </TableCell>
                                            <TableCell align="center">{product.productRatings}/5</TableCell>
                                            <TableCell align="center">
                                                {product.productReviews?.length > 0
                                                    ? product.productReviews.map((r, i) => (
                                                        <Typography key={i} variant="body2">
                                                            - {r.reviews}
                                                        </Typography>
                                                    ))
                                                    : "No reviews"}
                                            </TableCell>
                                            <TableCell align="center">
                                                {product.createdBy?.name || product.createdBy}
                                            </TableCell>
                                            <TableCell align="center">
                                                {new Date(product.createdAt).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Box>
        </Box>
    );
};

export default Products;
