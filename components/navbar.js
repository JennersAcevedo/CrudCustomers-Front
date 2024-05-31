import styles from "@/styles/navbar.module.css";
import Link from "next/link";
import React from "react";
export default function Navbar() {
  return (
    <div className={styles.list}>
      <ul>
        <li>
          <Link id={styles.link} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link id={styles.link} href="https://github.com/JennersAcevedo">
            GitHub
          </Link>
        </li>
      </ul>
    </div>
  );
}
