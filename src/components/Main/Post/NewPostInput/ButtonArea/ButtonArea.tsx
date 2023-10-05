import { FaRegSmileBeam, FaRegImage, FaYoutube } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { TbGif } from 'react-icons/tb';
import { ViewMode } from '../../../../../types/miscTypes';
import ButtonBusy from '../../../../UiElements/LoadingSpinner/ButtonBusy';

type ButtonAreaProps = {
    handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    postText: string;
    isSubmitting: boolean;
};

export default function ButtonArea({
    handleImageSelect,
    viewMode,
    setViewMode,
    postText,
    isSubmitting,
}: ButtonAreaProps) {
    const YoutubeButton = (
        <>
            <label className="flex items-center cursor-pointer">
                <input
                    type="file"
                    name="imagePicker"
                    accept="image/jpeg, image/png, image/webp"
                    className="hidden"
                    onChange={handleImageSelect}
                />
                <FaRegImage className="text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300t" />
            </label>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setViewMode(
                        viewMode === ViewMode.YoutubeEmbed
                            ? ViewMode.None
                            : ViewMode.YoutubeEmbed
                    );
                }}
                className="text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <FaYoutube />
            </button>
        </>
    );

    const GifButton = (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setViewMode(
                    viewMode === ViewMode.GifSelector
                        ? ViewMode.None
                        : ViewMode.GifSelector
                );
            }}
            className="text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
        >
            <TbGif />
        </button>
    );

    const EmojiButton = (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setViewMode(
                    viewMode === ViewMode.EmojiPicker
                        ? ViewMode.None
                        : ViewMode.EmojiPicker
                );
            }}
            className="text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
        >
            <FaRegSmileBeam />
        </button>
    );

    const SendButton = (
        <button
            disabled={isSubmitting}
            className={`flex items-center justify-center h-8 w-20 rounded-full text-regularTextDark ml-auto text-sm duration-300 ${
                !postText || isSubmitting
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-highlight dark:bg-highlightDark hover:bg-highlightHover dark:hover:bg-highlightDarkHover'
            }`}
            title={postText ? undefined : 'Please enter a message'}
        >
            {isSubmitting ? <ButtonBusy /> : <MdSend size="1.5em" />}
        </button>
    );

    return (
        <div className="flex w-full gap-4">
            {YoutubeButton}
            {GifButton}
            {EmojiButton}
            {SendButton}
        </div>
    );
}
