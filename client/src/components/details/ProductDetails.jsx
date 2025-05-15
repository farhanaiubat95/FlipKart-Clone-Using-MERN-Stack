import React, { useState } from "react";
import { Box, Typography, Radio, FormControlLabel, RadioGroup, styled, TableBody, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// Icons
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';

// Styled Components
const Containers = styled(Box)({
    border: "1px solid #ddd",
    borderRadius: "4px",
    width: "400px",
    backgroundColor: "#fff",
    marginTop: "30px",
});

const OptionBox = styled(Box)`
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding: 10px;  /* Default padding */
    border-radius: 5px;
    background-color: ${({ selected }) => (selected ? "#f5faff" : "transparent")};
    transition: background 0.3s ease;
    position: relative;
`;

const Price = styled(Typography)({
    fontWeight: "bold",
    color: "#000",
});

const DiscountText = styled(Typography)({
    color: "#555",
    fontWeight: "bold",
});

const PincodeText = styled(Typography)({
    fontSize: "12px",
    color: "red",
    marginTop: "8px",
});

const CommonText = styled(Typography)({
    fontWeight: 500,
    fontSize: 14,
    color: '#2874f0',
    cursor: 'pointer'
})

const ColumnText = styled(TableRow)`

    & > td{
        font-size: 14px;
        border: none;
    }
`

const ProductDetails = ({ product }) => {
    const user =useSelector((state) => state.Auth.user);
    console.log("User:", user);
    const [selectedOption, setSelectedOption] = useState("withoutExchange");

    const assure = "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_9e47c1.png"
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)); // 5 days , 24 hours , 60 minutes , 60 seconds , 1000 milliseconds


    return (
        <Box style={{ paddingLeft: '20px ' }}>
            {/* part 1 */}
            <Box>
                <Typography style={{ fontSize: 20 }}>{product.productTitle} </Typography>
                <Typography style={{ marginTop: 5, marginBottom: 10, color: '#878787', fontSize: 14, display: 'flex' }}>
                    {product.productRatings} Ratings & 1 Review
                    <Box>
                        <img src={assure} alt="assure" style={{ marginLeft: 20, width: 77 }} />
                    </Box>
                </Typography>
                <Typography style={{ color: '#388e3c', fontWeight: 600, fontSize: 15 }}>Special price</Typography>
                {
                    product.productOffer > 0 ? (
                        <>
                            <Box component={"span"} style={{ fontSize: 28, fontWeight: 600 }}>Tk   {product.productPriceAfterDiscount}</Box>
                            <Box component={"span"} style={{ color: '#878787', margin: '0 15px', fontSize: 16 }}><strike>Tk  {product.productPrice}</strike></Box>
                            <Box component={"span"} style={{ color: '#388E3C', fontSize: 16 }}>{product.productOffer}% off</Box>
                        </>
                    ): (
                        <Box component={"span"} style={{ fontSize: 28, fontWeight: 600 }}>Tk   {product.productPrice}</Box>
                    )
                }
            </Box>

            {/* part 2  Available offers*/}
            <Box style={{ width: 710 }}>
                <Typography style={{ color: '#878787', fontWeight: 600, fontSize: 17, marginTop: 20 }}>Available offers</Typography>
                {/* 1 */}
                <Typography style={{ fontWeight: 400, fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center' }}>
                    <LocalOfferIcon style={{ marginRight: 10, color: '#5dac61', fontSize: 18 }} />
                    <Typography>
                        <span style={{ fontWeight: 700 }}>Bank Offer 5% </span>
                        Unlimited Cashback on Flipkart Axis Bank Credit Card
                        <span style={{ color: '#2874f0', fontWeight: 600, marginLeft: 5 }}> T&C</span>
                    </Typography>
                </Typography>

                {/* 2 */}
                <Typography style={{ fontWeight: 400, fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center' }}>
                    <LocalOfferIcon style={{ marginRight: 10, color: '#5dac61', fontSize: 18 }} />
                    <Typography>
                        <span style={{ fontWeight: 700 }}>Bank Offer 10% </span>
                        instant discount on SBI Credit Card EMI Transactions, up to Tk  1,500 on orders of Tk  5,000 and above
                        <span style={{ color: '#2874f0', fontWeight: 600, marginLeft: 5 }}> T&C</span>
                    </Typography>
                </Typography>

                {/* 3 */}
                <Typography style={{ fontWeight: 400, fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center' }}>
                    <LocalOfferIcon style={{ marginRight: 10, color: '#5dac61', fontSize: 18 }} />
                    <Typography>
                        <span style={{ fontWeight: 700 }}>Bank Offer 10% </span>
                        off up to Tk  1000 on HDFC Bank Credit Card EMI on 6 months and above tenure. Min. Txn Value: Tk  5000
                        <span style={{ color: '#2874f0', fontWeight: 600, marginLeft: 5 }}> T&C</span>
                    </Typography>
                </Typography>

                {/* 4 */}
                <Typography style={{ fontWeight: 400, fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center' }}>
                    <LocalOfferIcon style={{ marginRight: 10, color: '#5dac61', fontSize: 18 }} />
                    <Typography><span style={{ fontWeight: 700 }}>Special Price </span>
                        Get extra 45% off (price inclusive of cashback/coupon)
                        <span style={{ color: '#2874f0', fontWeight: 600, marginLeft: 5 }}> T&C</span>
                    </Typography>
                </Typography>
                {/* 5 */}
                <CommonText style={{ marginTop: 15 }}>
                    View all offers
                </CommonText>
            </Box>

            {/* Part 3 box*/}
            <Containers>
                <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    {/* Buy Without Exchange - No extra padding */}
                    <OptionBox selected={selectedOption === "withoutExchange"}>
                        <FormControlLabel
                            value="withoutExchange"
                            control={<Radio color="primary" />}
                            label="Buy without Exchange"
                        />
                        <Price>Tk  1,229</Price>
                    </OptionBox>

                    {/* Buy With Exchange - Extra padding only when selected */}
                    <OptionBox
                        selected={selectedOption === "withExchange"}
                        sx={{ paddingBottom: selectedOption === "withExchange" ? "35px" : "10px" }}
                    >
                        <FormControlLabel
                            value="withExchange"
                            control={<Radio color="default" />}
                            label="Buy with Exchange"
                        />
                        <DiscountText>up to Tk  300 off</DiscountText>

                        {/* Show PincodeText when "withExchange" is selected */}
                        {
                            selectedOption === "withExchange" && (
                                <PincodeText style={{ position: 'absolute', top: 40, left: 42, padding: '10px 0', fontSize: 13, fontWeight: 500 }}>Enter pincode to check if exchange is available</PincodeText>
                            )
                        }
                    </OptionBox>
                </RadioGroup>
            </Containers>

            {/* part 4 */}
            <Box style={{ marginTop: 20 }}>
                <Typography style={{ display: 'flex', alignItems: 'center' }}>1 Year Manufacturer Warranty <CommonText style={{ marginLeft: 5, marginTop: 2 }}> Know More</CommonText></Typography>
            </Box>

            {/* part 5 Table */}
            <Box style={{ marginTop: 20 }}>
                <TableBody>
                    <ColumnText  >
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | Tk   40</TableCell>
                    </ColumnText  >
                    <ColumnText>
                        <TableCell style={{ color: '#878787', verticalAlign: 'top' }}>Seller</TableCell>
                        <TableCell style={{ fontWeight: 600, verticalAlign: 'top' }}>
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <CommonText style={{ textTransform: 'uppercase' }}>{product.createdBy.shopName}</CommonText>
                                <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 10, padding: '2px 5px', background: '#2874f0', borderRadius: 50 }}>
                                    <span style={{ color: 'white', marginRight: 2, fontSize: 11, fontWeight: 'bold' }}>4.5</span>
                                    <StarIcon style={{ color: 'white', fontSize: 12 }} />
                                </Box>
                            </Box>

                            <Box className="tableCell2" style={{ marginTop: 8 }}>
                                <ul style={{ marginLeft: -20 }}>
                                    <li><Typography style={{ fontSize: 13, marginTop: 5 }}>GST invoice available</Typography></li>
                                    <li><Typography style={{ fontSize: 13, marginTop: 5 }}>View more sellers starting from Tk  {product.productPrice}</Typography></li>
                                </ul>
                            </Box>
                        </TableCell>
                    </ColumnText>
                    <ColumnText  >
                        <TableCell style={{ color: '#878787' }}>Returns</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Eligible for returns</TableCell>
                    </ColumnText  >
                    <ColumnText  >
                        <TableCell style={{ color: '#878787' }}>Description</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                           {product.productDescription}</TableCell>
                    </ColumnText  >
                </TableBody>
            </Box>
        </Box>
    )
}

export default ProductDetails