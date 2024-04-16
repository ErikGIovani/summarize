import { useState } from "react";
import type { SyntheticEvent } from "react";

import styles from "./form.module.css";
import { useData } from "../hooks/data";

export function Form() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const setData = useData((state) => state.setData);
  const clearData = useData((state) => state.clearData);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    clearData();

    const url = e.currentTarget.url.value;
    const pattern = /^(https?:\/\/(?:[\w-]+\.)+[\w]+(?:\/[\w-./?%&=]*)?)$/;

    if (!url) {
      setMessage("The form cannot be empty");
      return;
    }

    if (!url.match(pattern)) {
      setMessage("Please enter a valid url");
      return;
    }

    setLoading(true);

    fetch(`${import.meta.env.VITE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          setMessage("Something went wrong");
          return;
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  return (
    <div className={styles.form__container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="url" placeholder="Please enter a url" />
        <button type="submit">Submit</button>
      </form>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <p className="error">{message}</p>
      )}
    </div>
  );
}
