import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AirbnbRating, Icon } from '@rneui/themed';
import * as Application from 'expo-application';
import { StatusBar } from 'expo-status-bar';
import { randomVideoAtom, videoAtom } from '../store';
import { useAtom } from 'jotai';
import RandomItem from '../components/RandomItem';

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

export default function Random(props) {
  const [videos, setVideos] = useAtom(videoAtom);
  const [randomVideos, setRandomVideos] = useAtom(randomVideoAtom);
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    const getDeviceId = async () => {
      let uniqueId;
      if (Platform.OS === 'android') {
        uniqueId = Application.getAndroidId();
      } else {
        uniqueId = await Application.getIosIdForVendorAsync();
      }
      setDeviceId(uniqueId || '');
    };
    getDeviceId();
  }, []);

  const updateLikes = async (name) => {
    // Update main list
    const updatedVideos = videos.map((item) => {
      if (item.name !== name) return item;
      const current = Array.isArray(item.likes) ? item.likes : [];
      const next = current.includes(deviceId)
        ? current.filter((a) => a !== deviceId)
        : current.concat([deviceId]);
      // Best-effort persist; don't let failures crash UI
      if (item.id) {
        try {
          updateDoc(doc(db, 'videos', item.id), { likes: next });
        } catch {}
      }
      return { ...item, likes: next };
    });
    setVideos(updatedVideos);

    // Update random list
    const updatedRandom = randomVideos.map((item) => {
      if (item.name !== name) return item;
      const current = Array.isArray(item.likes) ? item.likes : [];
      const next = current.includes(deviceId)
        ? current.filter((a) => a !== deviceId)
        : current.concat([deviceId]);
      return { ...item, likes: next };
    });
    setRandomVideos(updatedRandom);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      {
        // loading ?
        //     <ActivityIndicator style={{marginTop: hp(40)}} />
        // :
        <ScrollView snapToInterval={hp(80)} decelerationRate={'fast'}>
          {randomVideos.map((el, ind) => (
            <RandomItem key={ind} videoLink={el['url']}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'black',
                  paddingTop: hp(5),
                }}>
                <View
                  style={{
                    zIndex: 999999,
                    position: 'absolute',
                    bottom: 30,
                    left: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: hp(2),
                    }}>
                    {el['description']}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      marginTop: hp(1),
                    }}>
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
                      color: 'white',
                      marginTop: hp(1),
                    }}>
                    Source:{' '}
                    <Text style={{ fontSize: hp(1.2) }}>
                      https://www.youtube.com/watch?v=z7jP3moQi9c
                    </Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        padding: hp(0.5),
                        borderRadius: hp(1),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: el['likes'].includes(deviceId) ? '#ea4c89' : 'white',
                        marginTop: hp(1),
                        zIndex: 999999,
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
                </View>
              </View>
            </RandomItem>
          ))}
        </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
