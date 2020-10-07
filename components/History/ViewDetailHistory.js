import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';

export default class LookHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        historialId: props.historialId,
        accionName: props.accionName,
        puntos: props.puntos,
        typeData: props.typeData,
        fecha: new Date(props.fecha),
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle =()=> {
    //this.getUser();
    this.setState({
        modal: !this.state.modal
      });
  }


  render() {
    return (

        <div>
            <Button color="info" onClick={this.toggle} >Ver Info</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} style={{marginTop:"90px"}}>
            <ModalHeader toggle={this.toggle}>DATOS</ModalHeader>
            <ModalBody>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="historialId"
                label="Código del Accion"
                name="historialId"
                type="text"
                autoFocus
                disabled
                value={this.state.historialId}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="accionName"
                label="Nombre de la Acción"
                name="accionName"
                type="text"
                autoFocus
                disabled
                value={this.state.accionName}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="puntos"
                label="Puntos"
                name="puntos"
                type="text"
                autoFocus
                disabled
                value={this.state.puntos}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="type_data"
                label="Tipo de acción"
                name="type_data"
                type="text"
                autoFocus
                disabled
                value={this.state.typeData}
                className="colorInputDisabled"
              />
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
                value={this.state.fecha}
                className="colorInputDisabled"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Cerrar</Button>
            </ModalFooter>
          </Modal>
            
        </div>
      
    );
  }
}