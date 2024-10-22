import React from "react";
import rafiki from '../assets/imagenes/rafiki.png'
import Header from '../components/Header'
import  add from '../assets/imagenes/add.png'
import '../styles/HomeScreenEmpty.css'
const HomeEmpty: React.FC = () => {
    return (
        <div>
        <div className="cuerpo">
       <div>
        <Header/>
       </div>
       <div>
       <img src={rafiki} alt="rafiki" />
       <p>create your first note</p>
       </div>
       <img className="cruz"  src={add} alt="cruz" />
       </div>
       </div>
    );
};

export default HomeEmpty;