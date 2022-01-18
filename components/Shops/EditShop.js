import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TextField, FormControl } from "@material-ui/core";
import { getCookie } from "../../utils/cookie";
import { API } from "../../config";

const EditShop = ({ shop }) => {
  const [token] = useState(getCookie("token"));
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(shop.name || "");
  const [ruc, setRuc] = useState(shop.ruc || "");
  const [direction, setDirection] = useState(shop.direction || "");
  const [district, setDistrict] = useState(shop.district || "");

  const [errorMessage, setErrorMessage] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setErrorMessage(false);
  }, [name, ruc, direction, district]);

  const editShop = async () => {
    if (name && ruc && direction && district) {
      const data = {
        name,
        ruc,
        direction,
        district,
      };
      try {
        var headers = {
          Authorization: "Bearer " + token,
        };
        let dataToSend = new FormData();
        Object.keys(data).forEach((key) => {
          console.log("Key->", key);
          dataToSend.append(key, data[key]);
        });
        // Where we're fetching data from
        await fetch(`${API}/shop/${shop._id}`, {
          method: "PUT",
          headers: headers,
          body: dataToSend,
        })
          // We get the API response and receive data in JSON format...
          .then((response) => response.json())
          // ...then we update the users state
          .then((data) => {
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
      Editar Tienda
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
            fullWidth
            id="nombre"
            label="Nombre de la tienda"
            name="name"
            type="text"
            autoFocus
            onChange={e => setName(e.target.value)}
            value={name}
            className="colorInputDisabled"
          />
        </FormControl>
        <FormControl style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="ruc"
            label="Ruc de la tienda"
            name="ruc"
            type="text"
            autoFocus
            onChange={e => setRuc(e.target.value)}
            value={ruc}
            className="colorInputDisabled"
          />
        </FormControl>
        <FormControl style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="direccion"
            label="Dirección de la tienda"
            name="direccion"
            type="text"
            autoFocus
            onChange={e => setDirection(e.target.value)}
            value={direction}
            className="colorInputDisabled"
          />
        </FormControl>
        <FormControl style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="district"
            label="Distrito de la tienda"
            name="distrito"
            type="text"
            autoFocus
            onChange={e => setDistrict(e.target.value)}
            value={district}
            className="colorInputDisabled"
          />
        </FormControl>
        {errorMessage && <p style={{margin: '10px; 10px',  textAlign: "center", color: 'red' }}> Ingrese todos los campos </p>}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => editShop()}>
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

export default EditShop;
