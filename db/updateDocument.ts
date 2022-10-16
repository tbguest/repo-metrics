import { Session } from "next-auth";
import { RepoDoc } from "../models";

export const addRepoToDocument = async (
  document: RepoDoc,
  session: Session
) => {
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

export const removeRepoFromDocument = async (id: string, session: Session) => {
  if (!session) {
    return;
  }
  const response = await fetch(
    `/api/user/repos?id=${id}&userId=${session?.userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
};
