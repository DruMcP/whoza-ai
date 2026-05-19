'use client'

import { useEffect } from 'react'

export default function SampleCallRedirect() {
  useEffect(() => {
    window.location.href = '/'
  }, [])

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <p className="text-white">Redirecting to homepage...</p>
    </div>
  )
}
