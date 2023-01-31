# expo-play-asset-delivery

Play Asset Delivery integration for Expo

## Installation

- Configure Expo Plugin in `app.config.js`
  ```js
  module.exports = {
      // ...
      plugins: [
          // ...
          [
              'expo-play-asset-delivery',
              [
                  {
                      // Internal name of the asset pack
                      name: 'asset-pack',
                      // Path of the assets directory relative to the (Expo) project root folder
                      path: 'assets',
                      // Delivery mode (see https://developer.android.com/guide/playcore/asset-delivery#delivery-modes)
                      deliveryMode: 'fast-follow',
                  },
              ],
          ],
      ],
  };
  ```
  
- :warning: **If you are using bare workflow** (if you don't know what it is you aren't):
  - Run `npx expo prebuild --clean` to regenerate the build files (this must be done after every change to the plugin configuration)
- :warning: **If you are using `expo-dev-client`** (if you don't know what it is you aren't):
  - The dev client must be rebuilt every time the plugin configuration changes or the assets are changed

## Usage

If you are using `fast-follow` or `on-demand` delivery modes, you **must** check the status of the asset pack before
trying to access the assets:
```js
import { getAssetPackStates, requestAssetPackFetch, AssetPackStatus } from 'expo-play-asset-delivery';

const state = await getAssetPackStates(['asset-pack'])['asset-pack']
if (state.status !== AssetPackStatus.COMPLETED) {
    await requestAssetPackFetch(['asset-pack']);
    // ...
}
```

After requesting the download of the asset pack, you can add an event listener to monitor the download progress:
```js
import { addAssetPackProgressListener, AssetPackState } from 'expo-play-asset-delivery';

addAssetPackProgressListener((state: AssetPackState) => {
    // ...
});
```

Regardless of the delivery mode, you can load the assets by their filename:

```js
import { loadPackedAssetAsBase64 } from 'expo-play-asset-delivery';

const base64 = await loadPackedAssetAsBase64('asset-pack', 'assets/image.png');
const uri = `data:image/png;base64,${base64}`;

// ...

return (
  <Image source={{ uri }} />
)
```

## Development
In order to access the asset packs during development, you must install `expo-dev-client` and configure it to build as AAB:
```json
{
  "build": {
    "development": {
      "android": {
        "gradleCommand": ":app:bundleDebug"
      }
    }
  }
}
```

You can then use [bundletool](https://github.com/google/bundletool) to create and install the APK including the asset packs (you can download the keystore with the alias/passwords from Expo):
```sh
java -jar bundletool-all-*.jar build-apks --bundle=build-1674208169858.aab --output output.apks --local-testing --ks=keystore.jks --ks-key-alias=<keyalias>
java -jar bundletool-all-*.jar install-apks --apks=output.apks
```