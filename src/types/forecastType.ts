export type params = {
  id: string;
  name: string;
};

export type forecastType = {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  list: [
    {
      main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
      };

      weather: [
        {
          description: string;
          icon: string;
          main: string;
        }
      ];
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      clouds: {
        all: number;
      };
      pop: number;
      visibility: number;
    }
  ];
};
