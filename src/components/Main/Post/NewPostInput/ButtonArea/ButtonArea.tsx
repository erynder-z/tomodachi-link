import { FaRegSmileBeam, FaRegImage, FaYoutube } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { TbGif } from 'react-icons/tb';
import { ViewMode } from '../../../../../types/miscTypes';
import ButtonBusy from '../../../../UiElements/LoadingSpinner/ButtonBusy';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

type ButtonAreaProps = {
    handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    postText: string;
    isSubmitting: boolean;
};

/**
 * Component for rendering buttons in the post input area.
 *
 * @component
 * @param {ButtonAreaProps} props - The props object.
 * @param {Function} props.handleImageSelect - Function to handle the selection of an image.
 * @param {ViewMode} props.viewMode - The current view mode.
 * @param {Function} props.setViewMode - Function to set the view mode.
 * @param {string} props.postText - The text content of the post.
 * @param {boolean} props.isSubmitting - Flag indicating whether the post is being submitted.
 * @returns {JSX.Element} The rendered ButtonArea component.
 */
export default function ButtonArea({
    handleImageSelect,
    viewMode,
    setViewMode,
    postText,
    isSubmitting,
}: ButtonAreaProps): JSX.Element {
    const isButtonDisabled = isSubmitting || postText.trim() === '';

    /**
     * Button for uploading and inserting images.
     *
     * @type {JSX.Element}
     */
    const YoutubeButton: JSX.Element = (
        <>
            <label
                data-tooltip-id="post-image-tooltip"
                data-tooltip-content="Upload and insert image"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                className="flex items-center cursor-pointer"
            >
                <input
                    type="file"
                    name="imagePicker"
                    accept="image/jpeg, image/png, image/webp"
                    className="hidden"
                    onChange={handleImageSelect}
                />
                <FaRegImage className="text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300t" />
                <Tooltip
                    id="post-image-tooltip"
                    style={{ fontSize: '0.75rem' }}
                />
            </label>
            <motion.button
                data-tooltip-id="post-youtube-tooltip"
                data-tooltip-content="Insert YouTube video"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setViewMode(
                        viewMode === ViewMode.YoutubeEmbed
                            ? ViewMode.None
                            : ViewMode.YoutubeEmbed
                    );
                }}
                whileTap={{ scale: 0.97 }}
                className="text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <FaYoutube />
            </motion.button>
            <Tooltip
                id="post-youtube-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );

    /**
     * Button for inserting GIFs.
     *
     * @type {JSX.Element}
     */
    const GifButton: JSX.Element = (
        <>
            <motion.button
                data-tooltip-id="post-gif-tooltip"
                data-tooltip-content="Insert gif"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setViewMode(
                        viewMode === ViewMode.GifSelector
                            ? ViewMode.None
                            : ViewMode.GifSelector
                    );
                }}
                whileTap={{ scale: 0.97 }}
                className="text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <TbGif />
            </motion.button>
            <Tooltip id="post-gif-tooltip" style={{ fontSize: '0.75rem' }} />
        </>
    );

    /**
     * Button for inserting emojis.
     *
     * @type {JSX.Element}
     */
    const EmojiButton: JSX.Element = (
        <>
            <motion.button
                data-tooltip-id="post-emoji-tooltip"
                data-tooltip-content="Insert emoji"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setViewMode(
                        viewMode === ViewMode.EmojiPicker
                            ? ViewMode.None
                            : ViewMode.EmojiPicker
                    );
                }}
                whileTap={{ scale: 0.97 }}
                className="text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <FaRegSmileBeam />
            </motion.button>
            <Tooltip id="post-emoji-tooltip" style={{ fontSize: '0.75rem' }} />
        </>
    );

    /**
     * Button for sending the post.
     *
     * @type {JSX.Element}
     */
    const SendButton: JSX.Element = (
        <>
            <motion.button
                data-tooltip-id="post-send-tooltip"
                data-tooltip-content="Upload post"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                disabled={isSubmitting}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center justify-center h-8 w-20 rounded-full text-regularTextDark ml-auto text-sm duration-300 ${
                    isButtonDisabled
                        ? 'bg-gray-500 hover:bg-gray-600'
                        : 'bg-highlight dark:bg-highlightDark hover:bg-highlightHover dark:hover:bg-highlightDarkHover'
                }`}
                title={postText ? undefined : 'Please enter a message'}
            >
                {isSubmitting ? <ButtonBusy /> : <MdSend size="1.5em" />}
            </motion.button>
            {!isButtonDisabled && (
                <Tooltip
                    id="post-send-tooltip"
                    style={{ fontSize: '0.75rem' }}
                />
            )}
        </>
    );

    /**
     * The rendered ButtonArea component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex w-full gap-4">
            {YoutubeButton}
            {GifButton}
            {EmojiButton}
            {SendButton}
        </div>
    );
}
