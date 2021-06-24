import { handleEvent } from '../src/handler'
import {makeEdgeEnv, EdgeKVNamespace} from 'edge-mock'

const kv_namespace = new EdgeKVNamespace()

describe('handle', () => {
  beforeEach(() => {
    kv_namespace._clear()
    makeEdgeEnv({
      __STATIC_CONTENT: kv_namespace,
      __STATIC_CONTENT_MANIFEST: kv_namespace._manifestJson(),
    })
    jest.resetModules()
  })

  test('handle GET', async () => {
    const fetchEvent = new FetchEvent('fetch', {
      request: new Request('/', { method: 'GET' })
    })
    const result = await handleEvent(fetchEvent)
    expect(result.status).toEqual(200)
  })
})
