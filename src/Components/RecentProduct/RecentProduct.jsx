import React , {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WhishlistContext } from '../../Context/WhishlistContext';

export default function RecentProduct (){
    let {getCartItems , addToCart, removeCartItem } = useContext(CartContext)
    let { addToWhishlistContext, removeFromWhishlistContext, isInWhishlistContext } = useContext(WhishlistContext)

    
    const[recentProduct, setRecentProduct]=useState([])

    function getRecentProduct()
    {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then(({data})=>
        {
      setRecentProduct(data.data);

        })
        .catch((error)=>
        {

        })
    }

    useEffect(()=>
    {
        getRecentProduct();

    },[])

    return<>
    <div className='row  '>
        {recentProduct.map((product)=>
        {


            const isFavourite = isInWhishlistContext(product.id);
            return(
                <>
                    
                <div className='col-3  px-4 ' >
                <div className='card-style m-0 py-4'>
                  <Link className='text-decoration-none' to={`/productdetailes/${product.id}`}>
                  <img className='w-100 ' src={product.imageCover} alt={product.title} />
                  <span className=' text-success  text-decoration-none '>{product.category.name}</span>
                  <h6 className='my-3 text-black '>{product.title.split(' ').slice(0,2).join(' ')}</h6>
                  <div className='d-flex align-items-center text-black align-content-between justify-content-between'>
                      <span className='style-div'>{product.price} EGP</span>
                      <span> <i className='fas fa-star icon-star'></i> {product.ratingsAverage} </span>
                  </div>
               
                  </Link>
                  <div className='flex d-flex '>
                  <button onClick={()=>{isFavourite?removeCartItem(product.id):addToCart(product)}} className='btn px-4 py-2 w-100 rounded text-white'> + Add </button>
                  </div>
                  <div className='position-relative'>
                    <i  onClick={()=>{isFavourite?removeFromWhishlistContext(product.id):addToWhishlistContext(product)}}  className={`position-absolute icon-heart  fs-3 fas fa-heart ${isFavourite?'text-danger' :'text-black'}`}></i>
                    </div>
                  
                 </div>
               
               </div>
                </>
            


            )

        }

           
        )}
    </div>

 
    </>
    
}