import { useState } from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import resizeFile from '../../../../utilities/ImageResizer';
import EmbedYoutubeVideoSelector from './EmbedYoutubeVideoSelector/EmbedYoutubeVideoSelector';
import GifSelector from './GifSelector/GifSelector';
import { TenorImage } from 'gif-picker-react';
import PostInputTextarea from './PostInputTextarea/PostInputTextarea';
import EmbeddedYoutubeVideoArea from './EmbeddedYoutubeVideoArea/EmbeddedYoutubeVideoArea';
import SelectedImageArea from './SelectedImageArea/SelectedImageArea';
import GifArea from './GifArea/GifArea';
import ButtonArea from './ButtonArea/ButtonArea';
import EmojiSelector from './EmojiSelector/EmojiPicker';
import { ViewMode } from '../../../../types/miscTypes';
import { motion, AnimatePresence } from 'framer-motion';
import { InfoType } from '../../../../types/infoTypes';

type NewPostInputProps = {
    handleRefreshPosts?: () => void;
    handleRefreshPics?: () => void;
};

export default function NewPostInput({
    handleRefreshPosts,
    handleRefreshPics,
}: NewPostInputProps) {
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
    const [gif, setGif] = useState<TenorImage | undefined>(undefined);
    const [hasImage, setHasImage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    };

    const submitFormData = async (formData: FormData) => {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${SERVER_URL}/api/v1/post`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            const successInfo = {
                typeOfInfo: 'good',
                message: 'Post created successfully!',
                icon: '👍',
            };
            setInfo(successInfo as InfoType);
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
            const failedInfo = {
                typeOfInfo: 'bad',
                message: message,
                icon: '👻',
            };

            setInfo(failedInfo as InfoType);

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

                await submitFormData(formData);
            } catch (error) {
                const ERROR_INFO = {
                    typeOfInfo: 'bad',
                    message: 'An error occurred',
                    icon: '👻',
                };
                setInfo(ERROR_INFO as InfoType);
            }

            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        handleFormSubmit(event);
    };

    const FormContent = (
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

    const EmojiSelectorModal = (
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

    const GifSelectorModal = (
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

    const YoutubeSelectorModal = (
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

    return (
        <div className="font-roboto flex gap-4 p-2 md:p-4 lg:w-full lg:flex-row lg:justify-around rounded lg:shadow-lg bg-card dark:bg-cardDark">
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
