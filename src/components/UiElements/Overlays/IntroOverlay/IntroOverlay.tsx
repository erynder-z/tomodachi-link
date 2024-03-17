import { MdOutlineHelpOutline } from 'react-icons/md';
import useAuth from '../../../../hooks/useAuth';
import { Dispatch, SetStateAction, useState } from 'react';
import { handleAcceptTOS } from '../../../../utilities/handleAcceptTOS';
import ButtonBusy from '../../LoadingSpinner/ButtonBusy';
import { motion } from 'framer-motion';

type IntroOverlayProps = {
    setShouldOverlaysShow: Dispatch<
        SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
            introOverlay: boolean;
        }>
    >;
    displayGreeting: () => void;
};

/**
 * Rendered JSX for the IntroOverlay component.
 *
 * @type {JSX.Element}
 */
export default function IntroOverlay({
    setShouldOverlaysShow,
    displayGreeting,
}: IntroOverlayProps): JSX.Element {
    const { token } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    /**
     * Handles the click event of the accept button.
     *
     * @return {Promise<void>} A Promise that resolves when the function is complete.
     */
    const handleAcceptButtonClick = async (): Promise<void> => {
        if (token) {
            setIsSubmitting(true);
            try {
                await handleAcceptTOS(token);
                setShouldOverlaysShow((prev) => ({
                    ...prev,
                    introOverlay: false,
                }));
            } catch (error) {
                console.error('Error accepting TOS:', error);
            } finally {
                setIsSubmitting(false);
                displayGreeting();
            }
        }
    };

    /**
     * Rendered JSX for the IntroOverlay component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen p-8 z-50 overflow-hidden flex flex-col items-center justify-center gap-4 transition-opacity bg-slate-900/90"
        >
            <div className="flex  flex-col text-regularTextDark">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to Tomodachi-Link!
                </h1>
                <p className="mb-4 text-sm">
                    Since this is your first time, why don't you start by adding
                    me to your friend-list?
                </p>

                <p className="mt-4">Erynder-Z</p>
                <p className="flex items-center">
                    You can check the help section&nbsp;
                    <MdOutlineHelpOutline size="1.2em" /> &nbsp; for more
                    information about the app!
                </p>
                <button
                    onClick={handleAcceptButtonClick}
                    disabled={isSubmitting}
                    className="mt-4 ml-auto w-20 relative overflow-hidden rounded transition duration-500 ease-in-out bg-button hover:bg-buttonHover dark:bg-buttonDark dark:hover:bg-buttonDarkHover"
                >
                    <span className="z-10 relative w-full h-10 flex justify-center items-center group p-2 text-sm ">
                        {isSubmitting ? (
                            <ButtonBusy />
                        ) : (
                            <span className="transition-all duration-300 group-hover:pr-4">
                                <span className="duration-300 group-hover:opacity-0">
                                    Got it
                                </span>
                                <span className="opacity-0 absolute -right-0 group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                                    👍
                                </span>
                            </span>
                        )}
                    </span>
                </button>
            </div>
        </motion.div>
    );
}
