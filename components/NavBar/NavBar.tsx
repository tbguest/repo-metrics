import React, { useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";

type NavBarProps = {
  session: Session | null;
};

export const NavBar = ({ session }: NavBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const hero = session ? (
    <>
      <button
        className="flex gap-4 items-center [color:var(--light-primary)]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaUserCircle className="w-9 h-9" />
        <div className="flex items-center pr-4">
          <p className="hidden md:block">{session?.user?.email}</p>
          {/* {menuOpen ? (
            <RiArrowDropDownFill className="h-7 w-7 rotate-180 transition-transform ease-in duration-200" />
          ) : (
            <RiArrowDropDownFill className="h-7 w-7 transition-transform ease-out duration-200" />
          )} */}
        </div>
      </button>
      <button
        className="border rounded border-[color:var(--plot-color)] [color:var(--plot-color)] py-1 px-2"
        onClick={() => signOut()}
      >
        <span>Sign out</span>
      </button>
    </>
  ) : (
    <>
      <button
        className="border rounded border-[color:var(--plot-color)] [color:var(--plot-color)] py-1 px-2"
        onClick={() => signIn()}
      >
        <span>Sign in</span>
      </button>
    </>
  );
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-end py-5 px-7 bg-[color:var(--background-color)] z-10">
      <div className="flex">{hero}</div>
    </div>
  );
};

export default NavBar;
