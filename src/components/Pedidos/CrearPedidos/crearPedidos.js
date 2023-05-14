import React, {  useEffect } from 'react';
import './crearPedidos.css';
import { Modal, Button } from 'react-bootstrap';
import { crearPedido, editarPedido } from '../../../services/pedidoServices';

const CrearPedido = (props) => {
  const { articulos,setArticulos,nuevoPedido, setNuevoPedido, setShowModal, showModal, type, setType } = props
 
console.log(nuevoPedido,"nuevo pedido")

  useEffect(() => {
    fetch('http://localhost:3001/articulos')
      .then((response) => response.json())
      .then((data) => setArticulos(data))
      .catch((error) => console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoPedido({ ...nuevoPedido, [name]: value });
  };
  const handleArticuloChange = (event, index) => {
    const { value } = event.target;
    const updatedArticulos = [...nuevoPedido.items];
    updatedArticulos[index].referencia = value;
    setNuevoPedido({ ...nuevoPedido, items: updatedArticulos });
  };
  const handleCantidadChange = (event, index) => {
    const { value } = event.target;
    const updatedArticulos = [...nuevoPedido.items];
    updatedArticulos[index].cantidad = value;
    setNuevoPedido({ ...nuevoPedido, items: updatedArticulos });
  };
  const handleAgregarArticulo = () => {
    const nuevoArticulo = { referencia: '', cantidad: '' };
    setNuevoPedido({ ...nuevoPedido, items: [...nuevoPedido.items, nuevoArticulo] });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (type === 'edit') {
      editarPedido(nuevoPedido.id, nuevoPedido).then(response => {
        setNuevoPedido({
          items: [],
          precioTotalSinImpuestos: '',
          precioTotalConImpuestos: '',
        });
          setShowModal(false)
      })
          .catch(error => {
              console.log('Error al obtener los artículos:', error);
          });
  } else {
      crearPedido(nuevoPedido).then(response => {
        setNuevoPedido({
          items: [],
          precioTotalSinImpuestos: '',
          precioTotalConImpuestos: '',
        });
          setShowModal(false)
      })
          .catch(error => {
              console.log('Error al obtener los artículos:', error);
          });
  }

  };
  const resetModal = () => {
    setShowModal(false);
    setType('');
    setNuevoPedido({
      items: [],
      precioTotalSinImpuestos: '',
      precioTotalConImpuestos: '',
    });
  }
  return (
    <Modal show={showModal} onHide={() => { resetModal() }}>
      <Modal.Header closeButton>
        <Modal.Title>{type === 'edit' ? "Editar" : type === 'view' ? "Ver" : "Crear"} Artículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="crear-pedido-container">
          {nuevoPedido.items.map((articulo, index) => (
            <div key={index} className='camp-select'>
              <div>
                <label>Seleccionar artículo:</label>
                <select
                  name="articulo"
                  value={articulo.referencia}
                  onChange={(event) => handleArticuloChange(event, index)}
                  disabled={type === 'view'}
                >
                  <option value="">Seleccione un artículo</option>
                  {articulos.map((articulo) => (
                    <option key={articulo.referencia} value={articulo.referencia}>
                      {articulo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Seleccionar artículo:</label>
                <input
                  placeholder='Cantidad'
                  type="number"
                  name="cantidad"
                  value={articulo.cantidad}
                  onChange={(event) => handleCantidadChange(event, index)}
                  disabled={type === 'view'}
                />
              </div>
            </div>
          ))}
          {type === 'view' ? null : (
            <button type="button" onClick={handleAgregarArticulo}>
              Agregar Artículo
            </button>)}
          <div className='price'>
            <label>Precio total sin impuestos:</label>
            <input
              type="number"
              name="precioTotalSinImpuestos"
              value={nuevoPedido.precioTotalSinImpuestos}
              onChange={handleInputChange}
              disabled={type === 'view'}
            />
          </div>
          <div className='price'>
            <label>Precio total con impuestos:</label>
            <input
              type="number"
              name="precioTotalConImpuestos"
              value={nuevoPedido.precioTotalConImpuestos}
              onChange={handleInputChange}
              disabled={type === 'view'}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => resetModal()}>
          Cancelar
        </Button>
        {type === 'view' ? null : (
          <Button variant="primary" onClick={handleSubmit} disabled={type === 'view'}>
            {type === 'edit' ? "Editar" : "Crear"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>

  );
};

export default CrearPedido;
