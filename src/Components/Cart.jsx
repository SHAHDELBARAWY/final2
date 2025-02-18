import React, {useContext, useEffect, useState} from 'react';
import  CartContextProvider, { CartContext } from '../Context/CartContext';
export default function Cart (){

    const [counter , setcounter ] = useState(0);
    const [cartDetails, setCartDetails] = useState(null);
    const { removeCartItem, updateCartItem , getCartItems } = useContext(CartContext);

    async function getCart()
    {
        let response = await getCartItems();
        setCartDetails(response.data);
    } 

    async function updateQuantity(productId , count)
    {
        if(count < 1)

            removeItem(productId)
        let response = await updateCartItem(productId , count);
        setCartDetails(response.data);
    } 


    async function removeItem(productId)
    {
        let response = await removeCartItem(productId);
        console.log(response);
        setCartDetails(response.data);
    }

    useEffect(() => {
        getCart();
    }, []);
    

    return(
    
    <>

    <div class="container mt-5 px-5 justify-content-center text-center">
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead class="thead-light">
                <tr>
                    <th scope="col">PRODUCT</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">QTY</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">ACTION</th>
                </tr>
            </thead>
            <tbody>
                {cartDetails?.data.products.map((product)=>
                 <tr key={product.product.id}>
                 <td className='w-25'>
                     <img src={product.product.imageCover} class="img-fluid w-100" alt={product.product.title}/>
                 </td>
                 <td className=' fs-5 fw-bold w-50'>{product.product.title}</td>
                 <td>
                     <div class="input-group">
                         <div class="input-group-prepend">
                             <button onClick={()=>updateQuantity(product.product.id , product.count-1)} class="btn bg-danger text-white" type="button">-</button>
                         </div>
                         <span className='p-2'>{product.count}</span>
                         <div class="input-group-append">
                             <button onClick={()=>updateQuantity(product.product.id , product.count+1)} class="btn bg-success text-white" type="button">+</button>
                         </div>
                     </div>
                 </td>
                 <td>{product.price} EGP</td>
                 <td>
                     <span  onClick={()=> removeItem(product.product.id)} type='button' class="fw-bold text-danger">Remove</span>
                 </td>
             </tr>)}
               
                
            </tbody>
        </table>
    </div>
</div>


    
    </>
    )
}


