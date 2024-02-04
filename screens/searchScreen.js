import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';
import Loading from '../compnents/loading';


const {width, height} = Dimensions.get('window');
const ios = Platform.OS== 'ios'
let movieName ='Ant-Man and Wasp: Quantumania'
const vertMargin = ios? '' : 'mt-4'
export default function SearchScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([]);

    const handleSearch= value=>{
        console.log('value:', value);
        if(value && value.length> 2){
            setLoading(true)
            searchMovies({
                query: value, include_adult: 'false', language: 'en-US', page: '1'
            }).then(data=>{
                
                console.log('got movies', data)
                setLoading(false)
                if(data  && data.results) setResults(data.results)
            })
        }else{
            setLoading(false)
            setResults([])
        }
    }

    const handletextDebose = useCallback(debounce(handleSearch, 500), [])
    return (
    <SafeAreaView className='flex-1 bg-neutral-800 pt-4'>
        <View
        className='mx-4 mb-3 flex-row justify-between border border-neutral-500 rounded-full'
        >
            <TextInput
            onChangeText={handletextDebose}
            placeholder='Search movie'
            placeholderTextColor={'lightgray'}
            className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
            />
            <TouchableOpacity
            onPress={()=> navigation.push('Home')}
            className='rounded-full p-3 m-1 bg-neutral-500'
            >
            <XMarkIcon
            size='23'
            color='white'/>
            </TouchableOpacity>
        </View>
        {/* results */}
        {loading? (
            <Loading/>
        ):
           ( results.length>0? (
                <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
        className='space-y-3'>
            <Text
            className='text-white font-semibold ml-1'
            >
                Results ({results.length})
            </Text>
            <View className='flex-row justify-between flex-wrap '>
                {
                    results.map((item, index )=>{
                        return(
                            <TouchableWithoutFeedback
                            key={index}
                            onPress={()=>navigation.push('Movie', item)}>
                                <View className='space-y-2 mb-4'>
                                <Image
                                className='rounded-3xl'
                                source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                                style={{width:width*0.44, height:height*0.3}}
                                />
                                <Text className='text-neutral-400 ml-1'>
                                   { 
                                   item?.title.length>22? item?.title.slice(0,22)+'...' : item?.title
                                   }
                                </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>
        </ScrollView>
            ) :
            (
                <View className='flex-row justify-center'>
                    <Image
                    source={require('../assets/images/movieTime.png')}
                    className='h-96 w-96'/>
                </View>
            ))
        }
        
    </SafeAreaView>
  )
}
