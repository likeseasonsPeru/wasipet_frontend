import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { getCookie } from "../../utils/cookie";
import { API } from "../../config";
import {
  getDepartments,
  getDistrictsbyProvincia,
  getDistritsData,
  getProvinciasByDepartment,
} from "../../APi/ubigeo";

const AddShop = () => {
  const [token] = useState(getCookie("token"));
  const [modal, setModal] = useState(false);
  // Selects
  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [distrits, setDistrits] = useState([]);
  // Values
  const [name, setName] = useState("");
  const [ruc, setRuc] = useState("");
  const [department, setDepartment] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [direction, setDirection] = useState("");

  const [errorMessage, setErrorMessage] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const fetchDepartments = async () => {
    const dataDepartments = await getDepartments();
    setDepartments(dataDepartments);
  };

  const fetchProvinces = async () => {
    const dataProvinces = await getProvinciasByDepartment(department);
    setProvinces(dataProvinces);
  };

  const fetchDistrits = async () => {
    const dataDistrits = await getDistritsData(department, province);
    setDistrits(
      dataDistrits.map((row) => ({
        label: row.Distrito,
        value: row.IdUbigeo,
      }))
    );
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (department && department !== "") {
      setProvinces([])
      setDistrits([])
      fetchProvinces();
    }
  }, [department]);

  useEffect(() => {
    if (province && province !== "") {
      setDistrits([])
      fetchDistrits();
    }
  }, [province]);

  useEffect(() => {
    setErrorMessage(false);
  }, [name, ruc, direction, department, province, district]);

  const addShop = async () => {
    if (name && ruc && direction && department && province && district) {
      const data = {
        name,
        ruc,
        direction,
        department,
        province,
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
        await fetch(`${API}/shop`, {
          method: "POST",
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
      <Button color="success" onClick={() => toggle()}>
        Agregar Tienda
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setRuc(e.target.value)}
              value={ruc}
              className="colorInputDisabled"
            />
          </FormControl>

          <FormControl
            style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
          >
            <InputLabel
              id="label-department"
              style={{ transform: "translate(0, 0px) scale(0.8)" }}
            >
              Departamento
            </InputLabel>

            <Select
              value={department}
              labelId="label-department"
              onChange={(e) => setDepartment(e.target.value)}
              displayEmpty
              style={{ width: "100%" }}
            >
              <MenuItem value="" disabled>
                Seleccione un departamento
              </MenuItem>
              {departments
                ? departments.map((row) => (
                    <MenuItem value={row}>{row}</MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>

          <FormControl
            style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
          >
            <InputLabel
              id="label-province"
              style={{ transform: "translate(0, 0px) scale(0.8)" }}
            >
              Provincia
            </InputLabel>

            <Select
              value={province}
              labelId="label-province"
              onChange={(e) => setProvince(e.target.value)}
              displayEmpty
              style={{ width: "100%" }}
            >
              <MenuItem value="" disabled>
                Seleccione una provincia
              </MenuItem>
              {provinces
                ? provinces.map((row) => <MenuItem value={row}>{row}</MenuItem>)
                : null}
            </Select>
          </FormControl>

          <FormControl
            style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
          >
            <InputLabel
              id="label-district"
              style={{ transform: "translate(0, 0px) scale(0.8)" }}
            >
              Distrito
            </InputLabel>

            <Select
              value={district}
              labelId="label-district"
              onChange={(e) => {
                console.log(e.target)
                setDistrict(e.target.value)
              }}
              displayEmpty
              style={{ width: "100%" }}
            >
              <MenuItem value="" disabled>
                Seleccione un distrito
              </MenuItem>
              {distrits
                ? distrits.map((row) => <MenuItem value={row.label}>{row.label}</MenuItem>)
                : null}
            </Select>
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
              onChange={(e) => setDirection(e.target.value)}
              value={direction}
              className="colorInputDisabled"
            />
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
          <Button color="primary" onClick={() => addShop()}>
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

export default AddShop;
