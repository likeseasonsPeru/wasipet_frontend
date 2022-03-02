import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';

const ViewDetailsTradeBusiness = ({tradecode, codeuser, storecode, fecha}) => {

    const [modal, setModal] = useState(false)
    const [tradeCode, setTradeCode] = useState(tradecode)
    const [codeUser, setcodeUser] = useState(codeuser)
    const [storeCode, setStoreCode] = useState(storecode)
    const [currentFecha, setCurrentFecha] = useState(new Date(fecha))

    const toggle = () => {
        setModal(!modal)
    }

    return (
        <div>
        <Button color="info" onClick={toggle} >Ver Info</Button>
        <Modal isOpen={modal} toggle={toggle} style={{marginTop:"90px"}}>
        <ModalHeader toggle={toggle}>DATOS</ModalHeader>
        <ModalBody>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="tradecode"
            label="Código del Canje"
            name="tradecode"
            type="text"
            autoFocus
            disabled
            value={tradeCode}
            className="colorInputDisabled"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="codeuser"
            label="Código de Usuario"
            name="codeuser"
            type="text"
            autoFocus
            disabled
            value={codeUser}
            className="colorInputDisabled"
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="storecode"
            label="Código de Tienda"
            name="storecode"
            type="text"
            autoFocus
            disabled
            value={storeCode}
            className="colorInputDisabled"
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="fecha"
            label="Fecha de Creación"
            name="fecha"
            type="text"
            autoFocus
            disabled
            value={new Date(currentFecha).toLocaleString('es-PE')}
            className="colorInputDisabled"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cerrar</Button>
        </ModalFooter>
      </Modal>
        
    </div>
    )
}

export default ViewDetailsTradeBusiness
