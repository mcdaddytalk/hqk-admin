"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { useAppStore } from '@/store/appstore'
import { toast } from 'react-hot-toast'
import { updatePlugin } from '@/actions'

export default function EditModal() {
    const [setIsEditModalOpen, isEditModalOpen, fileId, setFileId] = useAppStore((state) => [
        state.setIsEditModalOpen,
        state.isEditModalOpen,
        state.fileId,
        state.setFileId
    ])

    const editPlugin = async () => {
        
        const toastId = toast.loading('Updating plugin...')
        console.log('Edit Plugin: ', fileId)
        if (!fileId) {
            toast.error('Plugin ID not found', { id: toastId })
            return;
        }

        await updatePlugin(fileId)
            .then(() => {
                toast.success('Plugin updated successfully', { id: toastId })
            })
            .catch((error) => {
                console.error(error)
                toast.error('Something went wrong', { id: toastId })
            })
            .finally(() => {
                setIsEditModalOpen(false)
                setFileId(null)
            })
    }

    return (
        <Dialog
            open={isEditModalOpen}
            onOpenChange={(isOpen) => {
                setIsEditModalOpen(isOpen)
            }}
        >
            <DialogContent className="sm:max-w-wd">
                <DialogHeader>
                    <DialogTitle>Edit Plugin: {fileId}</DialogTitle>
                </DialogHeader>

                <DialogFooter className="flex space-x-2 py-3">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsEditModalOpen(false)
                            setFileId(null)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => editPlugin()}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}