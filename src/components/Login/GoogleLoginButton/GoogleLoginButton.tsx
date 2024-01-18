import { FaGoogle, FaAngleDoubleRight } from 'react-icons/fa';
import ButtonBusy from '../../UiElements/LoadingSpinner/ButtonBusy';
import { Tooltip } from 'react-tooltip';

type GoogleLoginButtonProps = { isSubmitting: boolean };

/**
 * Renders a button for Google login.
 *
 * @component
 * @param {GoogleLoginButtonProps} props - The props object.
 * @param {boolean} props.isSubmitting - A flag indicating if the button is in a submitting state.
 * @return {JSX.Element} The rendered GoogleLoginButton component.
 */
export default function GoogleLoginButton({
    isSubmitting,
}: GoogleLoginButtonProps) {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const githubLoginURL = `${SERVER_URL}/api/v1/oauth/google`;

    /**
     * Handles the Google login action by opening the Google login URL.
     *
     * @function
     * @return {void}
     */
    const handleGoogleLogin = (): void => {
        window.open(githubLoginURL, '_self');
    };

    /**
     * Content for the button when it's in a busy (submitting) state.
     *
     * @type {JSX.Element}
     */
    const BusyButtonContent: JSX.Element = <ButtonBusy />;

    /**
     * Content for the button when it's in a normal state.
     *
     * @type {JSX.Element}
     */
    const NormalButtonContent: JSX.Element = (
        <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-lg text-white hover:text-white">
            <div className="flex justify-center items-center gap-2">
                <FaGoogle
                    size="1.5em"
                    className="group-hover:opacity-0 group-hover:translate-x-5 transition-all duration-300"
                />
                <FaAngleDoubleRight
                    size="1.5em"
                    className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-300"
                />
            </div>
        </span>
    );

    /**
     * Renders the GoogleLoginButton component.
     *
     * @return {JSX.Element} The rendered GoogleLoginButton component.
     */
    return (
        <>
            <button
                data-tooltip-id="google-login-tooltip"
                data-tooltip-content="Login with your Google account"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                disabled={isSubmitting}
                onClick={handleGoogleLogin}
                className={` relative overflow-hidden w-full text-white font-bold rounded transition duration-500 ease-in-out ${
                    isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700'
                }`}
            >
                {' '}
                {isSubmitting ? BusyButtonContent : NormalButtonContent}
            </button>
            <Tooltip
                id="google-login-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );
}
