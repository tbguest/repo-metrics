import { useInput } from "../../hooks";
import styles from "./AddRepoForm.module.css";
import React, { useState } from "react";

type Props = {
  repoList: any;
  setRepoList: any;
};

const AddRepoForm = ({ repoList, setRepoList }: Props) => {
  const [owner, ownerInput] = useInput({ placeholder: "owner" });
  const [repo, repoInput] = useInput({ placeholder: "repo" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // validate the repo
    try {
      let res = await fetch(`/api/github-id?owner=${owner}&repo=${repo}`);
      let response = await res.json();

      const newRepoObject = {
        owner: owner,
        repo: repo,
        node_id: response.data.data.node_id,
      };

      setRepoList([...repoList, newRepoObject]);
      setStatus("success");
      console.log("success");
    } catch {
      console.log("ERROR");
      setStatus("failed");
    }
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
