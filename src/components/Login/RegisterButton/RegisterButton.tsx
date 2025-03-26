import ButtonBusy from '../../UiElements/LoadingSpinner/ButtonBusy';
import { FaUserPlus } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../hooks/useTheme';

type RegisterButtonProps = {
    handleRegisterClick: () => void;
    isSubmitting: boolean;
};

/**
 * Renders a button to trigger the registration process.
 *
 * @component
 * @param {RegisterButtonProps} props - The props object.
 * @param {Function} props.handleRegisterClick - The function to handle the click event for registration.
 * @param {boolean} props.isSubmitting - A flag indicating if the button is in a submitting state.
 * @return {JSX.Element} The rendered RegisterButton component.
 */
export default function RegisterButton({
    handleRegisterClick,
    isSubmitting,
}: RegisterButtonProps): JSX.Element {
    const { isMobileDevice } = useTheme();

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
        <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-xl">
            <span className="transition-all duration-300 group-hover:pr-4">
                Create account
                <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                    <FaUserPlus size="1.5em" />
                </span>
            </span>
        </span>
    );

    /**
     * Renders the RegisterButton component.
     *
     * @return {JSX.Element} The rendered RegisterButton component.
     */
    return (
        <>
            <button
                data-tooltip-id="register-button-tooltip"
                data-tooltip-content="Create a new Tomodachi-Link account"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={!isMobileDevice}
                onClick={handleRegisterClick}
                disabled={isSubmitting}
                className={`relative overflow-hidden h-16 w-full text-white text-xl font-bold rounded transition duration-500 ease-in-out ${
                    isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-500'
                }`}
            >
                {isSubmitting ? BusyButtonContent : NormalButtonContent}
            </button>
            <Tooltip
                id="register-button-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );
}
