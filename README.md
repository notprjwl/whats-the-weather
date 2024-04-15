## Description
what's the weather? is a responsive web application built using TypeScript, React, and Tailwind CSS. It provides users with real-time weather information for various cities. The front page features a dynamic table with lazy loading, allowing users to browse through a large dataset of cities with ease. The table also includes a search functionality, enabling users to quickly find specific cities of interest.

One of the key features of this app is the ability to navigate to individual city weather pages. By clicking on a city name in the table, users are directed to a dedicated page displaying detailed weather conditions for that city. This page includes current weather data as well as a forecast for the upcoming hours.

Additionally, this app utilizes dynamic backgrounds to reflect the current weather conditions, providing users with a visually immersive experience. The background changes dynamically based on the weather conditions of the selected city.

The application also includes a button on the front page labeled "Click here" that detects the user's current location and redirects them to a separate page with weather data for their location. This feature allows users to quickly access weather information for their current location without manually searching for the city.

## Key Features
- Responsive web application
- Built with TypeScript, React, and Tailwind CSS
- Dynamic table with lazy loading and search functionality
- Detailed weather information for individual cities
- Forecast display for upcoming hours
- Dynamic backgrounds based on weather conditions
- Seamless navigation between city weather pages
- Current location detection with "Click here" button


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
