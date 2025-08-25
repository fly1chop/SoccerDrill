// Videos.js (JavaScript)
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function Videos({ route }) {
  const { videoLink } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  // Create a player for this video URL
  const player = useVideoPlayer(videoLink, (p) => {
    p.loop = false;
    setIsLoading(true);
    p.play(); // returns void
  });

  // When playback starts, hide the loader
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  useEffect(() => {
    if (isPlaying) setIsLoading(false);
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size='large' style={styles.loader} />}

      <VideoView
        player={player}
        style={styles.video}
        contentFit='contain' // like ResizeMode.CONTAIN
        allowsFullscreen
        allowsPictureInPicture
        onError={() => setIsLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  video: { flex: 1 },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '45%',
  },
});
