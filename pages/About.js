import React from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";

export default function About(props) {

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <StatusBar style="dark" />
        <ScrollView style={styles.container}>
            <View
            >
                <Image 
                    source={require('../assets/about.jpg')}
                    style={{
                        width: wp(100),
                        height: hp(20)
                    }}
                />
            </View>
            <View
                style={styles.titleContainer}
            >
                <Text
                    style={styles.titleText}
                >
                    ABOUT ME
                </Text>
            </View>
            <View
                style={styles.contentContainer}
            >
                <Text
                    style={styles.contentText}
                >
                    My name is Dongyoon Kim, the developer of this app and a 7th-grade student at Chadwick International. I started to play soccer at a young age. Over the years, the team I was in won the Songdo 7's twice, and the KAIAC soccer tournament once. I also won third in the Songdo 7's once. I have also participated in an international tournament, getting 3rd place in the JSSL 7's.
                </Text>
            </View>
            <View
                style={[styles.titleContainer, {backgroundColor: '#374351', marginHorizontal: 0, paddingHorizontal: hp(2), paddingTop: hp(2)}]}
            >
                <Text
                    style={[styles.titleText, {color: 'white'}]}
                >
                    MOTIVATION
                </Text>
            </View>
            <View
                style={[styles.contentContainer, {backgroundColor: '#374351', marginHorizontal: 0, paddingHorizontal: hp(2), marginTop: 0, paddingTop: hp(3), paddingBottom: hp(2)}]}
            >
                <Text
                    style={[styles.contentText, {color: 'white'}]}
                >
                    Since the age of 9, I have been highly passionate about soccer. As my understanding of soccer grew, I realized that a team couldn't function properly while relying only on one player. The most important part of soccer is teamwork. This aspect of how soccer became the reason why I developed this app. I wanted to contribute to my team as a team member, but also as an individual in society by helping people develop their soccer skills. My app is made to help people who struggle while playing soccer to become both a better player and a teammate. 
                </Text>
            </View>
            <View
                style={styles.titleContainer}
            >
                <Text
                    style={styles.titleText}
                >
                    CONTACT ME
                </Text>
                </View>
            <View
                style={styles.contentContainer}
            >
                <Text
                    style={styles.contentText}
                >
                    Feel free to contact me if you want to collaborate or share any ideas
                    
                </Text>
                <Icon 
                    type="ionicons"
                    name="mail"
                    size={hp(4)}
                    style={{
                        marginTop: hp(3),
                        marginBottom: hp(1)
                    }}
                    color={'#374351'}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        marginBottom: hp(3),
                        fontSize: hp(2),
                        fontWeight: 'bold'
                    }}
                >
                    interkm1@gmail.com
                </Text>
                <Icon 
                    type="ionicons"
                    name="call"
                    size={hp(4)}
                    style={{
                        marginTop: hp(3),
                        marginBottom: hp(1)
                    }}
                    color={'#374351'}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        marginBottom: hp(3),
                        fontSize: hp(2),
                        fontWeight: 'bold'
                    }}
                >
                    +82) 010-8699-2795
                </Text>
            </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    titleContainer: {
        marginTop: hp(3),
        marginHorizontal: hp(2)
    },
    titleText: {
        // fontFamily: 'Helvetica',
        fontSize: hp(3),
        fontWeight: '700'
    },
    subtitleContainer: {
        marginTop: hp(3),
        marginLeft: hp(2)
    },
    subtitleText: {
        // fontFamily: 'Helvetica',
        fontSize: hp(4),
        fontWeight: 'bold'
    },
    contentContainer: {
        marginTop: hp(3),
        marginHorizontal: hp(2)
    },
    contentText: {
        // fontFamily: 'Helvetica',
        fontSize: hp(2),
        lineHeight: hp(3)
    }
})