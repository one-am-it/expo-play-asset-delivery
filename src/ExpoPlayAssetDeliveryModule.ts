import {EventEmitter, requireNativeModule} from 'expo-modules-core';
import {AssetPackState} from "./index";

const module = requireNativeModule('ExpoPlayAssetDelivery');

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
export default module;

const emitter = new EventEmitter(module);

export const addAssetPackProgressListener = (callback: (state: AssetPackState) => void) => {
    return emitter.addListener('onAssetPackStateUpdate', callback);
}
