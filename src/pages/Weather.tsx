import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { forecastType, ForecastLiveType } from "../types/forecastType";
import Loading from "../components/Loading";
import WeatherVideo from "../components/WeatherVideo";
import Navbar from "../components/Navbar";
import CtoF from "../components/CtoF";

type Props = {};

type Params = {
  id: string;
  name: string;
};

export default function Weather({}: Props) {
  const { name } = useParams<Params>();
  const [date, setDate] = useState<Date>(new Date());
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<forecastType>();
  const [weatherDescription, setWeatherDescription] = useState<string>("");
  const [dayOrNight, setDayOrNight] = useState<string>("");
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [forecastLive, setForecastLive] = useState<ForecastLiveType>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data starts
      try {
        // Simulate loading delay
        setTimeout(async () => {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${import.meta.env.VITE_API_URL}`);
          const forecastLiveResp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${import.meta.env.VITE_API_URL}`);
          const data = await response.json();
          const forecastLiveData = await forecastLiveResp.json();
          console.log(forecastLiveData);
          setForecastLive(forecastLiveData);
          console.log(data);
          setTemperature(forecastLiveData.main.temp);
          const forecastData = {
            ...data.city,
            list: data.list.slice(0, 8),
          };
          setForecast(forecastData);
          console.log(forecastData);
          console.log(forecastLiveData.weather[0].main.toLowerCase());
          setDayOrNight(forecastLiveData.weather[0].icon);
          setWeatherDescription(forecastLiveData.weather[0].description.toLowerCase());
          setLoading(false); // Set loading to false when data fetching is completed
        }, 3000); // Simulated loading delay of 2 seconds
      } catch (error) {
        setLoading(false); // Set loading to false in case of error
        console.log("error fetching weather data", error);
        setError("Error fetching weather data. Please try again.");
      }
    };
    fetchData();
  }, [name]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // kelvin to celsius
  const KtoC = (K: number) => {
    return Math.floor(K - 273.15);
  };

  //kelvin to fahrenheit
  const KtoF = (K: number) => {
    return Math.floor(((K - 273.15) * 9) / 5 + 32);
  };

  //handle toggle temp
  const handleToggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <>
      <Navbar
        backgroundColor='bg-transparent'
        handleHover={function (): void {
          throw new Error("Function not implemented.");
        }}
        currentColor={""}
      />
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {weatherDescription && <WeatherVideo weatherDescription={weatherDescription} dayOrNight={dayOrNight} />}
          {error && <div className='text-red-500'>{error}</div>}
          <div className=''>
            <div className={`w-full mx-auto flex justify-center items-center absolute inset-0 transition-all duration-500 ease-in-out transform`}>
              <div className={`rounded-2xl text-white bg-opacity-30 bg-black h-[50vh] w-[26rem] sm:w-[20rem] p-5 z-10 m-5 transition-all duration-500 ease-in-out`}>
                <div className='text-gray-200 font-mono flex justify-between'>
                  <h1 className='text-1xl sm:text-xs transition-all ease-in-out duration-500'> Current Weather </h1>
                  <h1 className='tracking-tighter text-[1rem] sm:text-xs transition-all ease-in-out duration-500'> {date.toLocaleString()} </h1>
                </div>
                <div className='flex justify-between'>
                  <h1 className='text-sm font-light italic'>{forecastLive?.weather[0].description}</h1>
                  <CtoF onToggleTemperature={handleToggleTemperature} isCelsius={isCelsius} />
                </div>
                <div className='inline p-3 font-outfit transition-all ease-in-out duration-500'>
                  <div className='flex gap-2 justify-between'>
                    <h1 className='text-7xl sm:text-3xl transition-all ease-in-out duration-500 text-clamp font-semibold '>{forecast?.name}</h1>
                    <div className='text-1xl h-full'>
                      <div className='flex gap-2 justify-between'>
                        <h1 className='flex'>
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='currentColor' className='w-3 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18' />
                          </svg>
                          {forecastLive?.main.temp_max && (isCelsius ? KtoC(forecastLive?.main.temp_max) : KtoF(forecastLive?.main.temp_max))}°<span className='text-1xl opacity-90'>{isCelsius ? "C" : "F"}</span>
                        </h1>
                        <h1 className='flex '>
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='currentColor' className='w-3 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3' />
                          </svg>
                          {forecastLive?.main.temp_min && (isCelsius ? KtoC(forecastLive.main.temp_min) : KtoF(forecastLive.main.temp_min))}°<span className='text-1xl opacity-90'>{isCelsius ? "C" : "F"}</span>
                        </h1>
                      </div>
                      <div className='flex gap-1 justify-between text-sm '>
                        pop: {forecast?.list[0].pop}%<h1></h1>
                        <h1 className='flex'>
                          <svg className='w-4 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z' />
                          </svg>
                          {forecastLive?.wind.speed}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className='flex'>
                    <div className='font-semibold inline pt-1 transition-all ease-in-out duration-500'>
                      {temperature !== null && (
                        <div className='inline text-8xl sm:2xl '>
                          {isCelsius ? KtoC(temperature) : KtoF(temperature)}°<span className='text-4xl opacity-90'>{isCelsius ? "C" : "F"}</span>
                        </div>
                      )}
                      <h1 className='text-1xl font-light'>
                        Real Feel {forecastLive && (isCelsius ? KtoC(forecastLive.main.feels_like) : KtoF(forecastLive.main.feels_like))}°<span className='text-xs'>{isCelsius ? "C" : "F"}</span>
                      </h1>
                    </div>
                  </div>
                </div>
                <div>
                  <section className='flex overflow-x-scroll justify-start p-2 my-2'>
                    {forecast?.list.map((item, i) => (
                      <div className='inline-block text-center px-3' key={i}>
                        <p className="font-outfit">{i === 0 ? "Now" : new Date(item.dt * 1000 + 5.5 * 60 * 60 * 1000).getUTCHours()}</p>
                        <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={`weather-icon-${item.weather[0].description}`}/>
                        <p className='text-sm font-bold'>
                          <p className='text-sm font-bold'>
                            {isCelsius ? KtoC(item.main.temp) : KtoF(item.main.temp)}°{isCelsius ? "C" : "F"}
                          </p>
                        </p>
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
