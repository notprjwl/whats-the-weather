import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import rain from "../assets/weather-clips/rain.mp4";
import sunny from "../assets/weather-clips/sunny.mp4";
import thunder from "../assets/weather-clips/thunder.mp4";

type Props = {};

type Params = {
  id: string;
  name: string;
};

type WeatherData = {
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
  };
};

export default function Weather({}: Props) {
  const { name } = useParams<Params>();
  const [date, setDate] = useState<Date>(new Date());
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data starts
      try {
        // Simulate loading delay
        setTimeout(async () => {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${import.meta.env.VITE_API_URL}`);
          const data: WeatherData = await response.json();
          const inCelsius = KtoC(data.main.temp);
          setTemperature(inCelsius);
          setLoading(false); // Set loading to false when data fetching is completed
          console.log(data);
        }, 2000); // Simulated loading delay of 2 seconds
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

  const KtoC = (K: number) => {
    return Math.floor(K - 273.15);
  };

  return (
    <>
      
      <div className='fixed inset-0 overflow-hidden'>
        <video autoPlay loop muted className='absolute inset-0 object-cover w-full h-full'>
          <source src={sunny} type='video/mp4' />
        </video>
      </div>
      {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <svg aria-hidden='true' className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
                <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
              </svg>
            </div> )}
      {!loading && (<div className='w-full mx-auto flex justify-center items-center h-[90vh]'>
        <div className='rounded-2xl text-white bg-opacity-30 bg-black h-[50vh] w-[26rem] p-3 z-10 m-5 '>
          <div className='text-white font-semibold font-mono flex justify-between'>
            <h1 className=''> Current Weather </h1>
            <h1 className='tracking-tighter text-[1rem]'> {date.toLocaleString()} </h1>
          </div>
          <div className='text-8xl font-bold inline'>{temperature !== null && <p className='inline '>{temperature}°C</p>}</div>
        </div>
      </div>)}
    </>
  );
}
