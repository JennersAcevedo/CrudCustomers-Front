"use client";
import CardAddress from "@/components/cardAddress";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/styles/customers.module.css";
import Navbar from "@/components/navbar";

export default function Customers(props) {
  const [id, setId] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (props.searchParams.id) {
        setId(props.searchParams.id);

        let url = `http://localhost:8080/api/customer/${props.searchParams.id}`;
        try {
          const result = await axios.get(url);
          if (Array.isArray(result.data.addresses)) {
            setAddress(result.data.addresses);
            setCustomer(result.data);
          } else {
            console.error("Expected an array but got:", result.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [props.searchParams.id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!id) {
    return <div>No se encontró el ID del cliente.</div>;
  }
  async function addAddress() {
    let url = "http://localhost:8080/api/customer/add/address";
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let payload = {
      line_1: line1,
      line_2: line2,
      line_3: line3,
      state: state,
      city: city,
      country: country,
      reference_type: 70,
      reference_id: id,
    };
    await axios
      .post(url, payload, config)
      .then(async (response) => {
        location.reload();
      })
      .catch((err) => {
        alert("Datos Invalidos. Intente nuevamente");
        setLine1("");
        setLine2("");
        setLine3("");
        setState("");
        setCity("");
        setCountry("");
      });
  }
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.details}>
        <h1>Detalle del Cliente</h1>
        <p>Customer ID: {id}</p>
        <p>Customer Name: {customer["name"]}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.cards}>
          {address.map((card) => (
            <CardAddress key={card.id} {...card} />
          ))}
        </div>
        <div className={styles.form}>
          Add a new address
          <form>
            <input
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              type="text"
              placeholder="line 1"
              id="line1"
              name="line1"
              className={styles.forminput}
            />

            <input
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              type="text"
              placeholder="line 2"
              id="line2"
              name="line2"
              className={styles.forminput}
            />
            <input
              value={line3}
              onChange={(e) => setLine3(e.target.value)}
              type="text"
              placeholder="line 3 (optional)"
              id="line3"
              name="line3"
              className={styles.forminput}
            />

            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
              placeholder="state"
              id="state"
              name="state"
              className={styles.forminput}
            />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="city"
              id="city"
              name="city"
              className={styles.forminput}
            />

            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              placeholder="country"
              id="country"
              name="country"
              className={styles.forminput}
            />
          </form>
          <button
            className={styles.formbutton}
            onClick={addAddress}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
