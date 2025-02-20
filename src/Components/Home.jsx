import React , {useEffect, useState} from 'react';
import RecentProduct from './RecentProduct/RecentProduct';
import Categories from '../Categories';
import CategoriesSlider from './CategoriesSlider/CategoriesSlider';
import MainSlider from './MainSlider/MainSlider';
export default function Home (){
    return(
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProduct/>
    
    </>
    )
}
