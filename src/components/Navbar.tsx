import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  backgroundColor: string;
  handleHover: () => void;
  currentColor : string;
};

export default function Navbar({ backgroundColor, handleHover, currentColor }: Props) {

  return (
    <header className={`p-4 text-white sticky top-0 z-10 ${backgroundColor}`}>
      <div className='font-Montserrat font-semibold max-w-[1300px] flex mx-auto items-center sticky'>
        <Link to='/'>
          <h1 className={`mix-blend-overlay leading-4`} onMouseEnter={handleHover}> what's the <br /> <span className={`italic ${currentColor} transition-all duration-500 ease-in-out` }>weather?</span> </h1>
        </Link>
      </div>
    </header>
  );
}
