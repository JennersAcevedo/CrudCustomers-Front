// 'use client'
import React from "react";
import styles from "../styles/card.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const CardCustomer = ({ id, name, phone }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/customers?id=${id}`);
  };
  async function deleteCustomer() {
    let url = `http://localhost:8080/api/customer/${id}`;
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .delete(url, config)
      .then((response) => {
        location.reload();
      })
      .catch((err) => {
        console.log(err)
        alert("Datos Invalidos. Intente nuevamente");
      });
  }
  return (
    <div className={styles.card}s>
      <div  onClick={handleClick}>
        <p>ID: {id}</p>
        <p>Name: {name}</p>
        <p>Phone: {phone}</p>
      </div>
      <button className={styles.buttonDelete} onClick={deleteCustomer}>Delete</button>
    </div>
  );
};

export default CardCustomer;
