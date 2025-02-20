import React, {useContext}from 'react';
import { WhishlistContext } from '../Context/WhishlistContext';
export default function Whishlist (){
    let {WhishlistItems, removeFromWhishlistContext } = useContext(WhishlistContext)


    return(
    <>
    <div className=" bg-light p-5 m-5">
        <h2 className='text-success fw-bold text-center'>My wish list</h2>
        <div className='row border-bottom my-3 d-flex align-items-center p-2 '>
            {WhishlistItems.length===0&&<p>no Fav yet</p>}
            {WhishlistItems.map((item)=> <div key={item.id}>


            <div className='col-md-3'>
                <img className='w-75' src={item.imageCover}  alt={item.category.name} />
            </div>
        
           <div className='col-md-9 p-5'>
            <h1 >{item?.title}</h1>
            <p className=' text-muted'>{item?.description}</p>
            <div className='flex justify-content-between align-items-center'>
                <span>{item?.price} EGP</span>
                <span>{item?.ratingsAverage} <i className='fas fa-star icon-star'></i></span>
                <div className='flex d-flex '>
                  <button onClick={()=>removeFromWhishlistContext(item.id)} className='bg-success px-4 py-2 w-100 rounded text-white  border-0'> Clear from Fav </button>
                  </div>

            </div>
            </div>
                  </div>

                )}

        </div>

    </div>
    
    </>
    )
}

