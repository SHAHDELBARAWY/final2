import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
export default function CategoriesSlider(){

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:false,
      };

      const[categories, setCategories]=useState([])

      function getCategories()
      {
          axios.get('https://ecommerce.routemisr.com/api/v1/categories')
          .then(({data})=>
          {
              setCategories(data.data);
  
          })
          .catch((error)=>
          {
  
          })
      }

      useEffect(()=>{
        getCategories();

      }, [])
    return<>

    <div>
    <Slider {...settings} className=" mt-5">
        {categories.map((category)=>  
        <div key={category}>
            <img height={200} className=" w-100 object-fit-cover " src={category.image} alt={category.name} />
            <h3 >{category.name}</h3>
        </div>)}
    
        </Slider>
    </div>

    </>
}