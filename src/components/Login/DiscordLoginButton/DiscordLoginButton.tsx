import { FaDiscord, FaAngleDoubleRight } from 'react-icons/fa';
import ButtonBusy from '../../UiElements/LoadingSpinner/ButtonBusy';

type DiscordLoginButtonProps = { isSubmitting: boolean };

export default function DiscordLoginButton({
    isSubmitting,
}: DiscordLoginButtonProps) {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const githubLoginURL = `${SERVER_URL}/api/v1/oauth/discord`;

    const handleDiscordLogin = () => {
        window.open(githubLoginURL, '_self');
    };

    const BusyButtonContent = <ButtonBusy />;

    const NormalButtonContent = (
        <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-lg text-white hover:text-white">
            <div className="flex justify-center items-center gap-2">
                <FaDiscord
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

    return (
        <button
            disabled={isSubmitting}
            onClick={handleDiscordLogin}
            className={` relative overflow-hidden w-full text-white font-bold rounded transition duration-500 ease-in-out ${
                isSubmitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
            {' '}
            {isSubmitting ? BusyButtonContent : NormalButtonContent}
        </button>
    );
}
