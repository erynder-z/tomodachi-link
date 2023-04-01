import React, { useEffect, useRef, useState } from 'react';
import OptionsCard from '../OptionsCard/OptionsCard';
import FriendSectionButton from './FriendSectionButton/FriendSectionButton';
import HomeSectionButton from './HomeSectionButton/HomeSectionButton';
import NavbarUserOptionsButton from './NavbarUserOptionsButton/NavbarUserOptionsButton';

export default function Navbar() {
    const [showOptions, setShowOptions] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowOptions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="h-full w-full flex justify-between items-center px-4 py-1 bg-navbar">
            <div className="flex justify-center items-center gap-4">
                <HomeSectionButton />
                <FriendSectionButton />
            </div>
            <div className="relative lg:hidden flex" ref={menuRef}>
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setShowOptions(!showOptions)}
                >
                    <NavbarUserOptionsButton />
                </button>
                {showOptions && (
                    <div className="absolute bottom-16 right-0 mt-2 p-2 bg-card rounded-lg shadow-xl z-10">
                        <OptionsCard setShowOptions={setShowOptions} />
                    </div>
                )}
            </div>
        </div>
    );
}
