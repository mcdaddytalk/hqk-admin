"use client"

import { ColumnDef } from "@tanstack/react-table"
import { type Plugin } from '@/types'
import { DollarSignIcon } from "lucide-react"
import { SOURCES } from "@/constants"

export const columns: ColumnDef<Plugin>[] = [
    {
        id: 'title',
        header: 'Title',
        accessorKey: 'title',
    },
    {
        id: 'c_version',
        header: 'Current Version',
        accessorKey: 'c_version',
    },
    {
        id: 'l_version',
        header: 'Latest Version',
        accessorKey: 'l_version',
    },
    {
        id: 'location',
        header: 'Location',
        accessorKey: 'location',
        cell: ({ renderValue, ...props }) => {
            return <a
                    href={renderValue() as string}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-500 hover:text-blue-600"
                    {...props}
                >
                    Go to Source
                </a>
        },
    },
    {
        id: 'source',
        header: 'Source',
        accessorKey: 'source',
        cell: ({ renderValue, ...props }) => {
            return SOURCES[renderValue() as string as keyof typeof SOURCES]
        }
    },
    {
        id: 'resource_id',
        header: 'Resource ID',
        accessorKey: 'resource_id',
    },
    {
        id: 'premium',
        header: 'Premium',
        accessorKey: 'premium',
        cell: ({ renderValue, ...props }) => {
            return renderValue() 
                ? (<div className="items-center"><DollarSignIcon className="h-4 w-4 text-green-400"/></div>)
                : (<div className="items-center"><DollarSignIcon className="h-4 w-4 text-gray-500/50" /></div>)
        }
    },
    {
        id: 'retired',
        header: 'Retired',
        accessorKey: 'retired',
        cell: ({ renderValue, ...props }) => {
            return renderValue() ? 'Yes' : 'No'
        }
    },
    {
        id: 'active',
        header: 'Active',
        accessorKey: 'active',
        cell: ({ renderValue, ...props }) => {
            return renderValue() ? 'Yes' : 'No'
        }
    },
]