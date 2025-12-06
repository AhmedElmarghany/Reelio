import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MoviePoster from "../cards/MoviePoster";

const Search = ({ showResults = true, setSelectedMovie, setResultsOption }: { showResults?: boolean, setSelectedMovie?: any, setResultsOption?: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);


    const getMoviesInfo = (resultsList: any[], i: number) => {
        const movieOptions: any[] = [];
        for (let movie = 0; movie < i; movie++) {
            movieOptions.push({
                "id": resultsList[movie].id,
                "title": resultsList[movie].title,
                "poster_link": resultsList[movie].poster_path,
                "year": resultsList[movie].release_date.slice(0, 4),
                "overview": resultsList[movie].overview,
                "rate": resultsList[movie].vote_average.toFixed(1),
            })
            setResults(movieOptions)
            
            if(!showResults &&  movieOptions.length > 0){ 
                setResultsOption?.(movieOptions);
            } else if(!showResults && movieOptions.length == 0){
                setResultsOption?.(['no results']);
            }

        }
    };

    const search = (query: string) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    if (data.results.length < 5) {
                        getMoviesInfo(data.results, parseInt(data.results.length));
                    } else {
                        getMoviesInfo(data.results, 5);
                    }
                    if(!showResults){
                        getMoviesInfo(data.results, parseInt(data.results.length));
                    }
                } else if (data.results && data.results.length == 0) {
                    setResults(['no results'])
                }
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                search(searchQuery);
            }
        }, 500)
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery])



    return (
        <>
            <div className="relative w-full  md:min-w-[450px]">
                <Command className="border border-border-dark bg-background shadow-md md:min-w-[450px] rounded-xl p-2" shouldFilter={false}>
                    <CommandInput className="border-0!" placeholder="Search for a movie..." onFocus={() => setOpen(true)} onBlur={() => { setTimeout(() => { setOpen(false) }, 300) }} onValueChange={(v) =>{ setSearchQuery(v); setResults([]); }} />
                    {searchQuery && showResults &&
                        <CommandList className={cn(
                            "absolute left-0 right-0 top-full z-50 bg-background border border-border-dark rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto",
                            open ? "" : "hidden"
                        )}>
                            {searchQuery && results[0] == 'no results' &&
                                <CommandEmpty>No results found.</CommandEmpty>
                            }
                            {searchQuery && results[0] == null &&
                                <CommandEmpty className="text-left">Searching...</CommandEmpty>
                            }
                            {searchQuery && results && results[0] !== "no results" &&
                                <CommandGroup>
                                    {results.map((result, i) => {
                                        return (
                                            <CommandItem
                                                key={i}
                                                value={result.id}
                                                onSelect={() =>{ setSelectedMovie(result) }}
                                                className="rounded-xl"
                                            >
                                                <MoviePoster size="xsmall" poster_path={result.poster_link}/>
                                                <p className="movie_title text-[20px]">{result.title} <span className="font-inter text-card-foreground text-[16px]">&nbsp;. {result.year}</span></p>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>}
                        </CommandList>
                    }
                </Command>
            </div>
        </>
    )
}

export default Search

