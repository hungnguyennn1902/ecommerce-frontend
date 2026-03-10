import './HomePage.css';
import { Header } from '../../components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductGrid } from './ProductGrid';
export function HomePage({ cart, fetchCartData }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchHomePageData = async () => {
            const productsResponse = await axios.get('/api/products')
            setProducts(productsResponse.data)
        }
        fetchHomePageData()
    }, [])
    
    return (
        <>
            <title>Ecommerce Project</title>
            <Header cart={cart} />
            <div className="home-page">
                <ProductGrid fetchCartData={fetchCartData} products={products} />
            </div>
        </>
    );
}