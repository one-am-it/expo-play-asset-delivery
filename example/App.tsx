import {Image, StyleSheet, View} from 'react-native';

import * as ExpoPlayAssetDelivery from '@one-am/expo-play-asset-delivery';
import {useEffect, useState} from "react";

export default function App() {
    const [imageData, setImageData] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setImageData(await ExpoPlayAssetDelivery.loadPackedAssetAsBase64('trees.jpeg'));
        })()
    }, [])

    return (
        <View style={styles.container}>
            {imageData && <Image
                source={{uri: 'data:image/png;base64,' + imageData}}
                resizeMode={'contain'}
                style={{ width: '100%', height: '100%' }}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
