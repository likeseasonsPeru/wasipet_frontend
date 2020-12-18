import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  TextField,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";
import { getCookie } from "../../utils/cookie";
import { API } from "../../config";

const EditMessage = ({ mensaje }) => {
  const [token] = useState(getCookie("token"));
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(mensaje.title || "");

  const [errorMessage, setErrorMessage] = useState(false);

  const toggle = () => {
    //this.getUser();
    setModal(!modal);
  };

  useEffect(() => {
    setErrorMessage(false);
  }, [title]);

  const editMessage = async () => {
    if (title) {
      const data = {
        title
      };
      try {
        var headers = {
          Authorization: "Bearer " + token
        };
        let dataToSend = new FormData();
        Object.keys(data).forEach(key => {
          console.log("Key->", key);
          dataToSend.append(key, data[key]);
        });
        // Where we're fetching data from
        await fetch(`${API}/mensaje/${mensaje._id}`, {
          method: "PUT",
          headers: headers,
          body: dataToSend
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data => {
            window.location.reload();
          });
      } catch (error) {
        console.log("unable -> error", error);
      }
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div>
      <Button color="info" onClick={() => toggle()}>
        Editar
      </Button>
      <Modal
        isOpen={modal}
        toggle={() => toggle()}
        style={{ marginTop: "90px" }}
      >
        <ModalHeader toggle={() => toggle()}>DATOS</ModalHeader>
        <ModalBody>
          <FormControl style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              margin="normal"
              autoComplete='off'
              fullWidth
              id="title"
              label="Modificar el contenido del mensaje"
              name="title"
              type="text"
              autoFocus
              onChange={e => setTitle(e.target.value)}
              value={title}
              className="colorInputDisabled"
            />
          </FormControl>

          {errorMessage && (
            <p
              style={{
                margin: "10px; 10px",
                textAlign: "center",
                color: "red"
              }}
            >
              Ingrese todos los campos
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editMessage()}>
            Guardar Cambios
          </Button>
          <Button color="secondary" onClick={() => toggle()}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditMessage;
