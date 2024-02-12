import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from '@/components/ModeToggle'

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <div className="w-fit">
          <Image src="" alt="" width={50} height={50} className=""/>
        </div>
      </Link>
      <div className="px-5 flext space-x-2 items-center">
        <ModeToggle />
      </div>

    </header>
  )
}
