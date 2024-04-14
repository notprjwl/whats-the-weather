import { Link } from "react-router-dom";

type Props = {
  backgroundColor : string;
};

export default function Navbar({backgroundColor}: Props) {
  return (
    <header className={`p-4 text-white sticky z-10 ${backgroundColor}`}>
      <div className='font-Montserrat font-semibold max-w-[1300px] flex mx-auto items-center sticky'>
        <Link to='/'>
          <h1 className='mix-blend-overlay'> Weather App</h1>
        </Link>
      </div>
    </header>
  );
}
