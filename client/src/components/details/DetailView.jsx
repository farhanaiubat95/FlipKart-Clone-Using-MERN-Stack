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

const Container = styled(Box)(() => ({
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: '100px',

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
                <Container >

                    <div className='flex flex-col lg:flex-row justify-center px-10 xl:px-0 xl:gap-5'>
                        <div className='w-[90%] lg:w-[40%]' >
                            <ActionItems product={product} />
                        </div>

                       <div className='w-[90%] lg:w-[60%]'>
                         <ProductDetails  product={product} />
                       </div>
                    </div>

                </Container>
            }
        </Component>
    );
};

export default DetailView;
