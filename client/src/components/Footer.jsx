import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

const Footer = () => {

    return (
        <Box className="bg-[#212121] text-white p-6 sm:p-10 mt-10">
            <Box className="w-[90%] mx-auto">
                <Grid container spacing={4}>
                    {/* About */}
                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="subtitle2" className="text-gray-400 mb-2 uppercase">
                            About
                        </Typography>
                        <Box className="flex flex-col gap-1">
                            {['Contact Us', 'About Us', 'Careers', 'Flipkart Stories', 'Press', 'Corporate Information'].map(item => (
                                <Link href="#" key={item} sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: 'gray' , textDecoration: 'underline' } }}>{item}</Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Group Companies */}
                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="subtitle2" className="text-gray-400 mb-2 uppercase">
                            Group Companies
                        </Typography>
                        <Box className="flex flex-col gap-1">
                            {['Myntra', 'Cleartrip', 'Shopsy'].map(item => (
                                <Link href="#" key={item} sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: 'gray' , textDecoration: 'underline' }  }}>{item}</Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Help */}
                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="subtitle2" className="text-gray-400 mb-2 uppercase">
                            Help
                        </Typography>
                        <Box className="flex flex-col gap-1">
                            {['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ'].map(item => (
                                <Link href="#" key={item} sx={{ color: 'white', textDecoration: 'none','&:hover': { color: 'gray' , textDecoration: 'underline' }  }}>{item}</Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Consumer Policy */}
                    <Grid item xs={6} sm={6} md={2}>
                        <Typography variant="subtitle2" className="text-gray-400 mb-2 uppercase">
                            Consumer Policy
                        </Typography>
                        <Box className="flex flex-col gap-1">
                            {['Cancellation & Returns', 'Terms Of Use', 'Security', 'Privacy', 'Sitemap', 'Grievance Redressal', 'EPR Compliance'].map(item => (
                                <Link href="#" key={item} sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: 'gray' , textDecoration: 'underline' }  }}>{item}</Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Mail Us */}
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant="subtitle2" className="text-gray-400 mb-2 uppercase">
                            Mail Us:
                        </Typography>
                        <Typography className="text-sm leading-relaxed">
                            Flipkart Internet Private Limited,<br />
                            Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
                            Outer Ring Road, Devarabeesanahalli Village,<br />
                            Bengaluru, 560103,<br />
                            Karnataka, India
                        </Typography>

                        <Box className="flex gap-3 mt-4">
                            <Facebook fontSize="small" className="text-white hover:text-gray-300 cursor-pointer" />
                            <Twitter fontSize="small" className="text-white hover:text-gray-300 cursor-pointer" />
                            <YouTube fontSize="small" className="text-white hover:text-gray-300 cursor-pointer" />
                            <Instagram fontSize="small" className="text-white hover:text-gray-300 cursor-pointer" />
                        </Box>
                    </Grid>

                    {/* Registered Address */}
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant="subtitle2" className="text-gray-400 mb-2 uppercase">
                            Registered Office Address:
                        </Typography>
                        <Typography className="text-sm leading-relaxed">
                            Flipkart Internet Private Limited,<br />
                            Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
                            Outer Ring Road, Devarabeesanahalli Village,<br />
                            Bengaluru, 560103,<br />
                            Karnataka, India<br />
                            CIN: <span className="text-gray-400">U51109KA2012PTC066107</span><br />
                            Telephone: <span className="text-gray-400">044-45614700 / 044-67415800</span>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Footer;
