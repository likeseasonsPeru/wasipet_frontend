import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  TextField,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { getCookie } from "../../utils/cookie";
import useImageForm from "./userImageForm";
import { API } from "../../config";
import { SELECT_OPTIONS_SERVICES } from "../../utils/selectCategory";

const EditService = ({ stores, service }) => {
  const [token] = useState(getCookie("token"));
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(service.name || "");
  const [description, setDescription] = useState(service.description || "");
  const [category, setCategory] = useState(service.category || "");
  const [storesData, setStoresData] = useState(
    service.stores.map((s) => ({
      id: s._id,
      shop: s.store,
      points: s.pointsValue,
      fromServer: true,
    })) || []
  );

  // shop adding
  const [inAdding, setInAdding] = useState(false);
  const [currentShop, setCurrentShop] = useState({
    id: "",
    shop: "",
    points: "",
  });

  const [experimentoCyber, imageExperimentInput, setInputFile] = useImageForm({
    placeholder: "Ingrese la imagen del producto",
    name: "image",
    label: "Sube una imagen (Medida recomendada: 400x400px)",
    medida: "Medida recomendada:",
  });

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setErrorMessage(false);
  }, [name, description, /* petType, category, */ stores, currentShop]);

  const toggle = () => {
    setModal(!modal);
  };

  const editService = async () => {
    if (
      name &&
      description &&
      /* category && */
      experimentoCyber &&
      storesData.length !== 0
    ) {
      const data = {
        name,
        description,
        active: false,
        description,
        /* category, */
        image: experimentoCyber,
        stores: JSON.stringify(
          storesData.map((s) => {
            return {
              store: s.shop,
              pointsValue: Number(s.points),
            };
          })
        ),
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

        console.log(data);
        await fetch(`${API}/service/${service._id}`, {
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

  const findStoreByStoreId = (storeId) => {
    return stores.find((row) => row._id === storeId);
  };

  const cancelAddStores = () => {
    setInAdding(false);
    setCurrentShop({ shop: "", points: "" });
  };

  const addStores = () => {
    if (currentShop.points && currentShop.shop) {
      setStoresData([
        ...storesData,
        {
          ...currentShop,
          id: Math.random().toString(),
        },
      ]);
      setCurrentShop({ shop: "", points: "" });
    } else {
      setErrorMessage(true);
    }
  };

  const removeStore = (idStore) => {
    setStoresData(storesData.filter((s) => s.id !== idStore));
  };

  useEffect(() => {
    const url_img = `https://wasipetapp.com/api/public/${service.photo}`
    setInputFile(url_img);
  }, [])

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
              label="Nombre del servicio"
              name="name"
              type="text"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="colorInputDisabled"
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <h6>Descripción del servicio:</h6>
            <TextareaAutosize
              rowsMax={6}
              aria-label="maximum height"
              labelId="label-description"
              placeholder="Descripción"
              style={{ width: "100%", height: "110px", padding: "10px" }}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormControl>
          {/* <FormControl
            style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
          >
            <InputLabel
              id="label-category"
              style={{ transform: "translate(0, 0px) scale(0.8)" }}
            >
              Categoría del servicio
            </InputLabel>
            <Select
              value={category}
              labelId="label-category"
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              style={{ width: "100%" }}
            >
              <MenuItem value="" disabled>
                Seleccione categoria
              </MenuItem>
              {SELECT_OPTIONS_SERVICES
                ? SELECT_OPTIONS_SERVICES.map((category) => (
                    <MenuItem value={category.name}>{category.name}</MenuItem>
                  ))
                : null}
            </Select>
          </FormControl> */}
          <FormControl style={{ width: "100%", marginTop: "15px" }}>
            {service ? imageExperimentInput : null}
          </FormControl>
          {storesData.length > 0 && (
            <h6 style={{ marginTop: "15px" }}>Tiendas :</h6>
          )}
          {storesData.map((s) => (
            <Card>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Typography
                  sx={{ fontSize: 15 }}
                  color="text.primary"
                  gutterBottom
                >
                { findStoreByStoreId(s.shop)?.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 15 }}
                  color="text.primary"
                  gutterBottom
                >
                  {s.points} puntos
                </Typography>
                <Button color="danger" onClick={() => removeStore(s.id)}>
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          ))}
          <FormControl
            style={{ alignItems: "center", width: "100%", marginTop: "15px" }}
          >
            <Button color="success" onClick={() => setInAdding(true)}>
              Agregar Tienda
            </Button>
          </FormControl>
          {inAdding && (
            <>
              <FormControl
                style={{
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <InputLabel
                  id="label-category"
                  style={{ transform: "translate(0, 0px) scale(0.8)" }}
                >
                  Tienda del servicio
                </InputLabel>
                <Select
                  value={currentShop.shop}
                  labelId="label-category"
                  onChange={(e) =>
                    setCurrentShop({ ...currentShop, shop: e.target.value })
                  }
                  displayEmpty
                  style={{ width: "100%" }}
                >
                  <MenuItem value="" disabled>
                    Seleccione tienda
                  </MenuItem>
                  {stores && stores.length
                    ? stores.map((store) => (
                        <MenuItem value={store._id}>{store.name}</MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="pointsTrade"
                  label="Costo del servicio al canjear en la tienda"
                  name="pointsTrade"
                  type="number"
                  autoFocus
                  onChange={(e) =>
                    setCurrentShop({ ...currentShop, points: e.target.value })
                  }
                  value={currentShop.points}
                  className="colorInputDisabled"
                />
              </FormControl>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <Button color="info" onClick={addStores}>
                  Agregar
                </Button>
                <Button color="secondary" onClick={cancelAddStores}>
                  Cancelar
                </Button>
              </div>
            </>
          )}
          {errorMessage && (
            <p
              style={{
                margin: "20px; 20px",
                marginTop: "20px",
                textAlign: "center",
                color: "red",
              }}
            >
              {inAdding
                ? "Ingrese todos los campos para agregar la tienda"
                : "Ingrese todos los campos"}
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editService()}>
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

export default EditService;
