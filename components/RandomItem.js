import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function RandomItem({ videoLink, children }) {
  const [loading, setLoading] = useState(false);

  const player = useVideoPlayer(videoLink, (p) => {
    p.loop = false;
    setLoading(true);
    p.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  useEffect(() => {
    if (isPlaying) setLoading(false);
  }, [isPlaying]);

  return (
    <View
      style={{
        flex: 1,
        height: hp(80),
      }}>
      {loading && (
        <ActivityIndicator
          size='large'
          style={{
            flex: 1,
            position: 'absolute',
            top: '50%',
            left: '45%',
          }}
        />
      )}
      <VideoView
        player={player}
        style={{ flex: 5, zIndex: 1 }}
        nativeControls
        contentFit='contain'
        allowsFullscreen
        allowsPictureInPicture
      />
      {children}
    </View>
  );
}
