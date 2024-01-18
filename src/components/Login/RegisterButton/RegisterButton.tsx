import { FaUserPlus } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

type RegisterButtonProps = {
    handleRegisterClick: () => void;
};

/**
 * Renders a button to trigger the registration process.
 *
 * @component
 * @param {RegisterButtonProps} props - The props object.
 * @param {Function} props.handleRegisterClick - The function to handle the click event for registration.
 * @return {JSX.Element} The rendered RegisterButton component.
 */
export default function RegisterButton({
    handleRegisterClick,
}: RegisterButtonProps): JSX.Element {
    /**
     * Renders the RegisterButton component.
     *
     * @return {JSX.Element} The rendered RegisterButton component.
     */
    return (
        <>
            <button
                data-tooltip-id="register-button-tooltip"
                data-tooltip-content="Create a new Odin-Book account"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                onClick={handleRegisterClick}
                className="relative overflow-hidden w-full bg-green-600 hover:bg-green-500 text-white text-xl font-bold rounded transition duration-500 ease-in-out"
            >
                <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-xl">
                    <span className="transition-all duration-300 group-hover:pr-4">
                        Create account
                        <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                            <FaUserPlus size="1.5em" />
                        </span>
                    </span>
                </span>
            </button>
            <Tooltip
                id="register-button-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );
}
