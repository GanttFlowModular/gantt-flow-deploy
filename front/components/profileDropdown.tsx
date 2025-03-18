import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ProfileDropdown({ name, email, onClick }: { name: string, email: string, onClick?: () => void; }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Picture Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all">
                    {/* Replace with your image component */}
                    <img
                        src="avatar.svg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{name}</p>
                        <p className="text-xs text-gray-500 truncate">{email}</p>
                    </div>

                    {/* Menu Items */}
                    <Link href="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Perfil
                    </Link>
                    <Link href="/configuraciones" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Configuración
                    </Link>
                    <Link href="/ayuda" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Ayuda
                    </Link>
                    <div className="border-t border-gray-100">
                        <button
                            onClick={onClick}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}