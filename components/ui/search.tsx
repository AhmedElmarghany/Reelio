"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
};

export function SearchBar({ setResults }: Props) {
  const [value, setValue] = useState('');



  const getMoviesInfo = (resultsList: any[], i:number)=>{
    let movieOptions = [];
    for (let movie = 0; movie < i; movie++){
      movieOptions.push({
        "id": resultsList[movie].id,
        "title": resultsList[movie].title,
        "poster_link": `https://image.tmdb.org/t/p/w1280${resultsList[movie].poster_path}`,
        "year": resultsList[movie].release_date.slice(0,4),
        "overview": resultsList[movie].overview,
        "rate": resultsList[movie].vote_average.toFixed(1),
      })
      setResults(movieOptions)
    }
  };

  const search = (query: string) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.results && data.results.length > 0){
        getMoviesInfo(data.results, parseInt(data.results.length));
      }else if(data.results && data.results.length == 0){
        setResults(['no results'])
      }
    })
    .catch(err => console.error(err));
    
  };
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value) {
        search(value);
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn);
  }, [value])


  return (
    <>
      <div className="relative inline-block w-full max-w-[968px]">
        <div className="w-full flex p-2 pl-4 bg-dark-3 rounded-xl">
          <Image src="/assets/search_grey.svg" alt="search Icon" width={22} height={22}></Image>
          <input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full bg-dark-3 h-8 text-neutral-300 m-2 ml-4 focus:outline-none"
          />
        </div>
      </div>
    </>
  )
}


export default SearchBar;

