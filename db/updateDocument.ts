import { RepoDoc } from "../models";

export const addRepoToDocument = async (
  document: RepoDoc,
  userId: string | null | undefined
) => {
  const response = await fetch(
    `/api/user/repos${userId ? `?id=${userId}` : ""}`,
    {
      method: "PATCH",
      body: JSON.stringify({ document }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const { data } = await response.json();
  return data;
};

export const removeRepoFromDocument = async (
  id: string,
  userId: string | null | undefined
) => {
  if (!userId) {
    return;
  }
  const response = await fetch(
    `/api/user/repos?id=${id}${userId ? `&userId=${userId}` : ""}`,
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
