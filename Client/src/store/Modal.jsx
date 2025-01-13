import { create } from 'zustand';

export const UseModal=create((set=>({
    isOpen: false,
    setIsOpen: (open) => set({ isOpen: open }),
    modalContent: [],
    setModalContent: (content) => set({ modalContent: content }),
})))

export const UseSlider = create((set) => ({
    isOpenSlider: false,
    setIsOpenSlider: (value) => set({ isOpenSlider: value }), 
  }));