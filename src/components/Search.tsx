import React from 'react'

type Props = {}

export default function Search({}: Props) {
  return (
    <div className='items-center flex justify-center mx-auto p-3'>
        <input type="search" placeholder='search city' className='outline outline-1 p-2 rounded-lg focus:border-0 focus:ring-0 active:border-0 active:ring-0 active:bg-none' />
    </div>
  )
}