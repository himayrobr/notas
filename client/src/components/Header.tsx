import React from 'react';
import search from '../assets/imagenes/search.png';
import info from '../assets/imagenes/info.svg';
import '../styles/components/Header.css';

const Header: React.FC = () => {
    return (
        <div className='contenedor'>
            <h4>Notes</h4>
            <div className='contenedor2'>
                <div className='img-wrapper'> {/* Contenedor para el botón de búsqueda */}
                    <img className='opcion' src={search} alt="Lupa" />
                </div>
                <div className='img-wrapper'> {/* Contenedor para el botón de información */}
                    <img className='opcion' src={info} alt="Info" />
                </div>
            </div>
        </div>
    );
};

export default Header;
