import React, { ReactElement } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import classes from "./NavBar.module.css";

type NavBarProps = {
  session: Session | null;
};

export const NavBar = ({ session }: NavBarProps) => {
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default NavBar;
