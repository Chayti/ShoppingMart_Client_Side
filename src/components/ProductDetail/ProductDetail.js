import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import './ProductDetail.css';
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";

const ProductDetail = () => {

    const { user } = useAuth();
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        fetch(`http://localhost:5000/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log(`http://localhost:5000/products/${productId}`)
                setProduct(data)
            }
            );
    }, [productId])

    const onSubmit = data => {
        data.productName = product.name
        data.price = product.price
        data.productId = productId
        data.name = product.name
        data.img = product.img
        data.description = product.description
        data.status = 'pending'
        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Your order processed Successfully');
                    reset();
                }
            })
    };

    return (
        <div>
            <Header></Header>
            <div className="container my-5 product-detail">
                <h1>{product.name}</h1>
                <img className="my-3" src={product.img} alt="..." />
                <br />
                <h2 className="text-start fw-bold d-inline" style={{ color: "rgba(118, 189, 11)", backgroundColor: "yellow" }}>Price: ${product.price}</h2>
                <h4>{product.description}</h4>
                <br />
                <br />
                <div>
                    <div className="shipping-form-bg d-flex justify-content-center">
                        <form className="shipping-form my-4" onSubmit={handleSubmit(onSubmit)}>

                            <input defaultValue={product.name} {...register("productName")} /><br />

                            <input defaultValue={product.price} {...register("price")} /><br />
                            <input defaultValue={user.displayName} {...register("name")} /><br />
                            <input defaultValue={user.email} {...register("email", { required: true })} /><br />
                            {errors.email && <span className="error">This field is required</span>}
                            <input placeholder="Address" defaultValue="" {...register("address")} /><br />
                            <input placeholder="City" defaultValue="" {...register("city")} /><br />
                            <input placeholder="phone number" defaultValue="" {...register("phone")} /><br />

                            <input type="submit" value="Book Now" />
                        </form>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProductDetail;