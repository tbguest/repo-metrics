import React, { useState } from "react";
import { useInput } from "../../hooks";
import { addRepoToDocument } from "../../db/updateDocument";
import styles from "./AddRepoForm.module.css";
import { useSession } from "next-auth/react";
import { KeyedMutator } from "swr";
import { RepoData } from "../../models";

type Props = {
  data: RepoData[];
  mutate: KeyedMutator<RepoData[]>;
};

const AddRepoForm = ({ data, mutate }: Props) => {
  const { data: session } = useSession();
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

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
        addRepoToDocument(repoObj, session);
        mutate();
      }

      setOwner("");
      setRepo("");
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
              <label>
                <input
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="owner"
                />
              </label>
              {"/"}
              <label>
                <input
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="repo"
                />
              </label>
            </span>
            <input type="submit" value="Add" className={styles.button} />
          </form>
        </div>
      </div>
    </>
  );
};

export { AddRepoForm };
