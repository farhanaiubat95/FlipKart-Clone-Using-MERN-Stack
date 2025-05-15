import { Box, styled, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import ProductDetails from './ProductDetails.jsx';
import ActionItems from './ActionItems.jsx'; // FIXED

// Styled Components
const Component = styled(Box)(({ theme }) => ({
    backgroundColor: '#f2f2f2',
    marginTop: '10px',
    maxWidth: '1366px',
    width: '100%',
    margin: '0 auto',
}));

const Container = styled(Grid)(() => ({
    backgroundColor: '#ffffff',
    display: 'flex',
    marginTop: '1px',
    padding: '20px 10px',
}));

const DetailView = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const { products, loading } = useSelector((state) => state.Product);
    const product = products.find((product) => product._id === id);

    // Optional: Fetch products if not already loaded
    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts()); // Replace with your actual fetch action
        }
    }, [dispatch, products]);

    return (
        <Component>
            {!loading && product &&
                <Container container spacing={3}>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <ActionItems product={product} />
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                        <ProductDetails product={product} />
                    </Grid>
                </Container>
            }
        </Component>
    );
};

export default DetailView;
