import { FaGoogle, FaAngleDoubleRight } from 'react-icons/fa';
import ButtonBusy from '../../UiElements/LoadingSpinner/ButtonBusy';

type GoogleLoginButtonProps = { isSubmitting: boolean };

export default function GoogleLoginButton({
    isSubmitting,
}: GoogleLoginButtonProps) {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const githubLoginURL = `${SERVER_URL}/api/v1/login/google`;

    const handleGoogleLogin = () => {
        window.open(githubLoginURL, '_self');
    };

    const BusyButtonContent = <ButtonBusy />;

    const NormalButtonContent = (
        <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-lg text-white hover:text-white">
            <div className="transition-all duration-300 group-hover:pr-4 flex justify-center items-center gap-2">
                Login with Google <FaGoogle size="1.5em" />
                <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                    <FaAngleDoubleRight size="1.5em" />
                </span>
            </div>
        </span>
    );

    return (
        <button
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
    );
}