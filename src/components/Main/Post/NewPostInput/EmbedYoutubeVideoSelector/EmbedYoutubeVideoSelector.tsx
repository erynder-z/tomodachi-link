import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { motion } from 'framer-motion';
import { displayErrorInfo } from '../../../../UiElements/UserNotification/displayErrorInfo';
import useEscapeKey from '../../../../../hooks/useEscapeKeyToHandleAction';

type EmbedYoutubeVideoSelectorProps = {
    setShowYoutubeEmbed: React.Dispatch<React.SetStateAction<boolean>>;
    setYoutubeID: React.Dispatch<React.SetStateAction<string | undefined>>;
};

/**
 * Component for selecting and embedding a YouTube video by providing its URL.
 *
 * @component
 * @param {EmbedYoutubeVideoSelectorProps} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShowYoutubeEmbed - Function to set the visibility of the YouTube video selector.
 * @param {React.Dispatch<React.SetStateAction<string | undefined>>} props.setYoutubeID - Function to set the YouTube video ID.
 * @returns {JSX.Element} The rendered EmbedYoutubeVideoSelector component.
 */
export default function EmbedYoutubeVideoSelector({
    setShowYoutubeEmbed,
    setYoutubeID,
}: EmbedYoutubeVideoSelectorProps): JSX.Element {
    const { setInfo } = useInfoCard();
    const [selectedURL, setSelectedURL] = useState<string>('');
    const [videoID, setVideoID] = useState<string | null>(null);

    /**
     * Function to close the YouTube video selector component.
     *
     * @function
     * @returns {void}
     */
    const handleComponentClose = (): void => setShowYoutubeEmbed(false);

    /**
     * Custom hook to close the overlay when pressing ESC
     *
     */
    useEscapeKey(handleComponentClose);

    /**
     * Function to extract the YouTube video ID from the provided URL.
     *
     * @function
     * @param {string} url - The YouTube video URL.
     * @returns {string | null} The extracted YouTube video ID, or null if not found.
     */
    const getYoutubeID = (url: string): string | null => {
        const URLcopy = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return URLcopy[2] !== undefined
            ? URLcopy[2].split(/[^0-9a-z_-]/i)[0]
            : null;
    };

    /**
     * Function to handle form submission, set the YouTube video ID, and close the selector.
     *
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @returns {void}
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (videoID) {
            setYoutubeID(videoID);
            setShowYoutubeEmbed(false);
        } else {
            displayErrorInfo(setInfo, 'This is no YouTube URL!', '😼');
        }
    };

    /**
     * @effect
     * Effect hook to update the videoID state when the selectedURL changes.
     */
    useEffect(() => {
        if (selectedURL) setVideoID(getYoutubeID(selectedURL));
    }, [selectedURL]);

    /**
     * Renders a close button element.
     *
     * @type {JSX.Element}
     */
    const CloseButton: JSX.Element = (
        <motion.button
            onClick={handleComponentClose}
            whileTap={{ scale: 0.97 }}
            className="absolute -top-16 -right-10 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
        >
            <FaTimes size="1.25em" />
        </motion.button>
    );

    /**
     * Renders a input field for the URL string.
     *
     * @type {JSX.Element}
     */
    const InputField: JSX.Element = (
        <>
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
                Enter YouTube URL
            </label>
        </>
    );

    /**
     * Renders a button for submitting the form.
     *
     * @type {JSX.Element}
     */
    const AddButton: JSX.Element = (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-500 text-white px-2 py-1 rounded"
        >
            Add
        </motion.button>
    );

    /**
     * The rendered EmbedYoutubeVideoSelector component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80">
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="w-3/4 md:w-1/2 lg:w-1/5 py-8 text-base flex flex-col gap-4 bg-card dark:bg-cardDark rounded-md text-gray-700 dark:text-gray-400 sm:text-lg sm:leading-7 p-4"
            >
                <div className="relative z-0">
                    {CloseButton}
                    {InputField}
                </div>
                <div className="flex w-full">{AddButton} </div>
            </form>
        </div>
    );
}
