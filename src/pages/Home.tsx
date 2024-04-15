import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

export default function Home() {
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore] = useState<boolean>(true);
  const [index] = useState<number>(20);
  const [searchData, setSearchData] = useState<CityItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [sortKey, setSortKey] = useState<keyof CityItem>("name");
  const [sortHistory, setSortHistory] = useState<{ key: keyof CityItem; order: "asc" | "desc" }[]>([
    { key: "name", order: "asc" },
    { key: "country", order: "asc" },
    { key: "timezone", order: "asc" },
  ]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
        .then((data: CityItem[]) => {
          setSearchData(data);
          const slicedData = data.slice(0, 50);
          setCities(slicedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  // fetching more data - lazy loading
  const fetchMoreData = () => {
    setTableLoading(true);
    // Simulate fetching more data (you should replace this with your actual data fetching logic)
    setTimeout(() => {
      fetch("/data/cities2.json")
        .then((response) => response.json())
        .then((data) => {
          // Append the new data to the existing list of cities
          setSearchData(data);
          const newData = data.slice(cities.length, cities.length + 10);
          setCities([...cities, ...newData]);
          setTableLoading(false);
          // In a real implementation, you should update 'hasMore' based on whether there is more data to fetch.
        })
        .catch((error) => {
          console.error("Error fetching more data:", error);
          setTableLoading(false);
        });
    }, 1000); // Simulating delay for loading indicator
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter cities based on search query
  const filteredCities = searchData.filter((city) => city.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const slicedCities = filteredCities.slice(0, index);

  const handleClick = (cityId: number, cityName: string) => {
    navigate(`/${cityName}/${cityId}`);
  };

  const handleSort = (key: keyof CityItem) => {
    const sortIndex = sortHistory.findIndex((item) => item.key === key);
    const sortOrder = sortHistory[sortIndex].order === "asc" ? "desc" : "asc";
    const updatedSortHistory = [...sortHistory];
    updatedSortHistory[sortIndex] = { key, order: sortOrder };
    setSortHistory(updatedSortHistory);

    const sortedData = [...searchData].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    const sortedSlicedCities = sortedData.slice(0, 100);
    setCities(sortedSlicedCities);
  };

  const colors = ["text-white", "text-cyan-200", "text-purple-300", "text-yellow-200", "text-red-200", "text-[#000087]"];

  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);

  const handleHover = () => {
    setCurrentColorIndex((currentColorIndex + 1) % colors.length);
  };

  const currentColor = colors[currentColorIndex];
  
  const handleLocationClick = () => {
    // Get user's current location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Navigate to the Weather page with the location data
        navigate(`/weather?lat=${latitude}&lon=${longitude}`);
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  };

  return (
    <>
      <Navbar backgroundColor='bg-bg' handleHover={handleHover} currentColor={currentColor} />
      <body className='bg-bg text-text font-outfit min-h-screen'>
        <div className='flex justify-center h-[70vh] align-center place-items-center'>
          <div className='text-center p-5'>
            <span className='text-6xl sm:text-4xl font-bold'>
              Is your weather <span className={`italic ${currentColor} text-6xl sm:text-4xl cursor-pointer transition-all duration-500 ease-in-out`} onMouseEnter={handleHover}>weathering</span> today?
            </span>{" "}
            <br />
            <span className="text-2xl text-1xl font-light">
            <span className='hover:px-1 hover:bg-gray-300 hover:text-bg transition-all duration-500 ease-in-out rounded-md cursor-pointer font-semibold' onMouseEnter={handleHover} onClick={handleLocationClick}>click here</span> to find out!</span>
          </div>
        </div>
        {loading && <Loading />}
        {!loading && <Search onSearchChange={handleSearchChange} />}
        {!searchQuery && !loading && (
          <InfiniteScroll dataLength={cities.length} next={fetchMoreData} hasMore={hasMore} loader={<h4 className='text-center items-center text-1xl '>{tableLoading && <h1>Loading..</h1>}</h4>} endMessage={<p>No more cities to load</p>}>
            <div className='flex justify-center items-center mx-auto'>
              <table className='shadow-2xl shadow-black w-[40rem] sm:w-[5rem] p-5 m-3'>
                <thead className='bg-gray-800 max-w-[50%]'>
                  <tr className='text-2xl w-200px'>
                    <th className='w-[200px] sm:w-[100px] text-start px-4 p-2'>
                      <span className='cursor-pointer flex gap-2' onClick={() => handleSort("name")}>
                        City
                        {sortHistory.find((item) => item.key === "name") &&
                          (sortHistory.find((item) => item.key === "name")!.order === "asc" ? (
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
                            </svg>
                          ) : (
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6 mt-1'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                            </svg>
                          ))}
                      </span>
                    </th>
                    <th className='w-[200px] text-start px-4 p-2'>
                      <span className='cursor-pointer flex gap-3' onClick={() => handleSort("country")}>
                        Country
                        {sortHistory.find((item) => item.key === "country") &&
                          (sortHistory.find((item) => item.key === "country")!.order === "asc" ? (
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
                            </svg>
                          ) : (
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6 mt-1'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                            </svg>
                          ))}
                      </span>
                    </th>
                    <th className='w-[200px] text-start px-4 p-2 visible sm:hidden'>
                      <span className='cursor-pointer flex gap-3' onClick={() => handleSort("timezone")}>
                        Timezone
                        {sortHistory.find((item) => item.key === "timezone") &&
                          (sortHistory.find((item) => item.key === "timezone")!.order === "asc" ? (
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
                            </svg>
                          ) : (
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6 mt-1'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                            </svg>
                          ))}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cities.map((city, index) => (
                    <tr key={index}>
                      <td className='p-2 px-3 text-1xl max-w-[130px] sm:text-sm'>
                        <span className='cursor-pointer' onClick={() => handleClick(city.id, city.name)}>
                          {city.name}
                        </span>
                      </td>
                      <td className='p-2 px-3 text-1xl max-w-[130px] sm:text-sm '>{city.country}</td>
                      <td className='p-2 px-3 text-1xl max-w-[130px] sm:text-sm visible sm:hidden'>{city.timezone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InfiniteScroll>
        )}

        {searchQuery && (
          <div className='flex justify-center items-center mx-auto'>
            <table className='shadow-2xl shadow-black w-[40rem] sm:w-[5rem] p-5 m-3'>
              <thead className='bg-gray-800 max-w-[50%]'>
                <tr className='text-2xl w-200px'>
                  <th className='w-[200px] sm:w-[100px] text-start px-4 p-2'>
                    <span className='cursor-pointer flex gap-2' onClick={() => handleSort("name")}>
                      City
                      {sortHistory.find((item) => item.key === "name") &&
                        (sortHistory.find((item) => item.key === "name")!.order === "asc" ? (
                          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
                          </svg>
                        ) : (
                          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6 mt-1'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                          </svg>
                        ))}
                    </span>
                  </th>
                  <th className='w-[200px] text-start px-4 p-2'>
                    <span className='cursor-pointer flex gap-3' onClick={() => handleSort("country")}>
                      Country
                      {sortHistory.find((item) => item.key === "country") &&
                        (sortHistory.find((item) => item.key === "country")!.order === "asc" ? (
                          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
                          </svg>
                        ) : (
                          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6 mt-1'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                          </svg>
                        ))}
                    </span>
                  </th>
                  <th className='w-[200px] text-start px-4 p-2 visible sm:hidden'>
                    <span className='cursor-pointer flex gap-3' onClick={() => handleSort("timezone")}>
                      Timezone
                      {sortHistory.find((item) => item.key === "timezone") &&
                        (sortHistory.find((item) => item.key === "timezone")!.order === "asc" ? (
                          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
                          </svg>
                        ) : (
                          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='w-6 h-6 mt-1'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                          </svg>
                        ))}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {slicedCities.map((city, index) => (
                  <tr key={index}>
                    <td className='p-2 px-3 text-1xl max-w-[130px] sm:text-sm'>
                      <span className='cursor-pointer' onClick={() => handleClick(city.id, city.name)}>
                        {city.name}
                      </span>
                    </td>
                    <td className='p-2 px-3 text-1xl max-w-[130px] sm:text-sm '>{city.country}</td>
                    <td className='p-2 px-3 text-1xl max-w-[130px] sm:text-sm visible sm:hidden'>{city.timezone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </body>
    </>
  );
}
