import { useInput } from "../../hooks";
import styles from "./AddRepoForm.module.css";
import React, { useState } from "react";

type Props = {
  repoList: any;
  setRepoList: any;
};

type DocProps = {
  owner: String | JSX.Element;
  repo: String | JSX.Element;
  node_id: String;
};

const postDocument = async (document: DocProps) => {
  const response = await fetch("/api/repositories", {
    method: "POST",
    body: JSON.stringify({ document }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const { data } = await response.json();
  return data;
};

const AddRepoForm = ({ repoList, setRepoList }: Props) => {
  const [owner, ownerInput] = useInput({ placeholder: "owner" });
  const [repo, repoInput] = useInput({ placeholder: "repo" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: validate the repo
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

      // write to the DB
      try {
        const postedData = postDocument(newRepoObject);
        console.log("successfully wrote document to database");
      } catch {
        console.log("ERROR: document not written to database");
      }
    } catch {
      // render an indication that the attempt failed
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
