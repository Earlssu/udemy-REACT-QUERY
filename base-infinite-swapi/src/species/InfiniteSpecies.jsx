import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Species } from "./Species.jsx";

const baseUrl = "https://swapi-node.vercel.app";
const initialUrl = baseUrl + "/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next ? baseUrl + lastPage.next : undefined;
    },
  });

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">error! {error.toString()}</div>;

  return (
    <InfiniteScroll
      initialLoad={false}
      loadMore={() => {
        if (!isFetching) fetchNextPage();
      }}
      hasMore={hasNextPage}
    >
      {isFetching && <div className="loading">Fetching...</div>}
      <div>
        {data?.pages.map((pageData) => {
          return pageData.results.map((page, idx) => {
            return (
              <Species
                key={`Page_${idx}`}
                name={page.fields.name}
                language={page.fields.language}
                averageLifespan={page.fields.average_lifespan}
              />
            );
          });
        })}
      </div>
      {!hasNextPage && <div className="end">End of species</div>}
    </InfiniteScroll>
  );
}
