import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../store/cartSlice';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
const Products = () => {
    const [value, setValue] = useState("")
    const [sortDirection, setSortDirection] = useState('ascending');
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            const filtering = data.filter(item=>item.title.toLowerCase().includes(value.toLowerCase()))
            setProducts(filtering);
        };
        fetchProducts();
    }, [value]);

    const handleAdd = (product) => {
        dispatch(add(product))
    }

    const handleSort=()=>{
        let sortedData = []
        if(sortDirection == 'ascending'){
             sortedData= [...products].sort((a,b)=>{
                setSortDirection('descending'); 
                return (a.price-b.price)
            })

        }
        else{
            sortedData = [...products].sort((a,b)=>{
                setSortDirection('ascending');
                return (b.price-a.price)
            })
        }
        setProducts(sortedData);
    }

    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-around',marginBottom:100}}>
            <TextField onChange={(e=>setValue(e.target.value))} id="standard-basic" label="Filter by Title" variant="standard" />
            <Button variant='contained' onClick={handleSort}>Sort by price</Button>
            </div>
            <div className="productsWrapper">
                {products.map((product) => (
                    <div className="card" key={product.id}>
                        <img src={product.image} alt="" />
                        <h4>{product.title}</h4>
                        <h5>{product.price} azn</h5>
                        <button onClick={() => handleAdd(product)} className="btn">
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;