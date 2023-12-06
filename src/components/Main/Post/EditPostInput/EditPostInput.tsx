import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PostInputTextarea from '../NewPostInput/PostInputTextarea/PostInputTextarea';
import SelectedImageArea from '../NewPostInput/SelectedImageArea/SelectedImageArea';
import ButtonArea from '../NewPostInput/ButtonArea/ButtonArea';
import GifSelector from '../NewPostInput/GifSelector/GifSelector';
import EmbedYoutubeVideoSelector from '../NewPostInput/EmbedYoutubeVideoSelector/EmbedYoutubeVideoSelector';
import { TenorImage } from 'gif-picker-react';
import GifArea from '../NewPostInput/GifArea/GifArea';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { PostType } from '../../../../types/postTypes';
import EmojiSelector from '../NewPostInput/EmojiSelector/EmojiPicker';
import PostEditImageSection from './PostEditImageSection/PostEditImageSection';
import PostEditGifSection from './PostEditGifSection/PostEditGifSection';
import PostEditEmbeddedYoutubeVideo from './PostEditEmbeddedYoutubeVideo/PostEditEmbeddedYoutubeVideo';
import { ImageType, ViewMode } from '../../../../types/miscTypes';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import resizeFile from '../../../../utilities/ImageResizer';
import EmbeddedYoutubeVideoArea from '../NewPostInput/EmbeddedYoutubeVideoArea/EmbeddedYoutubeVideoArea';
import { motion, AnimatePresence } from 'framer-motion';
import { displaySuccessInfo } from '../../../UiElements/UserNotification/displaySuccessInfo';
import { displayErrorInfo } from '../../../UiElements/UserNotification/displayErrorInfo';

type EditPostInputProps = {
    postDetails: PostType | null;
    shouldPostEditShow: boolean;
    setShouldPostEditShow: React.Dispatch<React.SetStateAction<boolean>>;
    onPostChange?: () => void;
    setShouldRefreshPictureList?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditPostInput({
    postDetails,
    shouldPostEditShow,
    setShouldPostEditShow,
    onPostChange,
    setShouldRefreshPictureList,
}: EditPostInputProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [postText, setPostText] = useState<string>(postDetails?.text || '');
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.None);
    const [selectedImage, setSelectedImage] = useState<File | undefined>(
        undefined
    );
    const [youtubeID, setYoutubeID] = useState<string | undefined>(undefined);
    const [gif, setGif] = useState<TenorImage | undefined>(undefined);
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

    const submitEditFormData = async (formData: FormData) => {
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

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
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
                formData.append(
                    'shouldGifBeDeleted',
                    shouldGifBeDeleted.toString()
                );
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
                if (gif) {
                    formData.append('gifUrl', gif.url);
                }

                await submitEditFormData(formData);
            } catch (error) {
                displayErrorInfo(setInfo, 'An error occurred', '👻');
            }

            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        handleFormSubmit(event);
    };

    const handleComponentClose = () => setShouldPostEditShow(false);

    const handleNewPostChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => setPostText(event.target.value);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
            setHasImage(true);
        } else {
            setSelectedImage(undefined);
            setHasImage(false);
        }

        setShouldImageBeDeleted(false);
    };

    const handleImageDelete = () => {
        setShouldImageBeDeleted(true);
        setDbImage(undefined);
    };

    const handleVideoDelete = () => {
        setShouldVideoBeDeleted(true);
        setDbEmbeddedVideoID(undefined);
    };

    const handleGifDelete = () => {
        setShouldGIfBeDeleted(true);
        setDbGif(undefined);
    };

    const CloseButton = (
        <motion.button
            onClick={handleComponentClose}
            whileTap={{ scale: 0.97 }}
            className="absolute -top-8 -right-0 md:-right-10 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
        >
            <FaTimes size="1.5em" />
        </motion.button>
    );

    const PostEditForm = (
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

    const EmojiSelectorModal = (
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

    const GifSelectorModal = (
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

    const YoutubeSelectModal = (
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

    return (
        <AnimatePresence>
            {shouldPostEditShow && (
                <motion.div
                    key="postEditModal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-700/90 px-4 py-8"
                >
                    <div className="relative flex gap-4 px-4 py-8 w-full lg:w-2/6 lg:flex-row lg:justify-around lg:shadow-lg bg-card dark:bg-cardDark">
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
