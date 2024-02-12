import { create } from 'zustand'

interface AppState {
    setIsDeleteModalOpen: (open: boolean) => void;
    isDeleteModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    isEditModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    isAddModalOpen: boolean;

    fileId: number | null;
    setFileId: (fileId: number | null) => void;
}

export const useAppStore = create<AppState>()((set) => ({
    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) => set({ isDeleteModalOpen: open }),
    isEditModalOpen: false,
    setIsEditModalOpen: (open) => set({ isEditModalOpen: open }),
    isAddModalOpen: false,
    setIsAddModalOpen: (open) => set({ isAddModalOpen: open }),
    fileId: null,
    setFileId: (fileId) => set({ fileId }),
}))