'use client'

import 'react-outliner-neo/style.css'

// Components
import { ClientWrapper } from './components/ClientComponents'

// 主页面组件
export default function MapSharePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <ClientWrapper params={params} />
  )
}
