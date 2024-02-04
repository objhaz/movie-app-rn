import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
import { styles } from '../theme';

var {width, height} = Dimensions.get('window');

export default function MovieList({title, data , hideSeeAll}) {
    const navigation = useNavigation();
    let movieName = 'Ant-Man and the Wasp: Quantumania';
  return (
    <View className='mb-8 space-y-4'>
        <View className='mx-4 flex-row justify-between items-center'>
        
            <Text className='text-white text-xl '>{title}</Text>
        {!hideSeeAll && (
        <TouchableOpacity>
            <Text style={styles.text} className='text-lg'>See All</Text>
        </TouchableOpacity>
        )
    }
        </View>
        {/* movies row */}
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
        >
            {
                data.map((item, index) =>{
                    return(
                        <TouchableWithoutFeedback
                        key={index}
                        onPress={()=> navigation.push('Movie', item)}
                        >
                            <View className='space-y-1 mr-4 mb-5'>
                                <Image
                                source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                                style={{width: width*0.33, height: height*0.33}}
                                />
                              
                            <Text className='text-neutral-300 ml-1 mb-3'>{item.title.length>14? item.title.slice(0,14)+'...' : item.title}</Text>
                            </View> 
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </ScrollView>
    </View>
  )
}
