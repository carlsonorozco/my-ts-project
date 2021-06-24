import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

export async function handleEvent(event: FetchEvent): Promise<Response> {
  const testResponse = await getAssetFromKV(event, {
    mapRequestToAsset: request => {
      return new Request(`https://example.com/error/404.html`, event.request)
    }
  })
  const response = new Response(testResponse.body, { ...testResponse, status: 404 })
  return response
}
