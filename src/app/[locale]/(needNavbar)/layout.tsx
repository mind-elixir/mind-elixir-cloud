import NavBar from '@/components/NavBar'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 p-5">
        <NavBar className="max-w-4xl mx-auto" />
      </div>
      {children}
    </>
  )
}
