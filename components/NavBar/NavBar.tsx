import React, { useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import classes from "./NavBar.module.css";
import { RiArrowDropDownFill } from "react-icons/ri";

type NavBarProps = {
  session: Session | null;
};

export const NavBar = ({ session }: NavBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const hero = session ? (
    <>
      <button
        className={classes.user_dropdown_button}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaUserCircle className={classes.icon} />
        <div className={classes.user_dropdown}>
          <p>{session?.user?.email}</p>
          {menuOpen ? (
            <RiArrowDropDownFill className={classes.dropdown_icon_open} />
          ) : (
            <RiArrowDropDownFill className={classes.dropdown_icon} />
          )}
        </div>
      </button>
      <button className={classes.button} onClick={() => signOut()}>
        <span>Sign out</span>
      </button>
    </>
  ) : (
    <>
      <button className={classes.button} onClick={() => signIn()}>
        <span>Sign in</span>
      </button>
    </>
  );
  return <div className={classes.container}>{hero}</div>;
};

export default NavBar;