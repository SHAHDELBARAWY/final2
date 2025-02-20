import React from "react";
import Slider from 'react-slick'; 
import mainSlider from '../../assets/images/img 3.jpg';
import mainSlider1 from '../../assets/images/img 4.jpg';
import slide1 from '../../assets/images/img 2.jpg'
import slide2 from '../../assets/images/img 1.jpg'


export default function MainSlider(){
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
      };

    return<>
    <div className="row m-5 justify-content-center align-items-center text-center">
        <div className="col-md-3 m-0 p-0">
        <Slider {...settings}>
        <img height={500} src={mainSlider} className="w-100 " />
        <img height={500} src={mainSlider1} className="w-100 " />
        
        </Slider>
        </div>    
        <div className="col-md-3 m-0  p-0">
            <img height={250} src={slide1} className="w-100" />  
            <img height={250} src={slide2} className="w-100" />  

        </div>

    </div>

    </>

}