'use client'

import dynamic from 'next/dynamic'
import data from 'mind-elixir/example'

const MindElixirReact = dynamic(() => import('@/components/MindElixirReact'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">Loading...</div>
  ),
})

export default function HomePage() {
  return (
    <div className="h-screen">
      <MindElixirReact
        className='h-full'
        data={data}
        options={{
          toolBar: true,
        }}
      />
    </div>
  )
}
