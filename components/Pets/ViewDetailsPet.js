import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import './Pets.css';

export default class LookPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        name: props.name,
        photo: props.photo,
        age: props.age,
        sex: props.sex,
        owner: props.owner,
        breed: props.breed,
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
                id="photo"
                label="Puntos total acumulados"
                name="photo"
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
                id="age"
                label="Edad"
                name="age"
                type="text"
                autoFocus
                disabled
                value={this.state.age}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="sex"
                label="Género"
                name="sex"
                type="text"
                autoFocus
                disabled
                value={this.state.sex}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="owner"
                label="Código del dueño"
                name="owner"
                type="text"
                autoFocus
                disabled
                value={this.state.owner}
                className="colorInputDisabled"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="breed"
                label="Raza"
                name="breed"
                type="text"
                autoFocus
                disabled
                value={this.state.breed}
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