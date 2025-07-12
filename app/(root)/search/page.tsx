"use client"
import { useState } from "react";
import SearchBar from "../../../components/ui/search"
import Image from "next/image";
import Link from "next/link";
import MovieCard from "@/components/cards/MovieCard";


// function MovieCard(props: any) {
//     return (
//         <Link className="flex mt-6 p-2 bg-dark-3 rounded-lg" href={`/movie/${props.movie.id}`}>

//             {props.movie.poster_link.slice(-4) != "null" ? (<Image src={props.movie.poster_link} width={120} height={180} alt={props.movie.title} className="mr-2 rounded-xl min-w-[120px]" />) : (<Image src={`/assets/no-img.svg`} width={120} height={180} alt="No poster Found for this movie" className="mr-2 rounded-xl border-[7px] border-neutral-800" />)}
//             <div className="flex flex-col ml-2 content-end">
//                 <h1 className="text-neutral-100 text-[30px] font-lora">{props.movie.title}<span className="text-neutral-500 font-normal">&nbsp;. {props.movie.year}</span></h1>

//                 <h2 className="mb-2 text-neutral-500 text-body-bold font-inter">Average rating: <span className="text-neutral-100 font-lora">&#40; <span className="text-primary text-heading2-semibold">{props.movie.rate}</span> / 10 &#41;</span></h2>

//                 <h2 className="text-neutral-100 text-base-regular font-medium line-clamp-3">{props.movie.overview}</h2>
//             </div>
//         </Link>
//     )
// };

function Page(){
    // const user = await CurrentUser();
    
    // if(!user.isLoggedIn) redirect("/sign-in");

    const [results, setResults] = useState<any>(null);
    

    return (
        <>
            <div>

                <SearchBar setResults={setResults} />
              
                {results && results[0] == 'no results' &&
                    <h1 className="mt-6 p-2 text-neutral-100 text-[24px] font-lora">No results</h1>
                }
              
                {results && results[0] !== 'no results' && results.map((item:any) => {return (<MovieCard movie={item}/>)})}
    
            </div>

        </>
    );
    }

export default Page;