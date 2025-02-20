import axios from 'axios';
import React ,{useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
export default function ProductDetailes(){

    let {id} = useParams();


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };


    const [productdetailes,setProductDetailes]=useState(null);
    console.log(id);

    function getProductDetails(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then(({data})=>{
            console.log(data);
            setProductDetailes(data.data)

        })
        .catch(()=>{

        })
    }

    useEffect(()=>{
        getProductDetails(id);

    },[])
    return<>
    <div className='row'>
        <div className='col-md-3'>

        <Slider {...settings}>
            {productdetailes?.images.map((src)=>
                        <img className='w-100' src={src}  alt={productdetailes?.title} />

            )}
    
        </Slider>

        </div>

           <div className='col-md-9 p-5'>
            <h1 className='text-md font-normal text-gray-950'>{productdetailes?.title}</h1>
            <p className='mt-4 text-muted'>{productdetailes?.description}</p>
            <div className='flex my-4 justify-content-between align-items-center'>
                <span>{productdetailes?.price} EGP</span>
                <span>{productdetailes?.ratingsAverage} <i className='fas fa-star icon-star'></i></span>
                <div className='flex d-flex justify-content-between'>
                <button className=' px-4 py-2 w-100 rounded text-white bg-success'> add to cart</button>
                <i className='fas fa-heart '></i>

                </div>

            </div>
           </div>   
    </div>
    </>
}