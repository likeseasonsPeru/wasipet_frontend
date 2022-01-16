import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  TextField,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { getCookie } from "../../../utils/cookie";
import useImageForm from "../userImageForm";
import { API } from "../../../config";
import { SELECT_OPTIONS } from "../../../utils/selectCategory";

const EditProductBusiness = ({ product, brands }) => {
  const [token] = useState(getCookie("token"));
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(product.name || '')
  const [brand, setBrand] = useState(product.brand || '')
  const [description, setDescription] = useState(product.description || '')
  const [petType, setPetType] = useState(product.petType || '')
  const [pointsTrade, setPointsTrade] = useState(product.pointsTrade || '')
  const [id] = useState(product._id || "");
  const [experimentoCyber, imageExperimentInput, setInputFile] = useImageForm({
    placeholder: "Ingrese la imagen del producto",
    name: "image",
    label: "Sube una imagen (Medida recomendada: 400x400px)",
    medida: "Medida recomendada:",
  });

  const [errorMessage, setErrorMessage] = useState(false);
  //Select Filtros
  const [category, setCategory] = useState(product.category || "");

  React.useEffect(() => {
    setErrorMessage(false);
  }, [
    name,
    brand,
    description,
    petType,
    pointsTrade,
    experimentoCyber,
    category,
  ]);

  const toggle = () => {
    //this.getUser();
    setModal(!modal);
  };

  const editProduct = async () => {
    if (
      name &&
      brand &&
      description &&
      petType &&
      pointsTrade &&
      experimentoCyber &&
      category
    ) {
      const data = {
        name,
        brand,
        active: product.active,
        description,
        petType,
        pointsTrade,
        image: experimentoCyber, //image
        category,
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
        await fetch(`${API}/product/business/${product._id}`, {
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

  React.useEffect(() => {
    const url_img = `https://wasipetapp.com/api/public/${product.type}`;
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
              id="name"
              label="Nombre del Producto"
              name="name"
              type="text"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="colorInputDisabled"
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <h6>Descripción del producto:</h6>
            <TextareaAutosize
              rowsMax={6}
              aria-label="maximum height"
              labelId="label-description"
              placeholder="Descripción"
              style={{ width: "100%" }}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormControl>
          <FormControl style={{ width: "100%", marginTop: "15px" }}>
            <InputLabel id="label-brand">Marca del producto</InputLabel>
            <Select
              value={brand}
              labelId="label-brand"
              onChange={(e) => setBrand(e.target.value)}
              displayEmpty
              style={{ width: "100%" }}
            >
              <MenuItem value="" disabled>
                Seleccione marca
              </MenuItem>
              {brands && brands.length
                ? brands.map((brand) => (
                    <MenuItem value={brand.name}>{brand.name}</MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <FormControl style={{ width: "100%", marginTop: "15px" }}>
            <InputLabel id="label-petType">Tipo de mascota</InputLabel>
            <Select
              value={petType}
              labelId="label-petType"
              onChange={(e) => setPetType(e.target.value)}
              displayEmpty
              style={{ width: "100%" }}
            >
              <MenuItem value="" disabled>
                Seleccione Tipo
              </MenuItem>
              <MenuItem value={"Dog"}>Perro</MenuItem>
              <MenuItem value={"Cat"}>Gato</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="pointsTrade"
              label="Costo del producto al canjear"
              name="pointsTrade"
              type="number"
              autoFocusz
              onChange={(e) => setPointsTrade(e.target.value)}
              value={pointsTrade}
              className="colorInputDisabled"
            />
          </FormControl>
          <FormControl style={{ width: "100%", marginTop: "15px" }}>
            <InputLabel id="label-category">Categoría del Producto</InputLabel>
            <Select
              value={category}
              labelId="label-category"
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              style={{ width: "100%" }}
            >
              <MenuItem value="" disabled>
                Seleccione la categoria
              </MenuItem>
              {SELECT_OPTIONS
                ? SELECT_OPTIONS.map((category) => (
                    <MenuItem value={category.name}>{category.name}</MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            {product ? imageExperimentInput : null}
          </FormControl>
          {errorMessage && (
            <p
              style={{
                margin: "10px; 10px",
                textAlign: "center",
                color: "red",
              }}
            >
              {" "}
              Ingrese todos los campos{" "}
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editProduct()}>
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

export default EditProductBusiness;
