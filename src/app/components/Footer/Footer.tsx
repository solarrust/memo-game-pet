import React from "react";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="">
        Made for fun by{" "}
        <a href="https://github.com/solarrust/memo-game-pet" className="">
          Alёna Batitskaia
        </a>
      </div>
    </footer>
  );
}
