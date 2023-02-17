import { useSpecSource } from "~useSpecSource"

function IndexPopup() {
  const specSource = useSpecSource()
  const viewDoc = () => {
    chrome.tabs.create({
      url: "tabs/viewer.html"
    })
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 240
      }}>
      {specSource && (
        <>
          <p>Target document:</p>
          <p>{specSource.url}</p>
        </>
      )}
      <button onClick={viewDoc}>View with Redoc</button>
    </div>
  )
}

export default IndexPopup
