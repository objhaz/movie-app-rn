import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchTopratedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'
import Loading from '../compnents/loading'
import MovieList from '../compnents/movieList'
import TrendingMovies from '../compnents/trendingMovies'
import { styles } from '../theme'


const ios = Platform.OS == 'ios'
export default function HomeScreen(){
    const [topRated, setTopRated] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()

    useEffect(()=>{
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async() =>{
        const data = await fetchTrendingMovies();
        //console.log('got the trending movies', data)
        if(data && data.results) setTrendingMovies(data.results) 
        setLoading(false)
    }

    const getUpcomingMovies = async() =>{
        const data = await fetchUpcomingMovies();
        //console.log('got the upcoming movies', data)
        if(data && data.results) setUpcomingMovies(data.results)
    }

    const getTopRatedMovies = async() =>{
        const data = await fetchTopratedMovies();
        //console.log('got the tprated movies', data)
        if(data && data.results) setTopRated(data.results) 
        setLoading(false)
    }
    return (
        <View className=" flex-1 bg-neutral-800">
        {/* search bar and logo*/}
        <SafeAreaView className={ios?"-mt-2 ": "mt-5"}>
            <StatusBar style='light'/>
            <View className="flex-row justify-between items-center mx-4">
                <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white'/>
                <Text className='text-white text-3xl font-bold'>
                   <Text style={styles.text}>M</Text>ovies
                </Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size='30' strokeWidth={2} color='white'/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        {
            loading? (
                <Loading/>
            ) :
            (<ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:100}}
        >
            {/* Trending Movies carousel */}
            {trendingMovies.length>0 && <TrendingMovies data={trendingMovies}/>}

            {/* upcoming movies */}
            <MovieList title='Upcoming' data={upcomingMovies}/>

            {/* upcoming movies */}
            <MovieList title='TopRated' data={topRated}/>
        </ScrollView>)}
        </View>
    )
}