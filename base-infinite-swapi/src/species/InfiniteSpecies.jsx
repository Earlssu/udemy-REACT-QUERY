import InfiniteScroll from "react-infinite-scroller";

const initialUrl = "https://swapi-node.vercel.app/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />;
}
