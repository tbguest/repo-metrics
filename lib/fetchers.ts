import { Session } from "next-auth";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchWithSession = (url: string, session: Session | null) => {
  // @ts-ignore
  const uid = session?.userId || false;
  return fetch(`${url}?id=${uid}`).then((res) => res.json());
};
