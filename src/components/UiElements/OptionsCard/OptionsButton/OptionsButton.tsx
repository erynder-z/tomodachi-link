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

/**
 * React component for rendering an options button.
 *
 * @function
 * @param {OptionsButtonProps} props - The component props.
 * @param {Object} props.shouldOverlaysShow - Object indicating the visibility of different overlays.
 * @param {boolean} props.shouldOverlaysShow.searchOverlay - Indicates whether the search overlay is visible.
 * @param {boolean} props.shouldOverlaysShow.editUserDataModal - Indicates whether the edit user data modal is visible.
 * @param {boolean} props.shouldOverlaysShow.mobileOptionsModal - Indicates whether the mobile options modal is visible.
 * @param {boolean} props.shouldOverlaysShow.guestAccountOverlay - Indicates whether the guest account overlay is visible.
 * @param {React.Dispatch<React.SetStateAction<Object>>} props.setShouldOverlaysShow - React state dispatch function to update overlay visibility.
 * @returns {JSX.Element} The rendered OptionsButton component.
 */
export default function OptionsButton({
    shouldOverlaysShow,
    setShouldOverlaysShow,
}: OptionsButtonProps): JSX.Element {
    /**
     * Handles the click event for the options button.
     *
     * @function
     * @returns {void}
     */
    const handleButtonClick = (): void => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: !shouldOverlaysShow.editUserDataModal,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    /**
     * Rendered JSX for the OptionsButton component.
     *
     * @type {JSX.Element}
     */
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
