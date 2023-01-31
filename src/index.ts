import {EventEmitter, requireNativeModule} from "expo-modules-core";

const moduleEventEmitter = new EventEmitter(requireNativeModule('ExpoPlayAssetDelivery'));

/**
 * Loads an asset from an asset pack and returns the content as a byte array.
 * @param assetName Name/path of the asset to load
 * @param assetPackName Name of the asset pack containing the asset. This should not be specified for install-time asset packs.
 */
export async function loadPackedAssetAsBytes(assetName: string, assetPackName?: string): Promise<Uint8Array> {
    return requireNativeModule('ExpoPlayAssetDelivery').loadPackedAssetAsByteArray(assetName, assetPackName);
}

/**
 * Loads an asset from an asset pack and returns the content as a base64-encoded string.
 * @param assetName Name/path of the asset to load
 * @param assetPackName Name of the asset pack containing the asset. This should not be specified for install-time asset packs.
 */
export async function loadPackedAssetAsBase64(assetName: string, assetPackName?: string): Promise<string> {
    return requireNativeModule('ExpoPlayAssetDelivery').loadPackedAssetAsBase64(assetName, assetPackName);
}

export async function getAssetPackStates(assetPackNames: string[]): Promise<AssetPackStates> {
    return requireNativeModule('ExpoPlayAssetDelivery').getAssetPackStates(assetPackNames);
}

export async function requestAssetPackFetch(assetPackNames: string[]): Promise<AssetPackStates> {
    return requireNativeModule('ExpoPlayAssetDelivery').requestAssetPackFetch(assetPackNames);
}

export function addAssetPackProgressListener(callback: (state: AssetPackState) => void) {
    return moduleEventEmitter.addListener('onAssetPackStateUpdate', callback);
}

export type AssetPackStates = Record<AssetPackState['name'], AssetPackState>

export interface AssetPackState {
    name: string;
    status: AssetPackStatus;
    errorCode?: number;
    bytesDownloaded: number;
    totalBytesToDownload: number;
    transferProgressPercentage: number;
}

export enum AssetPackStatus {
    UNKNOWN = 0,
    PENDING = 1,
    DOWNLOADING = 2,
    TRANSFERRING = 3,
    COMPLETED = 4,
    FAILED = 5,
    CANCELED = 6,
    WAITING_FOR_WIFI = 7,
    NOT_INSTALLED = 8,
}