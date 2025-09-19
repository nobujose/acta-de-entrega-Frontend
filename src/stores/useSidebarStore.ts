import { create } from 'zustand';

interface SidebarState {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
  isDesktopCollapsed: boolean;
  toggleDesktopCollapse: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  isDesktopCollapsed: false,
  toggleDesktopCollapse: () =>
    set((state) => ({ isDesktopCollapsed: !state.isDesktopCollapsed })),
}));
