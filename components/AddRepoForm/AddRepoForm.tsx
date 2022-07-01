import { useInput } from "../../hooks";
import styles from "./AddRepoForm.module.css";

import React, { useState } from "react";

const AddRepoForm = ({ repositories }) => {
  const [owner, ownerInput] = useInput({ placeholder: "owner" });
  const [repo, repoInput] = useInput({ placeholder: "repo" });

  const [repoList, setRepoList] = useState(repositories);

  const [state, setState] = useState({
    owner: "",
    repo: "",
  });

  this.setState((prevState) => ({
    food: {
      ...prevState.food, // copy all other key-value pairs of food object
      pizza: {
        // specific object of food object
        ...prevState.food.pizza, // copy all pizza key-value pairs
        extraCheese: true, // update value of specific key
      },
    },
  }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("You have submitted the form.");

    // validate the repo

    const address = String(owner).concat("/", String(repo));
    console.log("address", address);

    // { owner: "solana-labs", repo: "solana" },
  };

  return (
    <>
      <div className={styles.container}>
        <h3>Add a new repo:</h3>
        <div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <span className={styles.inputs}>
              <label>{ownerInput}</label>
              {"/"}
              <label>{repoInput}</label>
            </span>
            <input type="submit" value="Submit" className={styles.button} />
          </form>
        </div>
      </div>
    </>
  );
};

export { AddRepoForm };
