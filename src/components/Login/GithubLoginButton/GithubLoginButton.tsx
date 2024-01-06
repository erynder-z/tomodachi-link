import { FaGithub, FaAngleDoubleRight } from 'react-icons/fa';
import ButtonBusy from '../../UiElements/LoadingSpinner/ButtonBusy';
import { Tooltip } from 'react-tooltip';

type GithubLoginButtonProps = { isSubmitting: boolean };

export default function GithubLoginButton({
    isSubmitting,
}: GithubLoginButtonProps) {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const githubLoginURL = `${SERVER_URL}/api/v1/oauth/github`;

    const handleGithubLogin = () => {
        window.open(githubLoginURL, '_self');
    };

    const BusyButtonContent = <ButtonBusy />;

    const NormalButtonContent = (
        <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-lg text-white hover:text-white">
            <div className="flex justify-center items-center gap-2">
                <FaGithub
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
        <>
            <button
                data-tooltip-id="github-login-tooltip"
                data-tooltip-content="Login with your GitHub account"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                disabled={isSubmitting}
                onClick={handleGithubLogin}
                className={` relative overflow-hidden w-full text-white font-bold rounded transition duration-500 ease-in-out ${
                    isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-slate-900 hover:bg-slate-700'
                }`}
            >
                {isSubmitting ? BusyButtonContent : NormalButtonContent}
            </button>
            <Tooltip
                id="github-login-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );
}
