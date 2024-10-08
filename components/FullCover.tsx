interface FullCoverProps {
  children: React.ReactNode
}

const FullCover = (props: FullCoverProps) => {
  const { children } = props

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white flex flex-col gap-3 justify-center text-2xl font-bold text-center z-50">
      {children}
    </div>
  )
}

export default FullCover
