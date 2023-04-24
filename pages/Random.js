import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, query, orderBy, limit, collection, getDocs, addDoc, updateDoc } from 'firebase/firestore';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AirbnbRating, Icon } from "@rneui/themed";
import * as Application from 'expo-application';
import { videoRecoil, randomVideoRecoil } from "../recoil/recoil";
import { useRecoilState } from "recoil";
import { StatusBar } from "expo-status-bar";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCHe56RphtfcbskiaY4gs3rS3nQrZ1oaR8",
    authDomain: "soccerdrill-cee79.firebaseapp.com",
    projectId: "soccerdrill-cee79",
    storageBucket: "soccerdrill-cee79.appspot.com",
    messagingSenderId: "201994231230",
    appId: "1:201994231230:web:d4c7d95db6394318052def",
    measurementId: "G-26QT5KTLQV"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default function Random(props) {
    const [videos, setVideos] = useRecoilState(videoRecoil);
    const [randomVideos, setRandomVideos] = useRecoilState(randomVideoRecoil);
    const [loading, setLoading] = React.useState(false);
    const [textLoaded, setTextLoaded] = React.useState(false);
    const [deviceId, setDeviceId] = React.useState("");

    useEffect(() => {
        const getDeviceId = async () => {
            var uniqueId;
            if(Platform.OS == 'android')
            {
                uniqueId = Application.androidId;
            }
            else
            {
                uniqueId = await Application.getIosIdForVendorAsync();
            }
            setDeviceId(uniqueId);
        }
        getDeviceId();
    }, [])


    const updateLikes = async (name, tempArray) => {
        let newVideos = [...videos].map((item, index) => {
            if (name == item.name) {
                let temp = item['likes']
                var newArray = [];
                if(temp.includes(deviceId))
                {
                    var newArray = temp.filter(a =>
                        a !== deviceId
                    )
                }
                else
                {
                    var newArray = temp.concat([deviceId]);
                }
                // console.log(newArray)
                const videoRef = doc(db, "videos", item['id']);
                updateDoc(videoRef, {
                    likes: newArray
                })
                console.log(newArray)
                return { ...item, likes: newArray}
            }
            else return item;
          });
        setVideos(newVideos)

        let newVideos2 = [...randomVideos].map((item, index) => {
            if (name == item.name) {
                let temp = item['likes']
                var newArray = [];
                if(temp.includes(deviceId))
                {
                    var newArray = temp.filter(a =>
                        a !== deviceId
                    )
                }
                else
                {
                    var newArray = temp.concat([deviceId]);
                }
                
                return { ...item, likes: newArray}
            }
            else return item;
          });
        setRandomVideos(newVideos2);
    }

    useEffect(() => { // Function that gets called as soon as the page is created
        // randomizeVideos();
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            {
                // loading ?
                //     <ActivityIndicator style={{marginTop: hp(40)}} />
                // :
                <ScrollView
                    snapToInterval={hp(80)}
                    decelerationRate={'fast'}
                >
                {
                randomVideos.map((el, ind) => (
                <View
                    style={{
                        flex: 1,
                        height: hp(80)
                    }}
                    key={ind}
                >
                    {
                        loading && 
                        <ActivityIndicator 
                            size="large"
                            style={{
                                flex: 1,
                                position: "absolute",
                                top: "50%",
                                left: "45%"
                            }}
                        />
                    }
                    <Video 
                        style={{
                            flex: 5,
                            zIndex: 1
                        }}
                        useNativeControls
                        resizeMode = {"contain"}
                        source={{
                            uri: el['url']
                        }}
                        key={ind}
                        onLoadStart={() => setLoading(true)}
                        onReadyForDisplay={() => {
                            setLoading(false);
                            setTextLoaded(true);
                        }}
                    >
                    </Video>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'black',
                            paddingTop: hp(5)
                        }}
                    >
                    {
                            textLoaded &&
                            <View
                            style={{
                                zIndex: 999999,
                                position: 'absolute',
                                bottom: 30,
                                left: 10,
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: hp(2)
                            }}>
                                {el['description']}
                            </Text>
                            <Text style={{
                                color: 'white',
                                marginTop: hp(1)
                            }}>
                                Difficulty: <AirbnbRating 
                                size={20} 
                                isDisabled={true} 
                                defaultRating={el['difficulty']} 
                                showRating={false} 
                                starContainerStyle={{height: hp(2)}}
                                ratingContainerStyle={{height: hp(2)}}
                                />
                            </Text>
                            <Text
                                style={{
                                    fontSize: hp(1.5),
                                    color: 'white',
                                    marginTop: hp(1)
                                }}
                            >
                                Source: <Text style={{fontSize: hp(1.2)}}>https://www.youtube.com/watch?v=z7jP3moQi9c</Text>
                            </Text>
                            <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    padding: hp(0.5),
                                    borderRadius: hp(1),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: el['likes'].includes(deviceId) ? '#ea4c89' : 'white',
                                    marginTop: hp(1),
                                    zIndex: 999999
                                }}
                                onPress={() => {
                                    updateLikes(el["name"], el['likes'])
                                }}
                            >
                                <Icon 
                                    type="ionicon"
                                    name={el['likes'].includes(deviceId) ? "heart" : "heart-outline"}
                                    size={hp(2)}
                                    color={el['likes'].includes(deviceId) ? "white" : '#ea4c89'}
                                />
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        color: el['likes'].includes(deviceId) ? "white" : '#ea4c89',
                                        marginLeft: hp(1)
                                    }}
                                >
                                    {el['likes'].length}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        }
                    </View>
                    </View>
                ))
                }
                </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})