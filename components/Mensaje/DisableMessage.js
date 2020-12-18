import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { getCookie } from "../../utils/cookie";
import { API } from "../../config";
const useStyles = makeStyles(theme => ({
  disabledInput: {
    input: {
      color: "black"
    },
    label: {
      borderColor: "#3f51b5"
    }
  }
}));

const DisableMessage = ({ mensaje }) => {
  const classes = useStyles();
  const [modal, setModal] = React.useState(false);
  const [token] = useState(getCookie("token"));

  const toggle = () => {
    setModal(!modal);
  };
  const unable = async () => {
    try {
      var headers = {
        Authorization: "Bearer " + token
      };
      console.log(!mensaje.actived);
      var data = {
        actived: !mensaje.actived
      };
      console.log("unable -> data", data);
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
          console.log(data);
          window.location.reload();
        });
    } catch (error) {
      console.log("unable -> error", error);
    }
  };

  return (
    <React.Fragment>
      <Button
        color={mensaje && mensaje.actived != true ? "success" : "danger"}
        onClick={() => toggle()}
      >
        {mensaje && mensaje.actived == true ? "Desactivar" : "Activar"}
      </Button>
      <Modal isOpen={modal} toggle={toggle} style={{ marginTop: "90px" }}>
        <ModalHeader toggle={toggle}>
          {mensaje && mensaje.actived == true
            ? "¿Desea desactivar el mensage ?"
            : "¿Desea activar el mensage ?"}
        </ModalHeader>
        <ModalBody className="text-center">
          {mensaje ? (
            <h4>
              {mensaje.title} <br />
            </h4>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => unable()}>
            Confirmar
          </Button>
          <Button color="secondary" onClick={() => toggle()}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default DisableMessage;
