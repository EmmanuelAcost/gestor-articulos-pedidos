import React, { useEffect, useState } from 'react';
import './pedidos.css';
import CrearPedido from '../CrearPedidos/crearPedidos';
import { FaAngleLeft, FaCog } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { eliminarPedido, getPedidos } from '../../../services/pedidoServices';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Articulos = () => {
  const [t] = useTranslation("global");
  const [pedidos, setPedidos] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('');
  const [activeTooltip, setActiveTooltip] = useState(null);

  const [nuevoPedido, setNuevoPedido] = useState({
    items: [],
    precioTotalSinImpuestos: '',
    precioTotalConImpuestos: '',
  });

  useEffect(() => {
    fetchPedido();
  }, [nuevoPedido]);

  const fetchPedido = () => {
    getPedidos().then(response => {
      console.log(response)
      setPedidos(response);
    })
      .catch(error => {
        console.log('Error al obtener los artículos:', error);
      });
  };
  const handleEdit = (element) => {
    setType('edit');
    setNuevoPedido(element)
    setShowModal(true)
  };
  const handleView = (element) => {
    setType('view');
    setNuevoPedido(element)
    setShowModal(true)
  };
  const handleDelete = (element) => {
    eliminarPedido(element).then(response => {
      console.log(`response: ${response}`);
      fetchPedido();
    })
      .catch(error => {
        console.log('Error al obtener los artículos:', error);
      });
  }

  return (
    <div className="pedidos-page">
      <div className="pedidos-header">
        <h1 className="pedidos-title">
          <Link className='btn-back' to="/">
            <FaAngleLeft className="actions-icon" />
          </Link>
          {t("listarPedidos.titulo")}
        </h1>
        <button className="crear-articulo-button" onClick={() => setShowModal(true)}>
          {t("listarPedidos.crearPedido")} 
        </button>
      </div>
      <CrearPedido showModal={showModal} setShowModal={setShowModal} articulos={articulos} setArticulos={setArticulos} nuevoPedido={nuevoPedido} setNuevoPedido={setNuevoPedido} type={type} setType={setType} />
      <table className="pedidos-table">
        <thead>
          <tr>
            <th>{t("columnasPedidos.id")}</th>
            <th>{t("columnasPedidos.articulos")}</th>
            <th>{t("columnasPedidos.precioTotalSinImpuestos")}</th>
            <th>{t("columnasPedidos.precioTotalConImpuestos")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.items.length}</td>
              <td>{pedido.precioTotalSinImpuestos}</td>
              <td>{pedido.precioTotalConImpuestos}</td>
              <td>
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  offset={[10, 0]}
                  show={activeTooltip === pedido.id}
                  overlay={
                    <Tooltip id={`actions-tooltip-${pedido.id}`} key={pedido.id}>
                      <div className='d-grid h-100 w-100'>
                        <div onClick={() => handleView(pedido)}>{t("acciones.verDetalle")}</div>
                        <div onClick={() => handleEdit(pedido)}>{t("acciones.editar")}</div>
                        <div onClick={() => handleDelete(pedido.id)}>{t("acciones.eliminar")}</div>
                      </div>
                    </Tooltip>
                  }
                >
                  <div className='position-relative' >
                    <FaCog onClick={() => setActiveTooltip(activeTooltip === pedido.id ? null : pedido.id)} className="actions-icon" />
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