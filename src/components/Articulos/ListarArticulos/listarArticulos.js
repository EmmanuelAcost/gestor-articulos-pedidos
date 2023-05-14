import React, { useEffect, useState } from 'react';
import './listarArticulos.css';
import CrearArticulo from '../CrearArticulos/crearArticulo';
import { FaAngleLeft, FaCog } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { eliminarArticulos, getArticulos } from '../../../services/articuloServices';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Articulos = () => {
  const [t] = useTranslation("global");
  const [articulos, setArticulos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('');
  const [activeTooltip, setActiveTooltip] = useState(null);

  const [nuevoArticulo, setNuevoArticulo] = useState({
    referencia: '',
    nombre: '',
    precioSinImpuestos: ''
  });

  useEffect(() => {
    fetchArticulos();
  }, [nuevoArticulo]);

  const fetchArticulos = () => {
    getArticulos().then(response => {
      setArticulos(response);
    })
      .catch(error => {
        console.log('Error al obtener los artículos:', error);
      });
  };
  const handleEdit = (element) => {
    setType('edit');
    setNuevoArticulo(element)
    setShowModal(true)
  };
  const handleView = (element) => {
    setType('view');
    setNuevoArticulo(element)
    setShowModal(true)
  };
  const handleDelete = (element) => {
    eliminarArticulos(element).then(response => {
      console.log(`response: ${response}`);
      fetchArticulos();
    })
      .catch(error => {
        console.log('Error al obtener los artículos:', error);
      });
  }

  return (
    <div className="articulos-page">
      <div className="articulos-header">
        <h1 className="articulos-title">
          <Link className='btn-back' to="/">
            <FaAngleLeft className="actions-icon" />
          </Link>
          {t("listarArticulos.titulo")} 
        </h1>
        <button className="crear-articulo-button" onClick={() => setShowModal(true)}>
        {t("listarArticulos.crearArticulo")} 
        </button>
      </div>
      <CrearArticulo showModal={showModal} setShowModal={setShowModal} nuevoArticulo={nuevoArticulo} setNuevoArticulo={setNuevoArticulo} type={type} setType={setType} />
      <table className="articulos-table">
        <thead>
          <tr>
            <th>{t("columnasArticulos.ref")}</th>
            <th>{t("columnasArticulos.nombre")}</th>
            <th>{t("columnasArticulos.precioSinImpuestos")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {articulos.map((articulo) => (
            <tr key={articulo.id}>
              <td>{articulo.referencia}</td>
              <td>{articulo.nombre}</td>
              <td>{articulo.precioSinImpuestos}</td>
              <td>
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  offset={[10, 0]}
                  show={activeTooltip === articulo.id}
                  overlay={
                    <Tooltip id={`actions-tooltip-${articulo.id}`} key={articulo.id}>
                      <div className='d-grid h-100 w-100'>
                        <div onClick={() => handleView(articulo)}>{t("acciones.verDetalle")}</div>
                        <div onClick={() => handleEdit(articulo)}>{t("acciones.editar")}</div>
                        <div onClick={() => handleDelete(articulo.id)}>{t("acciones.eliminar")}</div>
                      </div>
                    </Tooltip>
                  }
                >
                  <div className='position-relative' >
                    <FaCog onClick={() => setActiveTooltip(activeTooltip === articulo.id ? null : articulo.id)} className="actions-icon" />
                  </div>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Articulos;