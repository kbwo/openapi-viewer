import yaml from "js-yaml"
import { useEffect, useState } from "react"

export const KEY = "openapi_viewer"

type SpecSource = {
  url: string
  spec: string
}
type ParsedSpecSource = {
  url: string
  spec: object
}
export const useSpecSource = (): ParsedSpecSource | undefined => {
  const [parsedSpecSource, setParsedSpecSource] = useState<ParsedSpecSource>()
  useEffect(() => {
    chrome.storage.local.get(KEY, (item) => {
      const specSource: SpecSource = item[KEY]
      if (!specSource) {
        //@TODO show error
      }
      if (
        specSource?.url?.includes("yaml") ||
        specSource?.url?.includes("yml")
      ) {
        const json = yaml.load(specSource.spec) as object
        setParsedSpecSource({
          url: specSource.url,
          spec: json
        })
        return
      }
      setParsedSpecSource({
        url: specSource.url,
        spec: JSON.parse(specSource.spec)
      })
    })
  }, [])
  return parsedSpecSource
}
