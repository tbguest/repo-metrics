import React from "react";
import { useInput } from "../../hooks";
import styles from "./AddRepoForm.module.css";

type Props = {
  session: any;
  data: number;
  mutateData: number;
};

type DocProps = {
  owner: String | JSX.Element;
  repo: String | JSX.Element;
  node_id: String;
};

// needs to be PATCH
const updateDocument = async (document: DocProps, session) => {
  const response = await fetch(`/api/user/repos?id=${session?.userId}`, {
    method: "PATCH",
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

const AddRepoForm = ({ session, data, mutate }) => {
  const [owner, ownerInput] = useInput({ placeholder: "owner" });
  const [repo, repoInput] = useInput({ placeholder: "repo" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: validate the repo
    try {
      // get the repo data to add to the card
      let res = await fetch(`/api/repo-data?owner=${owner}&repo=${repo}`);
      let obj = await res.json();

      // and this needs to trigger an api call to fetch the rest of the data
      mutate([...data, obj], false);

      const repoObj = {
        owner: owner,
        repo: repo,
        id: obj.id,
      };

      if (session) {
        updateDocument(repoObj, session);
        mutate();
      }
    } catch {
      // render an indication that the attempt failed
      console.log("Failed to add repo.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h3>Add a new repo:</h3>
        <div>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className={styles.form}
          >
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
