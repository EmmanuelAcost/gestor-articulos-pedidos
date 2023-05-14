import React from 'react';
import logo from '../../assets/img/logo-centribail-sticky.png';
import './header.css'
import i18next from 'i18next';
import { Link } from 'react-router-dom';

function Header() {
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        i18next.changeLanguage(selectedLanguage);
    };

    return (
        <header>
            <div className="logo-container">
                <Link to="/">
                    <img className='logo' src={logo} alt="Logo de la aplicación" />
                </Link>
            </div>
            <div className="language-select">
                <select onChange={handleLanguageChange}>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                </select>
            </div>
        </header>
    );
}

export default Header;
