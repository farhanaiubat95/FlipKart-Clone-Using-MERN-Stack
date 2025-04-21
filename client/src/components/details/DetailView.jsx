import { Box,styled, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../redux/actions/productaction.js'


// Component
import ActionItems from './ActionItems.jsx'
import ProductDetails from './ProductDetails.jsx'

// Styled Components
const Component = styled(Box)(({ theme }) => ({
    backgroundColor: '#f2f2f2',
    marginTop: '10px',
    width: '1366px',
    margin: '0 auto',

}));

const Container = styled(Grid)(() => ({
    backgroundColor: '#ffffff',
    display: 'flex',
    marginTop: '1px',
    padding: '20px 10px',
}));

const RightContainer = styled(Grid)(() => ({

}));


const DetailView = () => {
    // Dispatch
    const dispatch = useDispatch()

    // Get the id from the URL
    const { id } = useParams()

    // Get the product details from the Redux store
    const { loading, product } = useSelector(state => state.getProductDetails)

    // Fetch the product data from the server using the id
    useEffect(() => {
        if (product && id !== product.id) {
            dispatch(getProductDetails(id))
        }
    }, [dispatch, id, product, loading]) //id - if id change or new product
    console.log(product)
    
    return (
        <Component>
            {
                !loading && product && Object.keys(product).length &&
                <Container container spacing={3}>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                        <ActionItems product={product} />
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={8}>    
                        <ProductDetails product={product} />
                    </RightContainer>
                </Container>

            }

        </Component>
    )
}

export default DetailView
