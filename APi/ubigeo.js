import { API } from "../config";

export const getDepartments = () => {
  return fetch(`${API}/departament/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      //Authorization: token ? `Bearer ${token}` : '',
    },
  }).then((response) => response.json());
};

export const getProvinciasByDepartment = (departament) => {
  return fetch(`${API}/filterdepartment/${departament}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      //Authorization: token ? `Bearer ${token}` : '',
    },
  }).then((response) => response.json());
};

export const getDistrictsbyProvincia = (provincia) => {
  return fetch(`${API}/filterprovincia/${provincia}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      //Authorization: token ? `Bearer ${token}` : '',
    },
  }).then((response) => response.json());
};

export const getDistritsData = (department, provincia) => {
  let postData = {
    department,
    provincia,
  };

  let data = new FormData();

  Object.keys(postData).forEach((key) => {
    data.append(key, postData[key]);
  });

  return fetch(`${API}/filterdistrito`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      //Authorization: token ? `Bearer ${token}` : '',
    },
    body: data,
  }).then((response) => response.json());
};
