import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Video } from "expo-av";

export default function Videos(props) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View style={styles.container}>
            {
                isLoading && 
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
                    flex: 1
                }}
                useNativeControls
                resizeMode = {"contain"}
                source={{
                    uri: props.route.params.videoLink
                }}
                onLoadStart={() => setIsLoading(true)}
                onReadyForDisplay={() => {setIsLoading(false)}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
