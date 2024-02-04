import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fallbackMoviePoster, fetchMovieCredits, fetctMovieDetails, fetctMovieSimilar, image500 } from '../api/moviedb';
import Cast from '../compnents/cast';
import Loading from '../compnents/loading';
import MovieList from '../compnents/movieList';
import { styles, theme } from '../theme';

var {width, height} = Dimensions.get("window")
const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-5'
let movieName = 'Ant-Man and the Wasp: Quantumania';

export default function MovieScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const [favourite, setfavourite] = useState(false);
    const {params: item} = useRoute();
    const [cast, setCast] = useState([ ])
    const [similarMovies, setSimilarMovies] = useState([])
    const [movieState, setMovieState] = useState({})
    useEffect(()=>{
       // console.log('item id', item.id)
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetails = async id=>{
        const data = await fetctMovieDetails(id);
        //console.log('movie details', data)
        if(data) setMovieState(data)
        setLoading(false)
    }

    const getSimilarMovies = async id=>{
        const data = await fetctMovieSimilar(id);
        console.log('movie similar', data)
        if(data && data.results) setSimilarMovies(data.results)
        setLoading(false)
    }

    const getMovieCredits = async id=> {
        const data = await fetchMovieCredits(id)
        //console.log('movie credits', data)
        if(data && data.cast) setCast(data.cast);
    }
  return (
   <ScrollView
   contentContainerStyle={{paddingBottom:20}}
   className='flex-1 bg-neutral-900'
   >
    {/* back buttom and movie poster */}
    <View className='w-full'>
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+ topMargin}>
        <TouchableOpacity style={styles.background} className='rounded-xl p-1 ' onPress={()=> navigation.goBack()}>
        <ChevronLeftIcon size='26' strokeWidth={2.5} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setfavourite(!favourite)}>
        <HeartIcon size='35' color={favourite? theme.background : 'white'} />
        </TouchableOpacity>
        </SafeAreaView>
        {
            loading? (
                <Loading/>
            ):
            (<View>
            <Image
            source={{uri: image500(movieState?.poster_path) || fallbackMoviePoster}}
            style={{width, height: height*0.55}}
            />
            <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
            style={{width, height:height*0.4}}
            start={{x:0.5, y:0}}
            end={{x:0.5, y:1}}
            className="absolute bottom-0"
            />
        </View>)
        }
    </View>
    {/* movie details */}
    <View>
        {/* title */}
        <Text className='text-white text-center text-3xl font-bold tracking-wider'>
            {
                movieState?.title
            }
        </Text>
        {/* status, release and runtime */}
        {
            movieState?.id?(
                <Text className='text-neutral-400 font-semibold text-base text-center'>
            {movieState?.status} * {movieState?.release_date?.split('-')[0]} * {movieState?.runtime} min
        </Text>
            ): null
        }
        
        <View className='flex-row justify-center mx-4 space-x-2'>
        
        {
            movieState?.genres?.map((genre, index)=>{
                let showdot = index+1 != movieState.genres.length;
                return (
                    <Text key={index} className='text-neutral-400 font-semibold text-base text-center'>
            {genre?.name} {showdot? '*' : null}
        </Text>
                )
            })
        }

        {/* <Text className='text-neutral-400 font-semibold text-base text-center'>
            Action * 
        </Text>
        <Text className='text-neutral-400 font-semibold text-base text-center'>
            Thrill * 
        </Text>
        <Text className='text-neutral-400 font-semibold text-base text-center'>
            Comedy * 
        </Text> */}
        </View>
        {/* description */}
        <Text className='text-neutral-400 mx-4 tracking-wide'>
        {movieState.overview}
        </Text>
    </View>
    {/* cast */}
    <Cast cast={cast} navigation={navigation}/>
    {/* similar movies */}
    <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies}/>
   </ScrollView>
  )
}

