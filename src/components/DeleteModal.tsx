"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { useAppStore } from '@/store/appstore'
import { toast } from 'react-hot-toast'
import prisma from '@/lib/db'
import { removePlugin } from '@/actions'

export default function DeleteModal() {
    const [setIsDeleteModalOpen, isDeleteModalOpen, fileId, setFileId] = useAppStore((state) => [
        state.setIsDeleteModalOpen,
        state.isDeleteModalOpen,
        state.fileId,
        state.setFileId
    ])

    const deletePlugin = async () => {
        const toastId = toast.loading('Deleting plugin...')

        console.log('Edit Plugin: ', fileId)
        if (!fileId) {
            toast.error('Plugin ID not found', { id: toastId })
            return;
        }
        await removePlugin(fileId)
            .then(() => {
                toast.success('Plugin deleted successfully', { id: toastId })
            })
            .catch((error) => {
                toast.error('Something went wrong', { id: toastId })
            })
            .finally(() => {
                setIsDeleteModalOpen(false)
                setFileId(null)
            })
        
    }

    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => {
                setIsDeleteModalOpen(isOpen)
            }}
        >
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>Are you absolutely sure you want to delete?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete the selected plugin from your account and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>           

            <DialogFooter className="flex space-x-2 py-3">
                <Button
                    size={'sm'}
                    variant={'ghost'}
                    onClick={() => setIsDeleteModalOpen(false)}
                    className='px-3 flex-1'
                >
                    <span className="sr-only">Cancel</span>
                    <span>Cancel</span>
                </Button>
                <Button 
                    variant={'destructive'}
                    type="submit"
                    className='px-3 flex-1'
                    size={'sm'}
                    onClick={() => deletePlugin()}
                >
                   <span className="sr-only">Delete</span>
                    <span>Delete</span>
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}
