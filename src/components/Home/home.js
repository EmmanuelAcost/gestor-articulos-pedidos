import React from 'react';
import Card from '../Card/card';
import './home.css';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [t] = useTranslation("global");
    return (
        <div className="home-page">
          <h1> {t("home.titulo")}</h1>
          <div className="card-container">
            <Card
              icon="fa fa-shopping-cart"
              title={t("home.btnPedido")}
              to="/pedidos"
            />
            <Card
              icon="fa fa-list"
              title={t("home.btnArticulo")}
              to="/articulos"
            />
          </div>
        </div>
      );
};

export default Home;