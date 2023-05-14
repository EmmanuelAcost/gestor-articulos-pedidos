import React from 'react';
import './crearArticulo.css';
import { crearArticulos, editarArticulos } from '../../../services/articuloServices';
import { Modal, Button } from 'react-bootstrap';

const CrearArticulo = (props) => {
    const { nuevoArticulo, setNuevoArticulo, setShowModal, showModal, type, setType } = props

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoArticulo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === 'edit') {
            editarArticulos(nuevoArticulo.id, nuevoArticulo).then(response => {
                setNuevoArticulo({
                    referencia: '',
                    nombre: '',
                    precioSinImpuestos: ''
                });
                setShowModal(false)
            })
                .catch(error => {
                    console.log('Error al obtener los artículos:', error);
                });
        } else {
            crearArticulos(nuevoArticulo).then(response => {
                setNuevoArticulo({
                    referencia: '',
                    nombre: '',
                    precioSinImpuestos: ''
                });
                setShowModal(false)
            })
                .catch(error => {
                    console.log('Error al obtener los artículos:', error);
                });
        }

    };
    const handleCancelModal = () => {
        setType('');
        setShowModal(false);
        setNuevoArticulo({
            referencia: '',
            nombre: '',
            precioSinImpuestos: ''
        });
    }
    return (
        <Modal show={showModal} onHide={() => handleCancelModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{type === 'edit' ? "Editar" : type === 'view' ? "Ver" : "Crear"} Artículo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="crear-articulo">
                    <div className='d-grid'>
                        <label htmlFor="referencia">Referencia:</label>
                        <input
                            type="text"
                            id="referencia"
                            name="referencia"
                            value={nuevoArticulo.referencia}
                            onChange={handleInputChange}
                            disabled={type === 'view'}
                        />
                    </div>
                    <div className='d-grid'>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nuevoArticulo.nombre}
                            onChange={handleInputChange}
                            disabled={type === 'view'}
                        />
                    </div>
                    <div className='d-grid'>
                        <label htmlFor="precioSinImpuestos">Precio sin impuestos:</label>
                        <input
                            type="text"
                            id="precioSinImpuestos"
                            name="precioSinImpuestos"
                            value={nuevoArticulo.precioSinImpuestos}
                            onChange={handleInputChange}
                            disabled={type === 'view'}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCancelModal()}>
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

export default CrearArticulo;
