import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(20);
  const [searchData, setSearchData] = useState<CityItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter cities based on search query
  const filteredCities = searchData.filter((city) => city.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const slicedCities = filteredCities.slice(0, index);

  const handleClick = (cityId: number, cityName: string) => {
    navigate(`/${cityName}/${cityId}`);
  };

  return (
    <>
      {<Search onSearchChange={handleSearchChange} />}

      {!searchQuery && (
        <InfiniteScroll dataLength={cities.length} next={fetchMoreData} hasMore={hasMore} loader={<h4 className='text-center items-center font-mono text-1xl '>Loading...</h4>} endMessage={<p>No more cities to load</p>}>
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
                    <td className='p-2 px-3 text-1xl font-mono w-[150px] sm:text-sm sm:px-0'>
                      <span className='cursor-pointer' onClick={() => handleClick(city.id, city.name)}>
                        {city.name}
                      </span>
                    </td>
                    <td className='p-2 px-3 text-1xl font-mono w-[150px] sm:text-sm sm:px-0'>{city.country}</td>
                    <td className='p-2 px-3 text-1xl font-mono w-[150px] sm:text-sm sm:px-0'>{city.timezone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      )}

      {searchQuery && (
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
              {slicedCities.map((city) => (
                <tr key={city.id}>
                  <td className='p-2 px-3 text-1xl font-mono w-[150px] sm:text-sm sm:px-0'>
                    <span className='cursor-pointer' onClick={() => handleClick(city.id, city.name)}>
                      {city.name}
                    </span>
                  </td>
                  <td className='p-2 px-3 text-1xl font-mono w-[150px] sm:text-sm sm:px-0'>{city.country}</td>
                  <td className='p-2 px-3 text-1xl font-mono w-[150px] sm:text-sm sm:px-0'>{city.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
