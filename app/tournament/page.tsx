const HEIGHT = 32
const WIDTH = HEIGHT * 3

const TournamentPage = () => {
  const count = 4

  return (
    <div className="mb-3">
      <div className="text-center">
        <svg className="bg-gray-100 w-full aspect-square">
          {Array(count).fill(true).map((_, index) => {
            const x = HEIGHT
            const y = HEIGHT + HEIGHT * index

            return (
              <text fontSize={HEIGHT / 2} x={x} y={y} key={index}>
                Player{index + 1}
              </text>
            )
          })}

          {/* 1回戦の横線 */}
          {Array(count).fill(true).map((_, index) => {
            const x1 = HEIGHT + WIDTH
            const x2 = HEIGHT + WIDTH + HEIGHT

            const y1 = HEIGHT + HEIGHT * index - HEIGHT * 0.25
            const y2 = HEIGHT + HEIGHT * index - HEIGHT * 0.25

            return (
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" key={index} />
            )
          })}

          {/* 1回戦の縦線 */}
          {Array(count).fill(true).map((_, index) => {
            if (index % 2 !== 0) return null

            const x1 = HEIGHT + WIDTH + HEIGHT
            const y1 = HEIGHT + HEIGHT * index - HEIGHT * 0.25

            const x2 = HEIGHT + WIDTH + HEIGHT
            const y2 = HEIGHT + HEIGHT * (index + 1) - HEIGHT * 0.25

            return (
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" key={index} />
            )
          })}


          {/* 2回戦の横線 */}
          {Array(count).fill(true).map((_, index) => {
            if (index % 2 !== 0) return null

            const x1 = HEIGHT + WIDTH + HEIGHT
            const x2 = HEIGHT + WIDTH + HEIGHT + HEIGHT

            const y1 = HEIGHT + HEIGHT * (index + 0.5) - HEIGHT * 0.25
            const y2 = HEIGHT + HEIGHT * (index + 0.5) - HEIGHT * 0.25

            return (
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" key={index} />
            )
          })}

          {/* 2回戦の縦線 */}
          {Array(count).fill(true).map((_, index) => {
            if (index % 4 !== 0) return null

            const x1 = HEIGHT + WIDTH + HEIGHT + HEIGHT
            const y1 = HEIGHT + HEIGHT * (index + 0.5) - HEIGHT * 0.25

            const x2 = HEIGHT + WIDTH + HEIGHT + HEIGHT
            const y2 = HEIGHT + HEIGHT * (index + 2.5) - HEIGHT * 0.25

            return (
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" key={index} />
            )
          })}

          {/* 3回戦の横線 */}
          {Array(count).fill(true).map((_, index) => {
            if (index % 4 !== 0) return null

            const x1 = HEIGHT + WIDTH + HEIGHT + HEIGHT
            const x2 = HEIGHT + WIDTH + HEIGHT + HEIGHT + HEIGHT

            const y1 = HEIGHT + HEIGHT * (index + 1.5) - HEIGHT * 0.25
            const y2 = HEIGHT + HEIGHT * (index + 1.5) - HEIGHT * 0.25

            return (
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" key={index} />
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default TournamentPage
