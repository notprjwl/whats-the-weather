import { useState, useEffect, Suspense } from "react";

type Props = {
  weatherDescription: string;
  dayOrNight: string;
};

const WeatherVideo = ({ weatherDescription, dayOrNight }: Props) => {
  const [videoSource, setVideoSource] = useState<any>(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (dayOrNight.includes("d")) {
        switch (true) {
          case weatherDescription.includes("rain"):
          case weatherDescription.includes("shower rain"):
            setVideoSource(await import("../assets/weather-clips/rain.mp4"));
            break;
          case weatherDescription.includes("thunderstorm"):
            setVideoSource(await import("../assets/weather-clips/thunder.mp4"));
            break;
          case weatherDescription.includes("clouds"):
            setVideoSource(await import("../assets/weather-clips/cloudy2.mp4"));
            break;
          case weatherDescription.includes("snow"):
            setVideoSource(await import("../assets/weather-clips/snow.mp4"));
            break;
          case weatherDescription.includes("mist"):
            setVideoSource(await import("../assets/weather-clips/mist.mp4"));
            break;
          case weatherDescription.includes("scattered clouds"):
            setVideoSource(await import("../assets/weather-clips/eveningClouds.mp4"));
            break;
          case weatherDescription.includes("broken clouds"):
            setVideoSource(await import("../assets/weather-clips/darkNightClouds.mp4"));
            break;
          case weatherDescription.includes("clear"):
            setVideoSource(await import("../assets/weather-clips/cloudySunny.mp4"));
            break;
          default:
            break;
        }
      } else {
        switch (true) {
          case weatherDescription.includes("rain"):
          case weatherDescription.includes("shower rain"):
            setVideoSource(await import("../assets/weather-clips/nightRain.mp4"));
            break;
          case weatherDescription.includes("thunderstorm"):
            setVideoSource(await import("../assets/weather-clips/thunder2.mp4"));
            break;
          case weatherDescription.includes("clouds"):
          case weatherDescription.includes("scattered clouds"):
          case weatherDescription.includes("broken clouds"):
            setVideoSource(await import("../assets/weather-clips/nightSky.mp4"));
            break;
          case weatherDescription.includes("clear"):
          default:
            setVideoSource(await import("../assets/weather-clips/night.mp4"));
            break;
        }
      }
    };

    loadVideo();
  }, [weatherDescription, dayOrNight]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {videoSource && (
        <video autoPlay loop muted playsInline className='absolute inset-0 object-cover w-full h-full'>
          <source src={videoSource.default} type='video/mp4' />
        </video>
      )}
    </Suspense>
  );
};

export default WeatherVideo;
