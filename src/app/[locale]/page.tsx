'use client'

import data from 'mind-elixir/example'
import NavBar from '@/components/NavBar'

import { MindMap } from '@/components/ui/mindmap'

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 p-5">
        <NavBar className="max-w-4xl mx-auto" />
      </div>
      <div className="h-[50vh] w-[50vw]">
        <MindMap className="h-full w-full" data={data} />
      </div>
    </div>
  )
}
