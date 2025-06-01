'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Image
          src="/assets/404.svg"
          alt="404"
          width={400}
          height={300}
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg mb-8">The page you are looking for does not exist.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  )
}
