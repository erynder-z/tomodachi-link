type GuestAccountOverlayProps = {
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
 * React component for rendering an overlay explaining the limitations of the guest account.
 *
 * @function
 * @param {GuestAccountOverlayProps} props - The component props.
 * @param {React.Dispatch<React.SetStateAction<Object>>} props.setShouldOverlaysShow - React state dispatch function to update overlay visibility.
 * @returns {JSX.Element} The rendered GuestAccountOverlay component.
 */
export default function GuestAccountOverlay({
    setShouldOverlaysShow,
}: GuestAccountOverlayProps): JSX.Element {
    /**
     * Handles the click event when the "Got it" button is clicked, closing the overlay.
     *
     * @function
     * @returns {void}
     */
    const handleCloseButtonClick = (): void => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    /**
     * Rendered JSX for the GuestAccountOverlay component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen p-8 z-50 overflow-hidden flex flex-col items-center justify-center gap-4 transition-opacity bg-slate-900/90">
            <div className="flex  flex-col text-regularText dark:text-regularTextDark">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to Odin-Book!
                </h1>
                <p className="mb-4">
                    You are currently using the guest account which has the
                    following limitations:
                </p>
                <ul className="list-disc">
                    <li>You cannot use the chat!</li>
                    <li>You cannot answer polls!</li>
                </ul>
                <p className="mt-4">
                    If you want to experience the full extend of the app, please
                    create an account!
                </p>
                <button
                    onClick={handleCloseButtonClick}
                    className="mt-4 ml-auto w-20 relative overflow-hidden rounded transition duration-500 ease-in-out bg-button hover:bg-buttonHover dark:bg-buttonDark dark:hover:bg-buttonDarkHover"
                >
                    <span className="z-10 relative w-full flex justify-center items-center group p-2 text-sm ">
                        <span className="transition-all duration-300 group-hover:pr-4">
                            <span className="duration-300 group-hover:opacity-0">
                                Got it
                            </span>
                            <span className="opacity-0 absolute -right-0 group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                                👍
                            </span>
                        </span>
                    </span>
                </button>
            </div>
        </div>
    );
}
