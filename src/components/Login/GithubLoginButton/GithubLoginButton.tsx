import { FaGithub, FaAngleDoubleRight } from 'react-icons/fa';

export default function GithubLoginButton() {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const githubLoginURL = `${SERVER_URL}/api/v1/login/github`;

    return (
        <button className="relative overflow-hidden w-full bg-slate-900 hover:bg-slate-700 text-white font-bold rounded transition duration-500 ease-in-out">
            <a
                href={githubLoginURL}
                className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-lg text-white hover:text-white"
            >
                <div className="transition-all duration-300 group-hover:pr-4 flex justify-center items-center gap-2">
                    Login with GitHub <FaGithub size="1.5em" />
                    <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                        <FaAngleDoubleRight size="1.5em" />
                    </span>
                </div>
            </a>
        </button>
    );
}
