import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Settings(props) {

    return (
        <View style={styles.container}>
            <Button 
                title="Go To Home"
                onPress={() => {
                    props.navigation.navigate("Home");
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    }
})