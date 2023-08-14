import React, { useEffect, useState } from 'react';
import { FaTimes, FaRegFrown } from 'react-icons/fa';
import useInfoCard from '../../../../../hooks/useInfoCard';

type EmbedYoutubeVideoSelectorProps = {
    setShowYoutubeEmbed: React.Dispatch<React.SetStateAction<boolean>>;
    setYoutubeID: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function EmbedYoutubeVideoSelector({
    setShowYoutubeEmbed,
    setYoutubeID,
}: EmbedYoutubeVideoSelectorProps) {
    const { setInfo } = useInfoCard();
    const [selectedURL, setSelectedURL] = useState<string>('');
    const [videoID, setVideoID] = useState<string | null>(null);

    const handleComponentClose = () => {
        setShowYoutubeEmbed(false);
    };

    const getYoutubeID = (url: string) => {
        const URLcopy = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return URLcopy[2] !== undefined
            ? URLcopy[2].split(/[^0-9a-z_-]/i)[0]
            : null;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (videoID) {
            setYoutubeID(videoID);
            setShowYoutubeEmbed(false);
        } else {
            setInfo({
                typeOfInfo: 'bad',
                message: 'This is no YouTube URL!',
                icon: <FaRegFrown />,
            });
        }
    };

    useEffect(() => {
        setVideoID(getYoutubeID(selectedURL));
    }, [selectedURL]);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80">
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200 py-8 text-base flex flex-col gap-4 bg-canvas dark:bg-cardDark rounded-md text-gray-700 dark:text-gray-400 sm:text-lg sm:leading-7 p-4"
            >
                <div className="relative z-0">
                    <button
                        onClick={handleComponentClose}
                        className="absolute -top-16 -right-10 bg-canvas dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
                    >
                        <FaTimes size="1.25em" />
                    </button>
                    <input
                        required
                        autoComplete="off"
                        id="embedVideoURL"
                        name="embedVideoURL"
                        type="text"
                        onChange={(event) => {
                            setSelectedURL(event.target.value);
                        }}
                        className="block py-2.5 px-0 w-full text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="embedVideoURL"
                        className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter URL
                    </label>
                </div>

                <div className="flex w-full">
                    <button className="w-full bg-blue-500 text-white px-2 py-1">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
