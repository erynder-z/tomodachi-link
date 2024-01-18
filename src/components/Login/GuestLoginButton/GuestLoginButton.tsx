import ButtonBusy from '../../UiElements/LoadingSpinner/ButtonBusy';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

type GuestLoginButtonProps = {
    handleGuestLogin: () => void;
    isSubmitting: boolean;
};

/**
 * Renders a button for guest login.
 *
 * @param {GuestLoginButtonProps} props - The props object.
 * @param {() => void} props.handleGuestLogin - The function to handle guest login.
 * @param {boolean} props.isSubmitting - A flag indicating if the button is in a submitting state.
 * @return {JSX.Element} The rendered button component.
 */
export default function GuestLoginButton({
    handleGuestLogin,
    isSubmitting,
}: GuestLoginButtonProps): JSX.Element {
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
        <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-lg">
            <span className="transition-all duration-300 group-hover:pr-4">
                Login as guest
                <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                    <FaAngleDoubleRight size="1.5em" />
                </span>
            </span>
        </span>
    );

    /**
     * Renders the GuestLoginButton component.
     *
     * @return {JSX.Element} The rendered GuestLoginButton component.
     */
    return (
        <>
            <button
                data-tooltip-id="guest-login-tooltip"
                data-tooltip-content="Login without creating an account"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                disabled={isSubmitting}
                onClick={handleGuestLogin}
                className={` relative overflow-hidden w-full bg-indigo-900 text-white font-bold rounded transition duration-500 ease-in-out ${
                    isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'hover:bg-indigo-700'
                }`}
            >
                {isSubmitting ? BusyButtonContent : NormalButtonContent}
            </button>
            <Tooltip id="guest-login-tooltip" style={{ fontSize: '0.75rem' }} />
        </>
    );
}
