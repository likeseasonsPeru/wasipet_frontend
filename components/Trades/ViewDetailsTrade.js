import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';

export default class LookTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        tradecode: props.tradecode,
        codeuser: props.codeuser,
        storecode: props.storecode,
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
                id="tradecode"
                label="Código del Canje"
                name="tradecode"
                type="text"
                autoFocus
                disabled
                value={this.state.tradecode}
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
                value={this.state.codeuser}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="storecode"
                label="Código de Tienda"
                name="storecode"
                type="text"
                autoFocus
                disabled
                value={this.state.storecode}
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
                value={new Date(this.state.fecha).toLocaleString('es-PE')}
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