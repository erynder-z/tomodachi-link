import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PostInputTextarea from '../NewPostInput/PostInputTextarea/PostInputTextarea';
import SelectedImageArea from '../NewPostInput/SelectedImageArea/SelectedImageArea';
import ButtonArea from '../NewPostInput/ButtonArea/ButtonArea';
import GifSelector from '../NewPostInput/GifSelector/GifSelector';
import EmbedYoutubeVideoSelector from '../NewPostInput/EmbedYoutubeVideoSelector/EmbedYoutubeVideoSelector';
import GifArea from '../NewPostInput/GifArea/GifArea';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { PostType } from '../../../../types/postTypes';
import EmojiSelector from '../NewPostInput/EmojiSelector/EmojiPicker';
import PostEditImageSection from './PostEditImageSection/PostEditImageSection';
import PostEditGifSection from './PostEditGifSection/PostEditGifSection';
import PostEditEmbeddedYoutubeVideo from './PostEditEmbeddedYoutubeVideo/PostEditEmbeddedYoutubeVideo';
import { GiphyGif, ImageType, ViewMode } from '../../../../types/miscTypes';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import resizeFile from '../../../../utilities/ImageResizer';
import EmbeddedYoutubeVideoArea from '../NewPostInput/EmbeddedYoutubeVideoArea/EmbeddedYoutubeVideoArea';
import { motion, AnimatePresence } from 'framer-motion';
import { displaySuccessInfo } from '../../../UiElements/UserNotification/displaySuccessInfo';
import { displayErrorInfo } from '../../../UiElements/UserNotification/displayErrorInfo';
import useEscapeKey from '../../../../hooks/useEscapeKeyToHandleAction';

type EditPostInputProps = {
    postDetails: PostType | null;
    shouldPostEditShow: boolean;
    setShouldPostEditShow: React.Dispatch<React.SetStateAction<boolean>>;
    onPostChange?: () => void;
    setShouldRefreshPictureList?: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Component for editing a post.
 *
 * @component
 * @param {EditPostInputProps} props - The props object.
 * @param {PostType | null} props.postDetails - Details of the post being edited.
 * @param {boolean} props.shouldPostEditShow - Determines if the edit post input is visible.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShouldPostEditShow - Function to control the visibility of the edit post input.
 * @param {() => void} [props.onPostChange] - Callback function triggered when the post is changed.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [props.setShouldRefreshPictureList] - Function to control the refresh of the picture list.
 * @returns {JSX.Element} The rendered EditPostInput component.
 */
export default function EditPostInput({
    postDetails,
    shouldPostEditShow,
    setShouldPostEditShow,
    onPostChange,
    setShouldRefreshPictureList,
}: EditPostInputProps): JSX.Element {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [postText, setPostText] = useState<string>(postDetails?.text || '');
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.None);
    const [selectedImage, setSelectedImage] = useState<File | undefined>(
        undefined
    );
    const [youtubeID, setYoutubeID] = useState<string | undefined>(undefined);
    const [gif, setGif] = useState<GiphyGif | undefined>(undefined);
    const [hasImage, setHasImage] = useState(false);
    const [dbImage, setDbImage] = useState<ImageType | undefined>(
        postDetails?.image
    );
    const [dbGif, setDbGif] = useState<string | undefined>(postDetails?.gifUrl);
    const [dbEmbeddedVideoID, setDbEmbeddedVideoID] = useState<
        string | undefined
    >(postDetails?.embeddedVideoID);

    const [shouldImageBeDeleted, setShouldImageBeDeleted] =
        useState<boolean>(false);
    const [shouldGifBeDeleted, setShouldGIfBeDeleted] =
        useState<boolean>(false);
    const [shouldVideoBeDeleted, setShouldVideoBeDeleted] =
        useState<boolean>(false);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { firstName } = currentUserData || {};

    /**
     * Submits the edit form data to update the post.
     *
     * @async
     * @function
     * @param {FormData} formData - The form data to be submitted.
     * @return {Promise<void>} A promise that resolves once the post is updated.
     */
    const submitEditFormData = async (formData: FormData): Promise<void> => {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const id = postDetails?._id;
        const response = await fetch(`${SERVER_URL}/api/v1/post/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            displaySuccessInfo(setInfo, 'Post updated successfully!', '👍');
            setPostText('');
            setSelectedImage(undefined);
            setYoutubeID(undefined);
            setGif(undefined);
            if (onPostChange) {
                onPostChange();
            }
            if (
                (setShouldRefreshPictureList && hasImage) ||
                (setShouldRefreshPictureList && shouldImageBeDeleted)
            ) {
                setShouldRefreshPictureList(true);
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
     * Handles the form submission for editing a post.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @return {Promise<void>} A promise that resolves once the form is submitted.
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
                formData.append(
                    'shouldImageBeDeleted',
                    shouldImageBeDeleted.toString()
                );
                if (shouldGifBeDeleted && !gif) {
                    formData.append(
                        'shouldGifBeDeleted',
                        shouldGifBeDeleted.toString()
                    );
                } else {
                    formData.append('shouldGifBeDeleted', false.toString());
                }

                formData.append(
                    'shouldVideoBeDeleted',
                    shouldVideoBeDeleted.toString()
                );
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
                await submitEditFormData(formData);
            } catch (error) {
                displayErrorInfo(setInfo, 'An error occurred', '👻');
            }

            setIsSubmitting(false);
        }
    };

    /**
     * Handles the form submission for editing a post.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @return {Promise<void>} A promise that resolves once the form is submitted.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        handleFormSubmit(event);
    };

    /**
     * Closes the edit post input component.
     *
     * @function
     * @return {void} No return value.
     */
    const handleComponentClose = (): void => setShouldPostEditShow(false);

    /**
     * Custom hook to close the overlay when pressing ESC
     *
     */
    useEscapeKey(handleComponentClose);

    /**
     * Handles the new post text change.
     *
     * @function
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event.
     * @return {void} No return value.
     */
    const handleNewPostChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => setPostText(event.target.value);

    /**
     * Handles the selection of an image for the post.
     *
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event for the input field.
     * @return {void} No return value.
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

        setShouldImageBeDeleted(false);
    };

    /**
     * Handles the deletion of the selected image for the post.
     *
     * @function
     * @return {void} No return value.
     */
    const handleImageDelete = (): void => {
        setShouldImageBeDeleted(true);
        setDbImage(undefined);
    };

    /**
     * Handles the deletion of the selected video for the post.
     *
     * @function
     * @return {void} No return value.
     */
    const handleVideoDelete = (): void => {
        setShouldVideoBeDeleted(true);
        setDbEmbeddedVideoID(undefined);
    };

    /**
     * Handles the deletion of the selected GIF for the post.
     *
     * @function
     * @return {void} No return value.
     */
    const handleGifDelete = (): void => {
        setShouldGIfBeDeleted(true);
        setDbGif(undefined);
    };

    /**
     * Renders a close button element.
     *
     * @type {JSX.Element}
     */
    const CloseButton: JSX.Element = (
        <motion.button
            onClick={handleComponentClose}
            whileTap={{ scale: 0.97 }}
            className="absolute top-2 right-2 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
        >
            <FaTimes size="1.5em" />
        </motion.button>
    );

    /**
     * Renders the main edit post form.
     *
     * @type {JSX.Element}
     */
    const PostEditForm: JSX.Element = (
        <form
            action=""
            method="PATCH"
            onSubmit={handleSubmit}
            className="flex w-full divide-gray-200"
        >
            <div className="relative w-full text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                <PostInputTextarea
                    postText={postText}
                    handleNewPostChange={handleNewPostChange}
                    firstName={firstName}
                    isPostEdit={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dbImage && (
                        <div className="bg-card dark:bg-cardDark py-2 md:py-4">
                            <PostEditImageSection
                                handleImageDelete={handleImageDelete}
                                dbImage={dbImage.data}
                            />
                        </div>
                    )}
                    {dbGif && (
                        <div className="bg-card dark:bg-cardDark py-2 md:py-4">
                            <PostEditGifSection
                                handleGifDelete={handleGifDelete}
                                dbGif={dbGif}
                            />
                        </div>
                    )}
                    {dbEmbeddedVideoID && (
                        <div className="bg-card dark:bg-cardDark py-2 md:py-4">
                            <PostEditEmbeddedYoutubeVideo
                                handleVideoDelete={handleVideoDelete}
                                dbEmbeddedVideoID={dbEmbeddedVideoID}
                            />
                        </div>
                    )}
                </div>
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
     * Renders the EmojiSelector modal.
     *
     * @type {JSX.Element}
     */
    const EmojiSelectorModal: JSX.Element = (
        <motion.div
            key="emojiSelector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <EmojiSelector
                setText={setPostText}
                setShowEmojiPicker={() => setViewMode(ViewMode.None)}
            />
        </motion.div>
    );

    /**
     * Renders the GifSelector modal.
     *
     * @type {JSX.Element}
     */
    const GifSelectorModal: JSX.Element = (
        <motion.div
            key="gifSelector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <GifSelector
                setShowGifSelector={() => setViewMode(ViewMode.None)}
                setGif={setGif}
            />
        </motion.div>
    );

    /**
     * Renders the YoutubeSelect modal.
     *
     * @type {JSX.Element}
     */
    const YoutubeSelectModal: JSX.Element = (
        <motion.div
            key="youtubeSelector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <EmbedYoutubeVideoSelector
                setShowYoutubeEmbed={() => setViewMode(ViewMode.None)}
                setYoutubeID={setYoutubeID}
            />
        </motion.div>
    );

    /**
     * The rendered EditPostInput component.
     *
     * @type {JSX.Element}
     */
    return (
        <AnimatePresence>
            {shouldPostEditShow && (
                <motion.div
                    key="postEditModal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center gap-4 bg-gray-700/90 px-4 py-8"
                >
                    <div className="relative flex gap-4 px-4 py-8 w-full lg:w-2/6 lg:flex-row lg:justify-around lg:shadow-lg bg-card dark:bg-cardDark overflow-auto">
                        {CloseButton}
                        {PostEditForm}
                        <AnimatePresence>
                            {viewMode === ViewMode.EmojiPicker &&
                                EmojiSelectorModal}

                            {viewMode === ViewMode.GifSelector &&
                                GifSelectorModal}

                            {viewMode === ViewMode.YoutubeEmbed &&
                                YoutubeSelectModal}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
