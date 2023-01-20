import ExpoPlayAssetDeliveryModule from './ExpoPlayAssetDeliveryModule';

export async function loadPackedAssetAsBytes(assetName: string): Promise<Uint8Array> {
  return ExpoPlayAssetDeliveryModule.loadPackedAssetAsByteArray(assetName);
}

export async function loadPackedAssetAsBase64(assetName: string): Promise<string> {
  return ExpoPlayAssetDeliveryModule.loadPackedAssetAsBase64(assetName);
}