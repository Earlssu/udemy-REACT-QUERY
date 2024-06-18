import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Person } from "./Person.jsx";

const baseUrl = "https://swapi-node.vercel.app";
const initialUrl = baseUrl + "/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next ? baseUrl + lastPage.next : undefined;
    },
  });

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">erorr! {error.toString()}</div>;

  return (
    <Fragment>
      {isFetching && <div className="loading">Fetching...</div>}
      <InfiniteScroll
        initialLoad={false}
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
      >
        <div>
          {data?.pages.map((pageData) => {
            return pageData.results.map((page, idx) => {
              return (
                <Person
                  key={`Page_${idx}`}
                  name={page.fields.name}
                  eyeColor={page.fields.eye_color}
                  hairColor={page.fields.hair_color}
                />
              );
            });
          })}
        </div>
      </InfiniteScroll>
    </Fragment>
  );
}
