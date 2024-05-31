"use client";
import CardCustomer from "@/components/cardCustomer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "@/styles/home.module.css";
import Navbar from "@/components/navbar";

export default function Home() {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8080/api/customer");
        setCustomer(result.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!customer.length) {
    return <div>No hay clientes disponibles.</div>;
  }
  function containsLetters(str) {
    const regex = /[a-zA-Z]/;
    return regex.test(str);
  }

  async function addCustomer() {
    let url = "http://localhost:8080/api/customer/add";
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let payload = {
      name: name,
      company_id: 1,
      phone: phone,
    };
    if (containsLetters(name) && containsLetters(phone)) {
      await axios
        .post(url, payload, config)
        .then(async (response) => {
          location.reload();
        })
        .catch((err) => {
          alert("Datos Invalidos. Intente nuevamente");
        });
    } else {
      alert("Error en los datos ingresados");
      setName("")
      setPhone("")
    }
  }

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.cards}>
          Customers
          {customer.map((card) => (
            <CardCustomer key={card.id} {...card} />
          ))}
        </div>
        <div className={styles.form}>
          Add a new Customer
          <form>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              className={styles.forminput}
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="phone"
              id="name"
              name="name"
              className={styles.forminput}
            />
          </form>
          <button
            className={styles.formbutton}
            onClick={addCustomer}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
