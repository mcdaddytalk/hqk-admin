"use client"

import React from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Plugin } from '@/types'
import { PencilIcon, RefreshCcwIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/appstore'
import DeleteModal from '../DeleteModal'
import EditModal from '../EditModal'
import { updateVersion } from '@/actions'
   
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}
  
export default function DataTable<TData, TValue>({
    columns,
    data
}: Readonly<DataTableProps<TData, TValue>>) {
    const [setIsDeleteModalOpen, setIsEditModalOpen, setIsAddModalOpen, setFileId] = useAppStore((state) => [
         state.setIsDeleteModalOpen,
         state.setIsEditModalOpen,
         state.setIsAddModalOpen,
         state.setFileId
    ])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const openDeleteModal = (fileId: number) => {
         setFileId(fileId)
         setIsDeleteModalOpen(true)
         console.log('Open Delete Modal')
    }

    const openEditModal = (fileId: number) => {
        console.log('FileID: ', fileId)
         setFileId(fileId)
         setIsEditModalOpen(true)
        console.log('Open Edit Modal')
    }

    const openAddModal = () => {
        setIsAddModalOpen(true)
        console.log('Open Add Modal')
    }

    const checkVersion = async (fileId: number, source: string, resource: string, version: string) => {
        console.log('Check Version: ', fileId, source, version)
        console.log('Check Version')
        await updateVersion(fileId, source, resource, version)
    }

    return (
        <div className="rounded-md border">
        <Table>
            <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            <DeleteModal />
                            <EditModal />
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {cell.column.id === 'timestamp' 
                                    ? (
                                        <div className='flex flex-col'>
                                            <div className="text-sm">
                                                {(cell.getValue() as Date).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {(cell.getValue() as Date).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    )
                                    : cell.column.id === 'title'
                                        ? (
                                            <div className='flex flex-col'>
                                                <div className="text-sm">
                                                    {(cell.getValue() as string)}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {(row.original as Plugin).name}
                                                </div>
                                            </div>
                                        )
                                        : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        )
                                }
                            </TableCell>
                            ))}
                            <TableCell key={(row.original as Plugin).id}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => checkVersion((
                                        row.original as Plugin).id,
                                        (row.original as Plugin).source,
                                        (row.original as Plugin).resource_id,
                                        (row.original as Plugin).c_version
                                    )}
                                >
                                    <RefreshCcwIcon size={20} />
                                </Button>
                                <Button
                                    variant={'outline'}
                                    onClick={() => openEditModal((row.original as Plugin).id)}
                                >
                                    <PencilIcon size={20} />
                                </Button>
                                <Button
                                    variant={'outline'}
                                    onClick={() => openDeleteModal((row.original as Plugin).id)}
                                >
                                    <TrashIcon size={20} />
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            You have no plugins
                        </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
