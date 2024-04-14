import { Tooltip } from 'react-tooltip';
import ButtonBusy from '../UiElements/LoadingSpinner/ButtonBusy';
import { FaAngleDoubleRight } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';

type LoginFormProps = {
    handleLoginSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => Promise<void>;
    isSubmitting: boolean;
};

/**
 * Renders a login form with username and password inputs.
 *
 * @component
 * @param {LoginFormProps} props - The props object.
 * @param {Function} props.handleLoginSubmit - The function to handle the login form submission.
 * @param {boolean} props.isSubmitting - A flag indicating if the form is in a submitting state.
 * @return {JSX.Element} The rendered login form component.
 */
export default function LoginForm({
    handleLoginSubmit,
    isSubmitting,
}: LoginFormProps): JSX.Element {
    const { isMobileDevice } = useTheme();
    /**
     * Content for the username input field.
     *
     * @type {JSX.Element}
     */
    const UsernameInputContent: JSX.Element = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="username"
                name="username"
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="username"
                className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Username
            </label>
        </div>
    );

    /**
     * Content for the password input field.
     *
     * @type {JSX.Element}
     */
    const PasswordInputContent: JSX.Element = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="password"
                name="password"
                type="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="password"
                className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Password
            </label>
        </div>
    );

    /**
     * Content for the button in a busy state.
     *
     * @type {JSX.Element}
     */
    const BusyButtonContent: JSX.Element = <ButtonBusy />;

    /**
     * Content for the button in a normal state.
     *
     * @type {JSX.Element}
     */
    const NormalButtonContent: JSX.Element = (
        <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-lg">
            <span className="transition-all duration-300 group-hover:pr-4">
                Login
                <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                    <FaAngleDoubleRight size="1.5em" />
                </span>
            </span>
        </span>
    );

    /**
     * Renders the LoginForm component.
     *
     * @return {JSX.Element} The rendered LoginForm component.
     */
    return (
        <div className="w-full">
            <div>
                <h1 className="text-base md:text-2xl font-semibold m-0">
                    Login to Tomodachi-Link:
                </h1>
            </div>
            <form
                action=""
                method="POST"
                onSubmit={handleLoginSubmit}
                className="divide-y divide-gray-200"
            >
                <div className="py-2 md:py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    {UsernameInputContent}
                    {PasswordInputContent}
                    <div className="flex w-full">
                        <button
                            data-tooltip-id="normal-login-tooltip"
                            data-tooltip-content="Login using username and password"
                            data-tooltip-variant="dark"
                            data-tooltip-delay-show={500}
                            data-tooltip-hidden={isMobileDevice}
                            disabled={isSubmitting}
                            className={`relative overflow-hidden w-full bg-sky-700 text-white text-lg md:text-xl font-bold rounded transition duration-500 ease-in-out ${
                                isSubmitting
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'hover:bg-sky-600'
                            }`}
                        >
                            {isSubmitting
                                ? BusyButtonContent
                                : NormalButtonContent}
                        </button>
                    </div>
                </div>
            </form>
            <Tooltip
                id="normal-login-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </div>
    );
}
