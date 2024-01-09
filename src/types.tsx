export type SearchParams = {
	filmTitle: string;
	filmYear: string;
};

export type FilmParams = {
	Title: string,
    Year: string,
    imdbID?: string
    Poster: string,
    Type?: string,
    Genre?: string,
    Runtime?: string,
    Director?: string,
    Actors?: string,
    imdbRating?:string,
    status?: string, 
};

