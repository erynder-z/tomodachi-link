import React, { useState } from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { FaExclamationTriangle, FaRegSmile } from 'react-icons/fa';
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
import { ViewMode } from '../../../../types/postInputSelectors';

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
    const { username } = currentUserData || {};

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
    ) => {
        setPostText(event.target.value);
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
            setHasImage(true);
        } else {
            setSelectedImage(undefined);
            setHasImage(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

                const serverURL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(`${serverURL}/api/v1/post`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    setInfo({
                        typeOfInfo: 'good',
                        message: 'Post created successfully!',
                        icon: <FaRegSmile />,
                    });
                    setPostText('');
                    setSelectedImage(undefined);
                    setYoutubeID(undefined);
                    setGif(undefined);
                    if (handleRefreshPosts) {
                        handleRefreshPosts();
                        if (handleRefreshPics && hasImage) {
                            handleRefreshPics();
                        }
                    }
                } else {
                    const data = await response.json();
                    const errorMessages = data.errors;
                    const message = errorMessages
                        .map((error: { msg: string }) => error.msg)
                        .join(', ');

                    setInfo({
                        typeOfInfo: 'bad',
                        message: message,
                        icon: <FaExclamationTriangle />,
                    });

                    throw new Error(
                        `Error: ${response.status} ${response.statusText}`
                    );
                }
            } catch (error) {
                setInfo({
                    typeOfInfo: 'bad',
                    message: 'An error occurred',
                    icon: <FaExclamationTriangle />,
                });
            }

            setIsSubmitting(false);
        }
    };

    return (
        <div className="font-roboto flex gap-4 md:p-4 lg:w-full lg:flex-row lg:justify-around rounded lg:shadow-lg bg-card dark:bg-cardDark">
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
                        username={username}
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

            {viewMode === ViewMode.EmojiPicker && (
                <EmojiSelector
                    setText={setPostText}
                    setShowEmojiPicker={() => setViewMode(ViewMode.None)}
                />
            )}

            {viewMode === ViewMode.GifSelector && (
                <GifSelector
                    setShowGifSelector={() => setViewMode(ViewMode.None)}
                    setGif={setGif}
                />
            )}

            {viewMode === ViewMode.YoutubeEmbed && (
                <EmbedYoutubeVideoSelector
                    setShowYoutubeEmbed={() => setViewMode(ViewMode.None)}
                    setYoutubeID={setYoutubeID}
                />
            )}
        </div>
    );
}
