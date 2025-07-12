"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

function SearchResult({result, i, setSelectedMovie}:{result: any, i: number, setSelectedMovie:any}) {
  return <li className="flex my-1 p-4 hover:bg-dark-4 rounded-lg items-center cursor-pointer" key={i} onClick={(e)=>{
    setSelectedMovie(result);
  }}> {result.poster_link.slice(-4) != "null" ? (<Image src={result.poster_link} width={40} height={40} alt="img" className="mr-2 rounded-sm"/>):(<Image src={`/assets/no-img.svg`} width={40} height={40} alt="img" className="mr-2 rounded-sm"/>)}{result.title} <span className="text-neutral-600">&nbsp;. {result.year}</span></li>
};

function SearchResultsList({ value, open, results, setSelectedMovie }: { value: string, open: boolean, results: any[], setSelectedMovie: any }) {
  return (
    <>
      {value && open && results[0] == null &&
        <div className="mt-1 w-full absolute">
          <ul className="w-full font-lora text-[20px] bg-dark-3 rounded-lg text-neutral-300">
            <li className="flex my-1 p-4 hover:bg-dark-4 rounded-lg items-center">Searching...</li>
          </ul>
        </div>
      }
      {value && open && results[0] == 'no results' &&
        <div className="mt-1 w-full absolute">
          <ul className="w-full font-lora text-[20px] bg-dark-3 rounded-lg text-neutral-300">
            <li className="flex my-1 p-4 hover:bg-dark-4 rounded-lg items-center">No movie found...</li>
          </ul>
        </div>
      }
      {value && open && results && results[0] != 'no results' &&
        <div className="mt-1 w-full absolute">
          <ul className="w-full font-lora text-[20px] bg-dark-3 rounded-lg text-neutral-300">
            {results.map((result, i) => {
              return <SearchResult result={result} i={i} setSelectedMovie={setSelectedMovie} />
            })}
          </ul>
        </div>
      }
    </>
  )
}

export function SearchBar({ setSelectedMovie }: { setSelectedMovie: any }) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<any[]>([])



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
        if(data.results.length < 5){
          getMoviesInfo(data.results, parseInt(data.results.length));
        }else{
        getMoviesInfo(data.results, 5);
        }
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
      <div className="mt-2 relative inline-block w-full max-w-[968px]">
        <div className="w-full flex p-2 pl-4 bg-dark-3 rounded-xl">
          <Image src="/assets/search_grey.svg" alt="search Icon" width={22} height={22}></Image>
          <input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            onFocus={()=>{setOpen(true)}}
            onBlur={()=>{setTimeout(()=>setOpen(false), 300)}}
            placeholder="Search for a movie..."
            className="w-full bg-dark-3 h-8 text-neutral-300 m-2 ml-4 focus:outline-none"
          />
        </div>
        <SearchResultsList value={value} open={open} results={results} setSelectedMovie={setSelectedMovie}/>
      </div>
    </>
  )
}


export default SearchBar;

