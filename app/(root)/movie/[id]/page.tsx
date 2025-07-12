"use client"
import { addAndDelFavourites, checkFav, getMovieById } from "@/lib/actions/movie.actions";
import Image from "next/image";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

type Movie = {
  id: string,
  title: string;
  release_date: String;
  overview: String;
  tagline: String;
  vote_average: Number;
  poster_path: string;
  backdrop_path: String;
  genres: Array<string>;
  origin_country: Array<string>;
}
let audio = new Audio("/assets/audio/mixkit-soap-bubble-sound.wav")

function AddToFav(){
    return (
        <>
            <div className="flex bg-primary p-2 h-12 justify-center items-center rounded-md cursor-pointer hover:bg-[#02AC76]">
                <Image src="/assets/newIcons/hearts/heart_outlined.svg" alt="favourite" width={26} height={26} />
                <p className="text-dark-4 font-bold ml-2">Add to favourites</p>
            </div>
        </>
    )
}

function RemoveFromFav() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full h-12 inline-block overflow-hidden rounded-md cursor-pointer"
    >
      <div className={`absolute inset-0 flex bg-primary p-2 justify-center items-center rounded-md cursor-pointer transition-all duration-500 ease-in-out ${hovered ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
        <Image src="/assets/newIcons/hearts/heart_filled.svg" alt="favourite" width={26} height={26} />
        <p className="text-dark-4 font-bold ml-2">Added to Favourites</p>
      </div>

      <div className={`absolute inset-0 flex bg-primary p-2 justify-center items-center rounded-md cursor-pointer transition-all duration-500 ease-in-out ${ hovered ? "translate-x-0 opacity-100" : "translate-x-full opacity-0" } bg-red-500 text-white`}>
        <Image src='/assets/newIcons/hearts/heart_delete.svg' alt="delete from favourites" width={26} height={26}/>
      
        <p className="text-white font-bold ml-2">Remove from Favourites</p>
      </div>
    </div>
  );
}

function addAndDelFav(currentValue: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, post_id: string){
    const newValue = !currentValue;
    setState(newValue);
    audio.play();
    addAndDelFavourites(post_id);
}



export default function Page(){
    // const params = useParams();
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [movieStatus, setMovieStatus] = useState<boolean>(false);
    // const [ loading, setLoading ] = useState(true);

useEffect(() => {
  const fetchMovie = async () => {
    try {
      const res: any = await getMovieById(id);
      setMovie(res);
      console.log(res);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    }
  };

  fetchMovie();
}, []);

useEffect(() => {
  const isFav = async () => {
      const res: any = await checkFav(id);      
      setMovieStatus(res.is_fav);
      // console.log("=".repeat(80))
      // console.log(typeof(res.is_fav));
      // console.log("=".repeat(80))
  };
  isFav();
}, []);
  return (
    <>
      <div className="flex flex-col min-[700px]:flex-row">
        <div className="absolute inset-0"
          style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}')` }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <div className="sm:w-2/5 relative z-10">
          {movie && <Image src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`} alt={movie.title} width={0} height={0} sizes="90vw" className="w-full h-auto border-[1px] border-dark-4 rounded-sm mb-2" />}
          {movie &&
            <div onClick={() => addAndDelFav(movieStatus, setMovieStatus, movie.id)}>
              {movieStatus ?
                <RemoveFromFav />
                :
                <AddToFav />
              }
            </div>
          }
        </div>
        <div className="ml-3 sm:w-2/3 flex flex-col gap-2 relative z-10">
          {movie && <h1 className="text-neutral-100 text-heading2-semibold font-lora">{movie.title}<span className="font-lora text-neutral-400 font-normal"> ({movie.release_date.slice(0, 4)})</span></h1>}
          {movie && <p className="text-neutral-100 text-base-regular font-inter">{movie.release_date}({movie.origin_country}) • {movie.genres.map((item: any) => item.name).join(", ")}</p>}
          <br />
          {movie && <p className="text-neutral-400 text-body-bold font-inter">Rate: <span className="text-neutral-100 font-lora">( <span className="text-primary text-heading2-semibold">{movie.vote_average.toFixed(1)}</span> / 10 )</span></p>}
          <br />
          {movie && <i className="text-neutral-400 text-body-bold font-inter">{movie.tagline}</i>}
          <br />
          {movie && <p className="text-neutral-400 text-body-bold font-inter">Overview: <br /><span className="text-neutral-100 text-base-regular font-medium">{movie.overview}</span></p>}
        </div>
      </div>
    </>
  )
};
