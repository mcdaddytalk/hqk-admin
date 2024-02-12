"use client"

import React, { useEffect, useState } from 'react'
import { Plugin } from '@/types'
import { Button } from '../ui/button'
import DataTable from './DataTable'
import { columns } from './columns'
import { Skeleton } from '../ui/skeleton'
import prisma from '@/lib/db'
import { PlusCircleIcon } from 'lucide-react'

type TableWrapperProps = {
    plugins: Plugin[]
}

export default function TableWrapper({
  plugins
}: Readonly<TableWrapperProps>) {
    const [initialPlugins, setInitialPlugins ] = useState<Plugin[]>([]);
    const [sort, setSort] = useState<"asc" | "desc">('desc')
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
        if (!plugins) return;
        setInitialPlugins(plugins)
        setLoading(false)
    }, [plugins])

    if (loading) return (
        <div className="flex flex-col">
            <Button variant={'outline'} className="ml-auto w-36 h-10 mb-5">
                <Skeleton className="h-5 w-full" />
            </Button>
            <div className="border rounded-lg">
                <div className="border-b h-12" />
                {plugins.map((plugin) => (
                    <div
                        key={plugin.id}
                        className="flex items-center space-x-4 p-5 w-ful"
                    >
                        <Skeleton className="h-12 w-12" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                ))}
                {plugins.length === 0 && (
                    <div className="flex items-center space-x-4 p-5 w-ful">
                        <Skeleton className="h-12 w-12" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                )}
            </div>
        </div>
    )
    // if (error) return <p>Error: {error.message}</p>

    return (
        <div className="flex flex-col space-y-5 pb-10">
            <Button
                variant={'outline'}
                className="ml-auto w-fit"
                onClick={() => {
                    console.log('Add Plugin')
                }}
            >
                <PlusCircleIcon />
                New Plugin
            </Button>
            <Button
                variant={'outline'}
                className="ml-auto w-fit"
                onClick={() => {
                    setSort(sort === "desc" ? "asc" : "desc")
                }}
            >
                Sort By {sort === 'desc' ? "Z-A" : "A-Z"}
            </Button>
            <DataTable columns={columns} data={initialPlugins} />
        </div>
    )
}
