import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  disabledInput: {
   'input':{
     color: 'black',
   },
   'label':{
     borderColor:'#3f51b5',
   }
  },
}));

 const LookPet = ({name, photo, age, sex, owner, breed, fecha}) => {
    const classes = useStyles();
    const [modal, setModal] = React.useState(false)


  const toggle = ()=> {
    setModal(!modal)
  }

  return (
    <React.Fragment>
        <Button color="info" onClick={() => toggle()} >Ver Info</Button>
        <Modal isOpen={modal} toggle={toggle} style={{marginTop:"90px"}}>
        <ModalHeader toggle={toggle}>DATOS</ModalHeader>
        <ModalBody>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth="true"
            id="photo"
            label="Puntos total acumulados"
            name="photo"
            type="text"
            autoFocus
            disabled
            value={photo}
            className={classes.disabledInput}
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
            value={name}
            className={classes.disabledInput}
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
            value={age}
            className={classes.disabledInput}
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
            value={sex}
            className={classes.disabledInput}
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
            value={owner}
            className={classes.disabledInput}
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
            value={breed}
            className={classes.disabledInput}
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
            value={fecha}
            className={classes.disabledInput}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle()}>Cerrar</Button>
        </ModalFooter>
      </Modal>
        
    </React.Fragment>
);
}

export default LookPet;