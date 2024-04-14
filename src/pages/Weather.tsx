import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { forecastType } from "../types/forecastType";
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
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data starts
      try {
        // Simulate loading delay
        setTimeout(async () => {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${import.meta.env.VITE_API_URL}`);
          const data = await response.json();
          setTemperature(data.list[0].main.temp);
          const forecastData = {
            ...data.city,
            list: data.list.slice(0, 6),
          };
          setForecast(forecastData);
          console.log(forecastData);
          console.log(data.list[0].weather[0].main.toLowerCase());
          setDayOrNight(data.list[0].weather[0].icon);
          setWeatherDescription(data.list[0].weather[0].description.toLowerCase());
          setLoading(false); // Set loading to false when data fetching is completed
        }, 3000); // Simulated loading delay of 2 seconds
      } catch (error) {
        console.log("error fetching the weather data", error);
        setLoading(false); // Set loading to false in case of error
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
    return Math.floor((K - 273.15) * 9/5 + 32);
  };

  //handle toggle temp
  const handleToggleTemperature = () => {
    setIsCelsius(!isCelsius)
  }

  return (
    <>
      <Navbar backgroundColor="bg-transparent" />
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {weatherDescription && <WeatherVideo weatherDescription={weatherDescription} dayOrNight={dayOrNight} />}
          <div className='w-full mx-auto flex justify-center items-center h-[90vh]'>
            <div className='rounded-2xl text-white bg-opacity-30 bg-black h-[50vh] w-[26rem] p-5 z-10 m-5 '>
              <div className='text-gray-200 font-mono flex justify-between'>
                <h1 className='text-1xl sm:text-xs'> Current Weather </h1>
                <h1 className='tracking-tighter text-[1rem] sm:text-xs'> {date.toLocaleString()} </h1>
              </div>
              <div className="flex justify-between">
              <h1 className='text-sm font-light italic'>{forecast?.list[0].weather[0].description}</h1>
              <CtoF onToggleTemperature={handleToggleTemperature} isCelsius={isCelsius}/>
              </div>
              <div className='inline p-3 font-outfit'>
                <div className='flex'>
                  <h1 className='text-7xl sm:text-6xl '>{forecast?.name}</h1>
                  {/* <div className='inline'>
      <img src={forecast && `https://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`} className='mx-auto max-w-[100] ' />
    </div> */} 
                </div>
                <div className='flex'>
                  <div className='font-semibold inline pt-1'>
                    {temperature !== null && (
                      <div className='inline text-8xl sm:2xl '>
                        {isCelsius ? KtoC(temperature) : KtoF(temperature)}°<span className='text-4xl opacity-90'>{isCelsius ? 'C' : 'F'}</span>
                      </div>
                    )}
                    <h1 className='text-1xl font-light'>
                    Real Feel {forecast && (isCelsius ? KtoC(forecast.list[0].main.feels_like) : KtoF(forecast.list[0].main.feels_like))}°<span className='text-xs'>{isCelsius ? 'C' : 'F'}</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
