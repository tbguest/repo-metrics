import React, { useState } from "react";
import { addRepoToDocument } from "../../db/updateDocument";
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
        addRepoToDocument(repoObj, session.user.id);
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
      <div className="flex flex-col">
        <h3 className="font-bold text-lg mb-8">Add a repo:</h3>
        <div>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="flex flex-col"
          >
            <span className="flex items-center break-words flex-wrap">
              <label>
                <input
                  className="rounded m-1 px-[2px] text-black "
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="owner"
                />
              </label>
              <p>{" / "}</p>
              <label>
                <input
                  className="rounded m-1 px-[2px] text-black"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="repo"
                />
              </label>
            </span>
            <input
              type="submit"
              value="Add"
              className="bg-black py-3 px-6 w-fit h-fit mt-6 rounded cursor-pointer"
            />
          </form>
        </div>
        <p className="text-xs mt-8">
          {"Sign in to keep your curated list. It's free!"}
        </p>
      </div>
    </>
  );
};

export { AddRepoForm };
