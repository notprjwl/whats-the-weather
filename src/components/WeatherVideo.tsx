import { useState, useEffect } from "react";

import rain from "../assets/weather-clips/rain.mp4";
import sunny from "../assets/weather-clips/sunny.mp4";
import thunder from "../assets/weather-clips/thunder.mp4";
import eveningClouds from "../assets/weather-clips/eveningClouds.mp4";
import cloudySunny from "../assets/weather-clips/cloudySunny.mp4";
import snow from "../assets/weather-clips/snow.mp4";
import mist from "../assets/weather-clips/mist.mp4";
import darkNightClouds from "../assets/weather-clips/darkNightClouds.mp4";
import nightSky from "../assets/weather-clips/nightSky.mp4";
// import cloudy from "../assets/weather-clips/cloudy.mp4";


type Props = {
  weatherDescription: string;
  dayOrNight: string;
};

const WeatherVideo = ({ weatherDescription, dayOrNight }: Props) => {
  const [videoSource, setVideoSource] = useState(sunny);

  useEffect(() => {
    if(dayOrNight.includes("d")) {
      switch (true) {
        case weatherDescription.includes("rain"):
        case weatherDescription.includes("shower rain"):
          setVideoSource(rain);
          break;
        case weatherDescription.includes("thunderstorm"):
          setVideoSource(thunder);
          break;
        case weatherDescription.includes("clouds"):
          setVideoSource(eveningClouds);
          break;
        case weatherDescription.includes("snow"):
          setVideoSource(snow);
          break;
        case weatherDescription.includes("mist"):
          setVideoSource(mist);
          break;
        case weatherDescription.includes("scattered clouds"):
          setVideoSource(eveningClouds);
          break;
        case weatherDescription.includes("broken clouds"):
          setVideoSource(darkNightClouds);
          break;
        case weatherDescription.includes("clear"):
          setVideoSource(cloudySunny);
          break;
        default:
          break;
      }
    }
    else{
      switch (true) {
          case weatherDescription.includes("rain"):
          case weatherDescription.includes("shower rain"):
            setVideoSource(rain);
            break;
          case weatherDescription.includes("thunderstorm"):
            setVideoSource(thunder);
            break;
          case weatherDescription.includes("clouds"):
            setVideoSource(eveningClouds);
            break;
          case weatherDescription.includes("snow"):
            setVideoSource(snow);
            break;
          case weatherDescription.includes("mist"):
            setVideoSource(mist);
            break;
          case weatherDescription.includes("scattered clouds"):
            setVideoSource(eveningClouds);
            break;
          case weatherDescription.includes("broken clouds"):
            setVideoSource(darkNightClouds);
            break;
          case weatherDescription.includes("clear"):
            setVideoSource(cloudySunny);
            break;
          default:
            setVideoSource(nightSky);
            break;
      }
      setVideoSource(nightSky)
    }
   
  }, [weatherDescription]);

  return (
    <video autoPlay loop muted className='absolute inset-0 object-cover w-full h-full'>
      <source src={videoSource} type='video/mp4' />
    </video>
  );
};

export default WeatherVideo;
