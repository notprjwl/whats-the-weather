import React from 'react'

type Props = {
    onToggleTemperature: () => void;
    isCelsius: boolean;
}

const CtoF = ({onToggleTemperature, isCelsius}: Props) => {
  return (
    <div className='flex'>
        <button className='bg-[#707c8188] sm:text-xs bg-opacity-100 p-[] px-2 rounded-lg hover:bg-opacity-50 transition-all ease-in-out duration-500' onClick={onToggleTemperature}>
        {isCelsius ? 'Fahrenheit' : 'Celsius'}
        </button>
    </div>
  )
}

export default CtoF