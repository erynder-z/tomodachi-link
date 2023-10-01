import ButtonBusy from '../../UiElements/LoadingSpinner/ButtonBusy';
import { MdSentimentVerySatisfied } from 'react-icons/md';

type SignupFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isSubmitting: boolean;
};

export default function SignupForm({
    handleSubmit,
    isSubmitting,
}: SignupFormProps) {
    const FirstNameInputContent = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="firstName"
                name="firstName"
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="firstName"
                className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                First name
            </label>
        </div>
    );

    const LastNameInputContent = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="lastName"
                name="lastName"
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="lastName"
                className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Last name
            </label>
        </div>
    );

    const EmailInputContent = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="email"
                className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Email
            </label>
        </div>
    );

    const UsernameInputContent = (
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

    const PasswordInputContent = (
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

    const ConfirmPasswordInputContent = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                placeholder=" "
            />
            <label
                htmlFor="confirmPassword"
                className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Confirm password
            </label>
        </div>
    );

    const BusyButtonContent = <ButtonBusy />;

    const NormalButtonContent = (
        <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-xl">
            <span className="transition-all duration-300 group-hover:pr-4">
                Register
                <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                    <MdSentimentVerySatisfied size="1.5em" />
                </span>
            </span>
        </span>
    );

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
