import React , {useContext, useEffect, useState} from 'react';
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { ClimbingBoxLoader } from "react-spinners"
import axios from 'axios';
import useProducts from '../Hooks/useProducts';



export default function Products (props){

    let {data , isError ,error, isLoading , isFetching} = useProducts();

   

  if(isLoading)
    {
     return <div className='py-5  w-100 flex justify-content-center'>
         <ClimbingBoxLoader color='green' />
 
     </div>
    };
    if(isError)
     {
      return <div className='py-5  w-100 flex justify-content-center'>
         <h3>{error}</h3>
  
      </div>
     };
  
 
 
 
     return<>
     <div className='row '>
         {data?.data.data.map((product)=>
         {
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
                   <div className='flex d-flex '>
                   <button className='btn px-4 py-2 w-100 rounded text-white'> + Add </button>
                   </div>
                   </Link>
                  
                  </div>
                
                </div>
                 </>
             
 
 
             )
 
         }
 
            
         )}
     </div>
 
  
     </>
     
 }