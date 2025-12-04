import Image from "next/image"

enum Size {
    xsmall = 40,
    small = 60,
    medium = 100,
    large = 120,
    xlarge = 180
}
interface Props {
    poster_path: string;
    size: "xsmall" | "small" | "medium" | "large" | "xlarge";
}
const MoviePoster = ({ poster_path, size }: Props) => {
    return (
        <div className="relative aspect-2/3" style={{ width: `${Size[size]}px`, height: `${Size[size] * 1.5}px` }}>
            <Image loading="lazy" src={!poster_path || poster_path === "null" || poster_path === "undefined" ? `/assets/no-img.svg` : `https://image.tmdb.org/t/p/w1280${poster_path}`} alt="Movie poster" fill sizes={`${Size[size]}px`} className={`object-cover ${size === "xsmall" || size === "small" ? "rounded-md": "rounded-xl"} border border-border-dark`} />
        </div>
    )
}

export default MoviePoster