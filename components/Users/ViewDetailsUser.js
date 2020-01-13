import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import './Users.css';

export default class LookUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        name: props.name,
        points: props.points,
        type: props.type,
        phone: props.phone,
        photo: props.photo,
        email: props.email,
        user_id: props.user_id,
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
                  id="imagen"
                  label="Imagen"
                  name="imagen"
                  type="text"
                  autoFocus
                  disabled
                  value={this.state.photo}
                  className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Nombres y Apellidos"
                name="name"
                type="name"
                autoFocus
                disabled
                value={this.state.name}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="code"
                label="Código de Referido"
                name="text"
                type="text"
                autoFocus
                disabled
                value={this.state.user_id}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="points"
                label="Puntos total acumulados"
                name="points"
                type="points"
                autoFocus
                disabled
                value={this.state.points}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="type"
                label="Tipo de Usuario"
                name="type"
                type="type"
                autoFocus
                disabled
                value={this.state.type}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="phone"
                label="Celular"
                name="phone"
                type="phone"
                autoFocus
                disabled
                value={this.state.phone}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                type="email"
                autoFocus
                disabled
                value={this.state.email}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="fecha"
                label="Fecha de Registro"
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