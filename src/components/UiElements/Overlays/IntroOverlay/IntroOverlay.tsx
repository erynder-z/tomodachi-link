import { MdOutlineHelpOutline } from 'react-icons/md';
import useAuth from '../../../../hooks/useAuth';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { handleAcceptTOS } from '../../../../utilities/handleAcceptTOS';
import ButtonBusy from '../../LoadingSpinner/ButtonBusy';
import { motion } from 'framer-motion';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { backendFetch } from '../../../../utilities/backendFetch';
import useInfoCard from '../../../../hooks/useInfoCard';
import defaultUserpic from '../../../../assets/defaultUserpic.png';
import { handleAddDefaultFriend } from '../../../../utilities/handleAddDefaultFriend';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';

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
    const { handleFetchUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [defaultFriendInfo, setDefaultFriendInfo] =
        useState<MinimalUserTypes | null>(null);

    const { firstName, lastName, userpic } = defaultFriendInfo || {};

    // Use the default userpic if no userpic is provided. (This should only apply to fake users created with faker.js)
    const userpicSrc = userpic?.data
        ? `data:image/png;base64,${userpic.data}`
        : defaultUserpic;

    const shouldFetchUserData = useRef(true);

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
                await handleAddDefaultFriend(token);
            } catch (error) {
                console.error('Error accepting TOS:', error);
            } finally {
                setIsSubmitting(false);
                handleFetchUserData();
                displayGreeting();
                setShouldOverlaysShow((prev) => ({
                    ...prev,
                    introOverlay: false,
                }));
            }
        }
    };

    /**
     * useEffect hook to the default friend info when the component mounts.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        const getDefaultFriend = async (): Promise<void> => {
            const id = import.meta.env.VITE_DEFAULT_FRIEND_ID;
            if (token && id) {
                const apiEndpointURL = `/api/v1/users/${id}`;
                const METHOD = 'GET';
                const ERROR_MESSAGE = 'Unable to fetch user!';

                const response = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURL,
                    METHOD,
                    ERROR_MESSAGE
                );
                setDefaultFriendInfo(response?.user ?? {});
            }
        };
        if (shouldFetchUserData.current) getDefaultFriend();

        return () => {
            shouldFetchUserData.current = false;
        };
    }, []);

    /**
     * JSX Element representing the default friend info.
     *
     * @type {JSX.Element}
     */
    const defaultFriend: JSX.Element = (
        <div className=" flex-1 flex flex-col my-4">
            <div className="flex items-center justify-center h-full w-full gap-2 text-sm text-regularTextDark ">
                <img
                    loading="lazy"
                    className="w-6 md:w-8 h-auto object-cover rounded-full"
                    src={userpicSrc}
                    alt="User avatar"
                />
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {firstName} {lastName}
                </div>
            </div>
        </div>
    );

    /**
     * JSX Element representing the accept button.
     *
     * @type {JSX.Element}
     */
    const acceptButton: JSX.Element = (
        <button
            onClick={handleAcceptButtonClick}
            disabled={isSubmitting}
            className="mt-4 ml-auto w-20 relative overflow-hidden rounded transition duration-500 ease-in-out bg-buttonDark hover:bg-buttonDarkHover"
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
    );

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
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen p-8 z-50 overflow-hidden flex flex-col items-center justify-center gap-4 bg-slate-900/90"
        >
            <div className="flex flex-col text-regularTextDark">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to Tomodachi-Link!
                </h1>
                <p className="mb-4">
                    Since this is your first visit, I will automatically be
                    added to your friend-list.
                </p>
                {defaultFriendInfo && defaultFriend}
                <p>
                    All other users will first need to accept your friend
                    request before you can interact with them.
                </p>
                <p className="flex items-center">
                    You can check the help section&nbsp;
                    <MdOutlineHelpOutline size="1.5em" /> &nbsp; for more
                    information about the app!
                </p>
                {acceptButton}
            </div>
        </motion.div>
    );
}
