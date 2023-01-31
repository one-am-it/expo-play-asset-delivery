import ExpoPlayAssetDeliveryModule from './ExpoPlayAssetDeliveryModule';

export async function loadPackedAssetAsBytes(assetName: string): Promise<Uint8Array> {
    return ExpoPlayAssetDeliveryModule.loadPackedAssetAsByteArray(assetName);
}

export async function loadPackedAssetAsBase64(assetName: string): Promise<string> {
    return ExpoPlayAssetDeliveryModule.loadPackedAssetAsBase64(assetName);
}

export async function getAssetPackStates(assetPackNames: string[]): Promise<AssetPackStates> {
    return ExpoPlayAssetDeliveryModule.getAssetPackStates(assetPackNames);
}

export async function requestAssetPackFetch(assetPackNames: string[]): Promise<AssetPackStates> {
    return ExpoPlayAssetDeliveryModule.requestAssetPackFetch(assetPackNames);
}

export type AssetPackStates = Record<AssetPackState['name'], AssetPackState[]>

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