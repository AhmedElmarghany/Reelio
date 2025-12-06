"use client"
import { useState } from "react";
import MovieCard from "@/components/cards/MovieCard";
import Search from "@/components/ui/Search";


function Page(){

    const [results, setResults] = useState<any>(null);
    

    return (
        <>
            <div className="mt-6">

                <Search showResults={false} setResultsOption={setResults}/>
              
                {results && results[0] == 'no results' &&
                    <h1 className="mt-6 p-2 text-foreground text-[24px] font-dm">No results</h1>
                }
              
                {results && results[0] !== 'no results' && results.map((item:any) => {return (<MovieCard movie={item} key={item.id}/>)})}
    
            </div>

        </>
    );
    }

export default Page;