import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { getCookie } from "../../utils/cookie";
import { API } from "../../config";

const RemoveBanner = ({ banner }) => {
  const [token] = useState(getCookie("token"));

  const removeBanner = async () => {
      try {
        var headers = {
          Authorization: "Bearer " + token
        };
        // Where we're fetching data from
        await fetch(`${API}/bannersWasi/${banner._id}`, {
          method: "DELETE",
          headers: headers,
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
  };

  return (
    <div>
      <Button color="danger" onClick={() => removeBanner()}>
        Eliminar
      </Button>
    </div>
  );
};

export default RemoveBanner;
