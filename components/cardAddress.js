import React from "react";
import styles from "../styles/card.module.css";
import axios from "axios";

const CardAddress = ({id, line_1, line_2, line_3, state, city, country }) => {
  async function deleteAddress() {
    let url = `http://localhost:8080/api/customer/${id}/address`;
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
    .delete(url, config)
    .then( (response) => {
      location.reload();
    })
    .catch((err) => {
      alert("Datos Invalidos. Intente nuevamente");
    });
  };
  return (
    <div className={styles.card}>
      <div className={styles.lines}>
        <p>Line 1: {line_1}</p>
        <p>Line 2: {line_2}</p>
        <p>Line 3: {line_3}</p>
      </div>
      <div className={styles.location}>
        <p>State: {state}</p>
        <p>City: {city}</p>
        <p>Country: {country}</p>
      </div>
      <button className={styles.buttonDelete} onClick={deleteAddress}>Delete</button>
    </div>
  );
};

export default CardAddress;
