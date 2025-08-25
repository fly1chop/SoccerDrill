import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  query,
  orderBy,
  limit,
  collection,
  getDocs,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { AirbnbRating } from '@rneui/themed';
import * as Application from 'expo-application';
import Image from 'react-native-image-progress';
import { videoAtom, randomVideoAtom, showHomeAtom, showSearchAtom } from '../store';
import { StatusBar } from 'expo-status-bar';
import { useAtom } from 'jotai';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCHe56RphtfcbskiaY4gs3rS3nQrZ1oaR8',
  authDomain: 'soccerdrill-cee79.firebaseapp.com',
  projectId: 'soccerdrill-cee79',
  storageBucket: 'soccerdrill-cee79.appspot.com',
  messagingSenderId: '201994231230',
  appId: '1:201994231230:web:d4c7d95db6394318052def',
  measurementId: 'G-26QT5KTLQV',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default function Search(props) {
  const [videos, setVideos] = useAtom(videoAtom);

  const [randomVideos, setRandomVideos] = useAtom(randomVideoAtom);

  const [filteredVideos, setFilteredVideos] = React.useState([]);
  const [deviceId, setDeviceId] = React.useState('');

  const [homeVideos, setHomeVideos] = useAtom(showHomeAtom);
  const [searchVideos, setSearchVideos] = useAtom(showSearchAtom);

  useEffect(() => {
    const getDeviceId = async () => {
      var uniqueId;
      if (Platform.OS == 'android') {
        uniqueId = Application.androidId;
      } else {
        uniqueId = await Application.getIosIdForVendorAsync();
      }
      setDeviceId(uniqueId);
    };
    getDeviceId();
  });

  // const getVideos = async() => {
  //     const ref = collection(db, "videos");
  //     const q = query(ref, limit(10));
  //     const querySnapshot = await getDocs(q);
  //     let tempArray = [];
  //     querySnapshot.forEach((doc) => {
  //         let data = doc.data();
  //         let tempDict = {};
  //         tempDict['id'] = doc.id
  //         tempDict['thumbnail'] = data['thumbnail'];
  //         tempDict['description'] = data['description'];
  //         tempDict['difficulty'] = data['difficulty'];
  //         tempDict['name'] = data['name'];
  //         tempDict['url'] = data['url'];
  //         tempDict['likes'] = data['likes'] ? data['likes'] : [];
  //         tempArray.push(tempDict);
  //     });
  //     setVideos(tempArray);
  //     setFilteredVideos(tempArray);
  // }

  const filterVideos = (text) => {
    let newVideos = [...videos].filter((item, index) => {
      if (item['description']) {
        return item.description.toUpperCase().includes(text.toUpperCase());
      }
    });
    setFilteredVideos(newVideos);
  };

  const updateLikes = async (name, tempArray) => {
    let newVideos = [...videos].map((item, index) => {
      if (name == item.name) {
        let temp = item['likes'];
        var newArray = [];
        if (temp.includes(deviceId)) {
          var newArray = temp.filter((a) => a !== deviceId);
        } else {
          var newArray = temp.concat([deviceId]);
        }
        // console.log(newArray)
        const videoRef = doc(db, 'videos', item['id']);
        updateDoc(videoRef, {
          likes: newArray,
        });
        console.log(newArray);
        return { ...item, likes: newArray };
      } else return item;
    });
    setVideos(newVideos);
    var homeLength = homeVideos.length;
    setHomeVideos(newVideos.slice(0, homeLength));
    var searchLength = searchVideos.length;
    setSearchVideos(newVideos.slice(0, searchLength));

    let newVideos2 = [...randomVideos].map((item, index) => {
      if (name == item.name) {
        let temp = item['likes'];
        var newArray = [];
        if (temp.includes(deviceId)) {
          var newArray = temp.filter((a) => a !== deviceId);
        } else {
          var newArray = temp.concat([deviceId]);
        }

        return { ...item, likes: newArray };
      } else return item;
    });
    setRandomVideos(newVideos2);
  };

  useEffect(() => {
    // getVideos();
    setFilteredVideos(videos);
  }, [videos]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar style='dark' />
      <ScrollView style={styles.container}>
        <Input
          placeholder='Search'
          leftIcon={<Icon type='ionicon' name='search-outline' />}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: '#d1d3d6',
            marginTop: hp(2),
            borderRadius: 10,
            paddingHorizontal: hp(1),
          }}
          onChangeText={filterVideos}
        />
        {filteredVideos.slice(0, 10).map((el, ind) => (
          <TouchableOpacity
            style={styles.boxContainer}
            key={ind}
            onPress={() => {
              props.navigation.navigate('Videos', {
                videoLink: el['url'],
              });
            }}>
            <Image source={{ uri: el['thumbnail'] }} style={styles.image} />
            <Text style={styles.description}>{el['description']}</Text>
            <Text style={styles.difficulty}>
              Difficulty:{' '}
              <AirbnbRating
                size={20}
                isDisabled={true}
                defaultRating={el['difficulty']}
                showRating={false}
                starContainerStyle={{ height: hp(2) }}
                ratingContainerStyle={{ height: hp(2) }}
              />
            </Text>
            <Text
              style={{
                fontSize: hp(1.5),
              }}>
              Source:{' '}
              <Text style={{ fontSize: hp(1.2) }}>https://www.youtube.com/watch?v=z7jP3moQi9c</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(2),
              }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  padding: hp(0.5),
                  borderRadius: hp(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: el['likes'].includes(deviceId) ? '#ea4c89' : 'white',
                  borderColor: '#ea4c89',
                }}
                onPress={() => {
                  updateLikes(el['name'], el['likes']);
                }}>
                <Icon
                  type='ionicon'
                  name={el['likes'].includes(deviceId) ? 'heart' : 'heart-outline'}
                  size={hp(2)}
                  color={el['likes'].includes(deviceId) ? 'white' : '#ea4c89'}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: el['likes'].includes(deviceId) ? 'white' : '#ea4c89',
                    marginLeft: hp(1),
                  }}>
                  {el['likes'].length}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    margin: hp(2),
    borderRadius: hp(2),
    height: hp(40),
    padding: hp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
  image: {
    backgroundColor: 'gray',
    height: hp(20),
    borderRadius: hp(1),
  },
  description: {
    fontSize: hp(2),
    fontWeight: 'bold',
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  difficulty: {
    height: hp(3),
    marginBottom: hp(1),
  },
});
