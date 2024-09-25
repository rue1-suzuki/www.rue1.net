interface HeaderProps {
  children: React.ReactNode
}

const Header = (props: HeaderProps) => {
  const { children } = props

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-gray-500 text-white py-2 text-center">
        <h1 className="text-2xl font-bold">
          {children}
        </h1>
      </div>

      <div className="mt-14" />
    </>
  )
}

export default Header
