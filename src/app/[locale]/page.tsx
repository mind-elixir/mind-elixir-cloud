'use client'

import dynamic from 'next/dynamic'
import data from 'mind-elixir/example'
import NavBar from '@/components/NavBar'

const MindElixirReact = dynamic(() => import('@/components/MindElixirReact'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">Loading...</div>
  ),
})

export default function HomePage() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 p-5">
        <NavBar className="max-w-4xl mx-auto" />
      </div>
      <div className="h-screen">
        <MindElixirReact
          className="h-full"
          data={data}
          options={{
            toolBar: true,
          }}
        />
      </div>
    </div>
  )
}
