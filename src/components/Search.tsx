import { ChangeEvent } from "react";

type Props = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ onSearchChange }: Props) {
  return (
    <>
      <h1 className="text-center">OR <br /> Search any city from the table</h1>
      <div className='items-center flex justify-center mx-auto p-3'>
        <input type='search' placeholder='search your city' className='outline outline-1 p-2 border-none outline-none opacity-95 focus:border-0 focus:ring-0 active:border-0 active:ring-0 active:bg-none text-black' onChange={onSearchChange} />
      </div>
    </>
  );
}
