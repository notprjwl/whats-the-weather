import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "../components/Search";

export default function Home() {
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  interface CityItem {
    coordinates: string;
    timezone: string;
    country: string;
    name: string;
    otherNames: string;
    id: number;
    // name: string;
    // class: string;
  }

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch("/data/cities2.json")
        .then((response) => response.json())
        .then((data) => {
          const slicedData = data.slice(0, 50); 
          setCities(slicedData as CityItem[]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const fetchMoreData = () => {
    setLoading(true);
    // Simulate fetching more data (you should replace this with your actual data fetching logic)
    setTimeout(() => {
      fetch("/data/cities2.json")
        .then((response) => response.json())
        .then((data) => {
          // Append the new data to the existing list of cities
          const newData = data.slice(cities.length, cities.length + 10);
          setCities([...cities, ...newData]);
          setLoading(false);
          // In a real implementation, you should update 'hasMore' based on whether there is more data to fetch.
        })
        .catch((error) => {
          console.error("Error fetching more data:", error);
          setLoading(false);
        });
    }, 1000); // Simulating delay for loading indicator
  };

  // const handleOnClick = () => {
  //   console.log(city.name)
  // }

  return (
    <>
      {/* {loading && (
        <div className='text-center'>
          <svg aria-hidden='true' className='inline w-8 h-screen mt-5 text-red-400 animate-spin fill-blue-300 border-none outline-none' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
            <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
          </svg>
        </div>
      )}
      {!loading && <Search />} */}
      {<InfiniteScroll dataLength={cities.length} next={fetchMoreData} hasMore={hasMore} loader={<h4 className='text-center items-center font-mono text-1xl '>Loading...</h4>} endMessage={<p>No more cities to load</p>}>
        <div className='flex justify-center items-center mx-auto'>
          <table>
            <thead>
              <tr>
                <th className='max-w-[40%]'>city</th>
                <th className='max-w-[40%]'>country</th>
                <th className='max-w-[40%]'>timezone</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr key={index}>
                  <td className='p-2 px-3 text-1xl font-mono w-[150px] sm:text-sm sm:px-0 cursor-pointer' onClick={()=>console.log(city.name)}>{city.name}</td>
                  <td className='p-2 px-3 text-1xl font-mono w-[150px] sm:text-sm sm:px-0'>{city.country}</td>
                  <td className='p-2 px-3 text-1xl font-mono w-[150px] sm:text-sm sm:px-0'>{city.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll> }
    </>
  );
}

// import { useState } from 'react';
// import citiesData from '../data/cities.json';
// import InfiniteScroll from 'react-infinite-scroll-component';

// type City = {
//   name: string;
//   country: string;
//   Timezone: string;
// }

// const cities: City[] = citiesData as City[];
// // const [isData, setIsData] = useState(true);

// export default function Cities() {
//   const citiesToDisplay = cities.slice().sort((a, b) => a.name.localeCompare(b.name)).slice(0, 4); // Sorting by city name and selecting the first 10 cities

//   return (
// <div className='flex justify-center items-center mx-auto mt-20 overflow-y-auto h-[50vh]'>
//   <table className='border-2 border-black overflow-hidden'>
//     <thead>
//       <tr className=''>
//         <th className='p-3'>City</th>
//         <th className='p-3'>Country</th>
//         <th className='p-3'>Timezone</th>
//       </tr>
//     </thead>
//     <tbody>
//       {citiesToDisplay.map((city, index) => (
//         <tr key={index}>
//           <td className='p-1 px-2 border border-black'>{city.name}</td>
//           <td className='p-1 px-2 border border-black'>{city.country}</td>
//           <td className='p-1 px-2 border border-black'>{city.Timezone}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
//   );
// }
