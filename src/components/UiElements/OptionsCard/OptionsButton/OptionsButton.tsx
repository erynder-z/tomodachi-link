import { TbSettings } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

type OptionsButtonProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
        guestAccountOverlay: boolean;
    };
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
};
export default function OptionsButton({
    shouldOverlaysShow,
    setShouldOverlaysShow,
}: OptionsButtonProps) {
    const handleButtonClick = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: !shouldOverlaysShow.editUserDataModal,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    return (
        <>
            <motion.button
                data-tooltip-id="options-profile-options-tooltip"
                data-tooltip-content="Show profile options"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                type="button"
                onClick={handleButtonClick}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer hover:drop-shadow-md hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <TbSettings size="1.5em" />
            </motion.button>
            <Tooltip
                id="options-profile-options-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );
}
