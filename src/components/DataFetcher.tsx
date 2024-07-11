import type { FunctionalComponent } from 'preact';

const data = await fetch('https://api-seguim-ocular.vercel.app/api/data').then((response) =>
  response.json()
);

// Components that are build-time rendered also log to the CLI.
// When rendered with a client:* directive, they also log to the browser console.
console.log(data);

const Movies: FunctionalComponent = () => {
  // Output the result to the page
  return <div>{JSON.stringify(data)}</div>;
};

export default Movies;
export { data }; // Export the data for use in App.jsx

