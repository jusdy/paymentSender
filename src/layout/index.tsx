interface LayoutTypes {
  children: React.ReactNode;
}

const AppLayout = ({
  children
}: LayoutTypes) => {
  return (
    <>
    {children}
    </>
  )
}

export default AppLayout;