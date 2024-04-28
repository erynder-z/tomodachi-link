import ButtonBusy from '../../UiElements/LoadingSpinner/ButtonBusy';
import { MdSentimentVerySatisfied } from 'react-icons/md';

type SignupFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isSubmitting: boolean;
};

/**
 * Renders a signup form with input fields for user registration.
 *
 * @component
 * @param {SignupFormProps} props - The props object.
 * @param {function} props.handleSubmit - The function to handle the form submission.
 * @param {boolean} props.isSubmitting - A flag indicating if the form is in a submitting state.
 * @return {JSX.Element} The rendered signup form component.
 */
export default function SignupForm({
    handleSubmit,
    isSubmitting,
}: SignupFormProps): JSX.Element {
    /**
     * Input field for the user's first name.
     *
     * @type {JSX.Element}
     */
    const FirstNameInputContent: JSX.Element = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="firstName"
                name="firstName"
                type="text"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="firstName"
                className="absolute text-sm px-2 text-gray-900 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
                First name
            </label>
        </div>
    );

    /**
     * Input field for the user's last name.
     *
     * @type {JSX.Element}
     */
    const LastNameInputContent: JSX.Element = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="lastName"
                name="lastName"
                type="text"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="lastName"
                className="absolute text-sm px-2 text-gray-900 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
                Last name
            </label>
        </div>
    );

    /**
     * Input field for the user's email address.
     *
     * @type {JSX.Element}
     */
    const EmailInputContent: JSX.Element = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="email"
                className="absolute text-sm px-2 text-gray-900 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
                Email
            </label>
        </div>
    );

    /**
     * Input field for the user's username.
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
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="username"
                className="absolute text-sm px-2 text-gray-900 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
                Username
            </label>
        </div>
    );

    /**
     * Input field for the user's password.
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
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="password"
                className="absolute text-sm px-2 text-gray-900 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
                Password
            </label>
        </div>
    );

    /**
     * Input field for confirming the user's password.
     *
     * @type {JSX.Element}
     */
    const ConfirmPasswordInputContent: JSX.Element = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="confirmPassword"
                className="absolute text-sm px-2 text-gray-900 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
                Confirm password
            </label>
        </div>
    );

    /**
     * Content for the button when the form is in a submitting state.
     *
     * @type {JSX.Element}
     */
    const BusyButtonContent: JSX.Element = <ButtonBusy />;

    /**
     * Content for the button when the form is not in a submitting state.
     *
     * @type {JSX.Element}
     */
    const NormalButtonContent: JSX.Element = (
        <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-xl">
            <span className="transition-all duration-300 group-hover:pr-4">
                Register
                <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                    <MdSentimentVerySatisfied size="1.5em" />
                </span>
            </span>
        </span>
    );

    /**
     * Renders the SignupForm component.
     *
     * @return {JSX.Element} The rendered SignupForm component.
     */
    return (
        <div className="w-full py-2">
            <div>
                <h1 className="md:text-2xl font-semibold">
                    Set up your account
                </h1>
            </div>
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
            >
                <div className="pt-2 md:pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    {FirstNameInputContent}
                    {LastNameInputContent}
                    {EmailInputContent}
                    {UsernameInputContent}
                    {PasswordInputContent}
                    {ConfirmPasswordInputContent}
                    <div className="flex w-full">
                        <button
                            disabled={isSubmitting}
                            className={`relative overflow-hidden w-full bg-green-600 text-white text-lg md:text-xl font-bold rounded transition duration-500 ease-in-out ${
                                isSubmitting
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'hover:bg-green-600'
                            }`}
                        >
                            {isSubmitting
                                ? BusyButtonContent
                                : NormalButtonContent}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
