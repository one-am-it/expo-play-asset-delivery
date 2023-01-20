package expo.modules.playassetdelivery

import android.content.res.AssetManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import java.util.Base64

class ExpoPlayAssetDeliveryModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoPlayAssetDelivery")

        AsyncFunction("loadPackedAssetAsBytes") { assetName: String, promise: Promise ->
            promise.resolve(readAssetAsBytes(assetName))
        }

        AsyncFunction("loadPackedAssetAsBase64") { assetName: String, promise: Promise ->
            promise.resolve(Base64.getEncoder().encodeToString(readAssetAsBytes(assetName)))
        }
    }

    private val context
        get() = requireNotNull(appContext.reactContext)

    private fun getAssetManager(): AssetManager {
        return context.assets
    }

    private fun readAssetAsBytes(assetName: String): ByteArray {
        val stream = getAssetManager().open(assetName)
        try {
            return stream.readBytes()
        } finally {
            stream.close()
        }
    }
}
