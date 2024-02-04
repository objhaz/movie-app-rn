import axios from "axios";
import { apiKey } from "../constants";

// dynamic endpoint
const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey }`
const movieCreditEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey }`
const movieSimilarEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey }`


// endpoints
const apiBaseUrl = `https://api.themoviedb.org/3`
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

const personDtailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey }`
const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey }`
 

export const image500 =path=> path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 =path=> path? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 =path=> path? `https://image.tmdb.org/t/p/w185${path}` : null;

// fallback images 
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';


{/* create function to call the api */}
const apiCall = async (endpoint, params) =>{
    const options ={
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    }

    try{
        const response = await axios.request(options);
        return response.data;
    } catch(error){
        console.log('error', error.type);
        return {}
    }
}

export const fetchTrendingMovies = () =>{
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () =>{
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopratedMovies = () =>{
    return apiCall(topRatedMoviesEndpoint);
}

export const fetctMovieDetails = id=>{
    return apiCall(movieDetailsEndpoint(id));
}

export const fetchMovieCredits = id=>{
    return apiCall(movieCreditEndpoint(id));
}

export const fetctMovieSimilar = id=>{
    return apiCall(movieSimilarEndpoint(id));
}
export const fetctPersonDetials = id=>{
    return apiCall(personDtailsEndpoint(id));
}

export const fetctPersonMovies = id=>{
    return apiCall(personMoviesEndpoint(id));
}

export const searchMovies = params=>{
    return apiCall(searchMoviesEndpoint, params);
}