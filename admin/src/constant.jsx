import { HomeIcon, ShoppingBagIcon, ClipboardListIcon, UserIcon } from "lucide-react";

export const NAVIGATION_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: <HomeIcon className="size-5" /> },
    { label: 'Products', path: '/products', icon: <ShoppingBagIcon className="size-5" /> },
    { label: 'Orders', path: '/orders', icon: <ClipboardListIcon className="size-5" /> },
    { label: 'Customers', path: '/customers', icon: <UserIcon className="size-5" /> },
];