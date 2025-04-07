import { useState } from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import resizeFile from '../../../../utilities/ImageResizer';
import EmbedYoutubeVideoSelector from './EmbedYoutubeVideoSelector/EmbedYoutubeVideoSelector';
import GifSelector from './GifSelector/GifSelector';
import PostInputTextarea from './PostInputTextarea/PostInputTextarea';
import EmbeddedYoutubeVideoArea from './EmbeddedYoutubeVideoArea/EmbeddedYoutubeVideoArea';
import SelectedImageArea from './SelectedImageArea/SelectedImageArea';
import GifArea from './GifArea/GifArea';
import ButtonArea from './ButtonArea/ButtonArea';
import EmojiSelector from './EmojiSelector/EmojiPicker';
import { GiphyGif, ViewMode } from '../../../../types/miscTypes';
import { motion, AnimatePresence } from 'framer-motion';
import { displaySuccessInfo } from '../../../UiElements/UserNotification/displaySuccessInfo';
import { displayErrorInfo } from '../../../UiElements/UserNotification/displayErrorInfo';

type NewPostInputProps = {
    handleRefreshPosts?: () => void;
    handleRefreshPics?: () => void;
};

/**
 * Component for creating a new post with text, images, embedded YouTube videos, gifs, and emojis.
 *
 * @component
 * @param {NewPostInputProps} props - The props object.
 * @param {() => void} props.handleRefreshPosts - The callback function to refresh the list of posts.
 * @param {() => void} props.handleRefreshPics - The callback function to refresh the list of pictures.
 * @returns {JSX.Element} The rendered NewPostInput component.
 */
export default function NewPostInput({
    handleRefreshPosts,
    handleRefreshPics,
}: NewPostInputProps): JSX.Element {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { currentUserData } = useCurrentUserData();
    const { firstName } = currentUserData || {};

    const [postText, setPostText] = useState<string>('');
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.None);
    const [selectedImage, setSelectedImage] = useState<File | undefined>(
        undefined
    );
    const [youtubeID, setYoutubeID] = useState<string | undefined>(undefined);
    const [gif, setGif] = useState<GiphyGif | undefined>(undefined);
    const [hasImage, setHasImage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    /**
     * Handles the change event for the new post textarea.
     *
     * @function
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event.
     * @returns {void}
     */
    const handleNewPostChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => setPostText(event.target.value);

    /**
     * Handles the selection of an image file.
     *
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the file input.
     * @returns {void}
     */
    const handleImageSelect = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
            setHasImage(true);
        } else {
            setSelectedImage(undefined);
            setHasImage(false);
        }
    };

    /**
     * Submits the form data to create a new post.
     *
     * @async
     * @function
     * @param {FormData} formData - The form data to be submitted.
     * @returns {Promise<void>} A Promise that resolves when the submission is complete.
     */
    const submitFormData = async (formData: FormData): Promise<void> => {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${SERVER_URL}/api/v1/post`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            displaySuccessInfo(setInfo, 'Post created successfully!', '👍');
            setPostText('');
            setSelectedImage(undefined);
            setYoutubeID(undefined);
            setGif(undefined);
            if (handleRefreshPosts) {
                handleRefreshPosts();
                if (handleRefreshPics && hasImage) {
                    handleRefreshPics();
                    setHasImage(false);
                }
            }
        } else {
            const data = await response.json();
            const errorMessages = data.errors;
            const message = errorMessages
                .map((error: { msg: string }) => error.msg)
                .join(', ');

            displayErrorInfo(setInfo, message, '👻');

            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    };

    /**
     * Handles the form submission event.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @returns {Promise<void>} A Promise that resolves when the submission is complete.
     */
    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        if (token) {
            setIsSubmitting(true);

            try {
                const formData = new FormData();
                formData.append('newPost', postText);
                if (selectedImage) {
                    const resizedFile = await resizeFile(selectedImage);
                    formData.append('imagePicker', resizedFile as File);
                }
                if (youtubeID) {
                    formData.append('embeddedVideoID', youtubeID);
                }
                if (
                    gif &&
                    gif.images &&
                    gif.images.fixed_width &&
                    gif.images.fixed_width.url
                ) {
                    formData.append('gifUrl', gif.images.fixed_width.url);
                }

                await submitFormData(formData);
            } catch (error) {
                displayErrorInfo(setInfo, 'An error occurred', '👻');
            }

            setIsSubmitting(false);
        }
    };

    /**
     * Handles the form submission event and calls handleFormSubmit.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @returns {Promise<void>} A Promise that resolves when the submission is complete.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        handleFormSubmit(event);
    };

    /**
     * Form for creating a new post.
     *
     * @type {JSX.Element}
     */
    const FormContent: JSX.Element = (
        <form
            action=""
            method="POST"
            onSubmit={handleSubmit}
            className="flex w-full divide-gray-200"
        >
            <div className="relative w-full text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                <PostInputTextarea
                    postText={postText}
                    handleNewPostChange={handleNewPostChange}
                    firstName={firstName}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {youtubeID && (
                        <EmbeddedYoutubeVideoArea
                            setYoutubeID={setYoutubeID}
                            youtubeID={youtubeID}
                        />
                    )}
                    {selectedImage && (
                        <SelectedImageArea
                            setSelectedImage={setSelectedImage}
                            selectedImage={selectedImage}
                        />
                    )}
                    {gif && <GifArea setGif={setGif} gif={gif} />}
                </div>
                <ButtonArea
                    handleImageSelect={handleImageSelect}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    postText={postText}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    );

    /**
     * Modal for selecting emojis.
     *
     * @type {JSX.Element}
     */
    const EmojiSelectorModal: JSX.Element = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: true }}
        >
            <EmojiSelector
                setText={setPostText}
                setShowEmojiPicker={() => setViewMode(ViewMode.None)}
            />
        </motion.div>
    );

    /**
     * Modal for selecting gifs.
     *
     * @type {JSX.Element}
     */
    const GifSelectorModal: JSX.Element = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: true }}
        >
            <GifSelector
                setShowGifSelector={() => setViewMode(ViewMode.None)}
                setGif={setGif}
            />
        </motion.div>
    );

    /**
     * Modal for selecting embedded YouTube videos.
     *
     * @type {JSX.Element}
     */
    const YoutubeSelectorModal: JSX.Element = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: true }}
        >
            <EmbedYoutubeVideoSelector
                setShowYoutubeEmbed={() => setViewMode(ViewMode.None)}
                setYoutubeID={setYoutubeID}
            />
        </motion.div>
    );

    /**
     * The rendered NewPostInput component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex gap-4 p-2 md:p-4 lg:w-full lg:flex-row lg:justify-around rounded lg:shadow-lg bg-card dark:bg-cardDark">
            {FormContent}
            <AnimatePresence>
                <div className="absolute z-50">
                    {viewMode === ViewMode.EmojiPicker && EmojiSelectorModal}

                    {viewMode === ViewMode.GifSelector && GifSelectorModal}

                    {viewMode === ViewMode.YoutubeEmbed && YoutubeSelectorModal}
                </div>
            </AnimatePresence>
        </div>
    );
}
