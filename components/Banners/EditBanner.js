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
import useImageForm from "./userImageForm";
import { API } from "../../config";

const EditBanner = ({ banner }) => {
  const [token] = useState(getCookie("token"));
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(banner.title || "");
  const [url, setUrl] = useState(banner.link || "")

  const [experimentoCyber, imageExperimentInput, setInputFile] = useImageForm({
    placeholder: "Ingrese la imagen de la marca",
    name: "image",
    label: "Sube una imagen (Medida recomendada: 474x200px)",
    medida: "Medida recomendada:"
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const toggle = () => {
    //this.getUser();
    setModal(!modal);
  };

  useEffect(() => {
    setErrorMessage(false);
  }, [title, experimentoCyber]);

  const editBanner = async () => {
    if (title && experimentoCyber && url) {
      const data = {
        title,
        link: url,
        image: experimentoCyber //image
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
        await fetch(`${API}/bannersWasi/${banner._id}`, {
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

  React.useEffect(() => {
    const url_img = `https://wasipetapp.com/api/public/${banner.imagen}`;
    setInputFile(url_img);
  }, []);

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
              fullWidth
              id="title"
              label="Agregar el titulo del banner"
              name="title"
              type="text"
              autoFocus
              onChange={e => setTitle(e.target.value)}
              value={title}
              className="colorInputDisabled"
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="url"
              label="Agregar el url del banner"
              name="url"
              type="text"
              autoFocus
              onChange={e => setUrl(e.target.value)}
              value={url}
              className="colorInputDisabled"
            />
          </FormControl>

          <FormControl style={{ width: "100%" }}>
            {banner ? imageExperimentInput : null}
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
          <Button color="primary" onClick={() => editBanner()}>
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

export default EditBanner;
