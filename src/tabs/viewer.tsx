import { RedocStandalone } from "redoc"

import { useSpecSource } from "~useSpecSource"

const Viewer: React.FC = () => {
  const specSource = useSpecSource()

  return (
    <div>
      {specSource ? (
        <>
          <a href={specSource.url}>Back to {specSource.url}</a>
          <RedocStandalone spec={specSource.spec} />
        </>
      ) : (
        <p
          style={{
            color: "tomato"
          }}>
          Something went wrong
        </p>
      )}
    </div>
  )
}

export default Viewer
