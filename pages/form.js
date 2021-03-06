import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Form.module.css";

function resolveEmptyFields(form) {
  const missing = [];

  // Push field name to missing array if
  // the field's value is an empty string
  for (const field of form) {
    if (field.value !== "") continue;
    missing.push(field.name);
  }

  return missing;
}

export default function Form() {
  const [error, setError] = useState();

  function handleSubmit(event) {
    // Prevent default form action
    event.preventDefault();

    // Check for empty fields
    let missing = resolveEmptyFields(event.target);
    if (missing.length > 0) {
      setError("Empty field(s): " + missing.join(", "));
      return;
    } else {
      setError(null);
    }

    // Parse form data
    const data = new FormData(event.target);
    const jsonData = Object.fromEntries(data);

    // Print data to console
    console.log("Form data: " + JSON.stringify(jsonData));

    // Post the data to a mock API endpoint
    fetch("/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
  }

  return (
    <div>
      <Head>
        <title>Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Sample Form</h1>
        <form id="name-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" />
          </div>

          {error && (
            <p id="error-box" className={styles.errorBox}>
              {error}
            </p>
          )}
          <input type="submit" value="Submit" />
        </form>
      </main>
    </div>
  );
}
