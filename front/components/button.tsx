'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Button({
    text,
    icon,
    iconWidth = 24,  // Tamaño por defecto
    iconHeight = 24, // Tamaño por defecto
    type = "button",
    bgColor = "bg-sky-200",
    border = "",
    hover = "",
    redirectTo = "",
    onClick
}: {
    text?: string;
    icon?: string;
    iconWidth?: number;
    iconHeight?: number;
    type?: "button" | "submit" | "reset";
    bgColor?: string;
    border?: string;
    hover?: string;
    redirectTo?: string;
    onClick?: () => void;
}) {
    const router = useRouter();

    const handleClick = async () => {
        if (onClick) {
            await onClick();
        } else if (redirectTo) {
            router.push(redirectTo);
        }
    };

    return (
        <button
            type={type}
            className={`p-2 rounded-lg flex items-center justify-center ${bgColor} transition ${border} ${hover}`}
            onClick={handleClick}
        >
            {icon && <Image src={icon} alt="Icon" width={iconWidth} height={iconHeight} />}
            {text}
        </button>
    );
}