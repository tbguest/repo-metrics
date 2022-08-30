import React from "react";
import { useInput } from "../../hooks";
import styles from "./AddRepoForm.module.css";

type Props = {
  mutate: any;
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

const AddRepoForm = ({ mutate }: Props) => {
  const [owner, ownerInput] = useInput({ placeholder: "owner" });
  const [repo, repoInput] = useInput({ placeholder: "repo" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: validate the repo
    try {
      // we need the 'node_id' from the REST API for quickinteroperability btwn REST and graphql
      let res = await fetch(`/api/github-id?owner=${owner}&repo=${repo}`);
      let response = await res.json();

      const newRepoObject = {
        owner: owner,
        repo: repo,
        node_id: response.data.data.node_id,
      };

      const data = postDocument(newRepoObject);
      mutate();
    } catch {
      // render an indication that the attempt failed
      // setStatus("failed");
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
