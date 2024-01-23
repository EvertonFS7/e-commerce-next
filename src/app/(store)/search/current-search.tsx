import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function CurrentSearch() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  return (
    <div>
      <p className="text-sm">
        resultados para: <span className="font-semibold">{query}</span>
      </p>
    </div>
  )
}
