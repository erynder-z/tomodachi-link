import React, { useEffect, useRef, useState } from 'react';
import OptionsCard from '../OptionsCard/OptionsCard';
import FriendSectionButton from './FriendSectionButton/FriendSectionButton';
import HomeSectionButton from './HomeSectionButton/HomeSectionButton';
import NavbarUserOptionsButton from './NavbarUserOptionsButton/NavbarUserOptionsButton';
import useDelayUnmount from '../../../hooks/useDelayUnmount';
import SearchButton from './SearchButton/SearchButton';
import SearchOverlay from '../SearchOverlay/SearchOverlay';

export default function Navbar() {
    const [shouldOptionsShow, setShouldOptionsShow] = useState(false);
    const [shouldSearchOverlayShow, setShouldSearchOverlayShow] =
        useState(false);
    const isOptionsMenuMounted = shouldOptionsShow;
    const isSearchOverlayMounted = shouldSearchOverlayShow;
    const showOptions = useDelayUnmount(isOptionsMenuMounted, 150);
    const showSearchOverlay = useDelayUnmount(isSearchOverlayMounted, 150);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleSearchButtonClick = () => {
        setShouldSearchOverlayShow(true);
    };

    const onClose = () => {
        setShouldSearchOverlayShow(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShouldOptionsShow(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="h-full w-full flex justify-between items-center lg:items-start px-2 py-1 lg:py-2 bg-navbar">
            <div className="flex lg:flex-col justify-center items-center gap-4">
                <HomeSectionButton />
                <FriendSectionButton />
                <SearchButton
                    handleSearchButtonClick={handleSearchButtonClick}
                />
            </div>
            <div className="relative lg:hidden flex" ref={menuRef}>
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setShouldOptionsShow(!shouldOptionsShow)}
                >
                    <NavbarUserOptionsButton />
                </button>
                {showOptions && (
                    <div
                        className={`${
                            shouldOptionsShow
                                ? 'animate-popInAnimation'
                                : 'animate-popOutAnimation'
                        } absolute bottom-10 right-0 mt-2 p-2 bg-card shadow-xl z-10`}
                    >
                        <OptionsCard setShowOptions={setShouldOptionsShow} />
                    </div>
                )}
            </div>
            {showSearchOverlay && (
                <SearchOverlay
                    shouldSearchOverlayShow={shouldSearchOverlayShow}
                    onClose={onClose}
                />
            )}
        </div>
    );
}
