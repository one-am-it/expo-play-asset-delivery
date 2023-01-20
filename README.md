# expo-play-asset-delivery

Play Asset Delivery integration for Expo

**Note that currently only `install-time` delivery mode is supported**

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
                      path: 'assets'
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

### Load and show image from asset pack
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