import React from 'react';
import './Home.css';
import MyCarousel from '../Carousel/Carousel';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import Product from '../Product/Product';
import { Row } from 'react-bootstrap';
import useProducts from '../../hooks/useProducts';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    const [products] = useProducts();

    return (
        <>
            <Header></Header>

            <MyCarousel></MyCarousel>

            <div className="section-1 d-flex justify-content-end align-items-center">
                <div className="front-bg w-50 h-100 text-center p-5">
                    <h1>Enjoy</h1>
                    <h2>With</h2>
                    <h1>ShoppingMart</h1>
                </div>
            </div>

            <div className="section-2 box">

                <div>
                    <h1>Enjoy! More Shopping !! Unique and quality product!!!</h1>
                    <br />
                    <h2>ShoppingMart is always present here to make you more glamourous and smart with our best ever beauty products you deserve. Plan a big surprize for your family with us & enjoy your holidays.</h2>
                </div>

            </div>

            <div id="products">
                <h1 className="mt-3 text-start">Our Products</h1>
                <div className="product-container">
                    <Row xs={1} md={4}>
                        {
                            products.slice(0, 4).map(product => <Product
                                key={product.id}
                                product={product}
                            ></Product>)
                        }
                    </Row>
                </div>
            </div>

            <Reviews></Reviews>

            <Footer></Footer>

        </>
    );
}

export default Home;