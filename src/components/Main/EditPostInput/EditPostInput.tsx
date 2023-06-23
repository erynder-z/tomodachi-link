import React, { useState } from 'react';
import { FaTimes, FaExclamationTriangle, FaRegSmile } from 'react-icons/fa';
import PostInputTextarea from '../NewPostInput/PostInputTextarea/PostInputTextarea';
import SelectedImageArea from '../NewPostInput/SelectedImageArea/SelectedImageArea';
import ButtonArea from '../NewPostInput/ButtonArea/ButtonArea';
import GifSelector from '../NewPostInput/GifSelector/GifSelector';
import EmbedYoutubeVideoSelector from '../NewPostInput/EmbedYoutubeVideoSelector/EmbedYoutubeVideoSelector';
import { TenorImage } from 'gif-picker-react';
import GifArea from '../NewPostInput/GifArea/GifArea';
import useCurrentUserData from '../../../hooks/useCurrentUserData';
import { PostType } from '../../../types/postType';
import EmojiSelector from '../NewPostInput/EmojiSelector/EmojiPicker';
import PostEditImageSection from './PostEditImageSection/PostEditImageSection';
import { convertDatabaseImageToBase64 } from '../../../utilities/convertDatabaseImageToBase64';
import PostEditGifSection from './PostEditGifSection/PostEditGifSection';
import PostEditEmbeddedYoutubeVideo from './PostEditEmbeddedYoutubeVideo/PostEditEmbeddedYoutubeVideo';
import { ImageType } from '../../../types/imageType';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import resizeFile from '../../../utilities/ImageResizer';
import EmbeddedYoutubeVideoArea from '../NewPostInput/EmbeddedYoutubeVideoArea/EmbeddedYoutubeVideoArea';

type EditPostInputProps = {
    postDetails: PostType | null;
    shouldPostEditShow: boolean;
    setShouldPostEditShow: React.Dispatch<React.SetStateAction<boolean>>;
    onPostChange?: () => void;
};

export default function EditPostInput({
    postDetails,
    shouldPostEditShow,
    setShouldPostEditShow,
    onPostChange,
}: EditPostInputProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [postText, setPostText] = useState<string>(postDetails?.text || '');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showYoutubeEmbed, setShowYoutubeEmbed] = useState<boolean>(false);
    const [showGifSelector, setShowGifSelector] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<File | undefined>(
        undefined
    );
    const [youtubeID, setYoutubeID] = useState<string | undefined>(undefined);
    const [gif, setGif] = useState<TenorImage | undefined>(undefined);
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

    const { username } = currentUserData || {};

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
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

            const serverURL = import.meta.env.VITE_SERVER_URL;
            const id = postDetails?._id;
            const response = await fetch(
                `${serverURL}/api/v1/post/${id}/edit`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
            if (response.ok) {
                setInfo({
                    typeOfInfo: 'good',
                    message: 'Post updated successfully!',
                    icon: <FaRegSmile />,
                });
                setPostText('');
                setSelectedImage(undefined);
                setYoutubeID(undefined);
                setGif(undefined);
                if (onPostChange) {
                    onPostChange();
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
        }
    };

    const handleComponentClose = () => {
        setShouldPostEditShow(false);
    };

    const handleNewPostChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setPostText(event.target.value);
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
        }
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

    return (
        <div
            className={`${
                shouldPostEditShow
                    ? 'animate-inAnimation'
                    : 'animate-outAnimation'
            } fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80 px-4 py-8`}
        >
            <div className="relative flex gap-4 px-4 py-8 w-full lg:w-2/6 lg:flex-row lg:justify-around lg:shadow-lg bg-canvas">
                <button
                    onClick={handleComponentClose}
                    className="absolute -top-8 -right-0 md:-right-10 bg-card hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
                >
                    <FaTimes size="1.5em" />
                </button>
                <form
                    action=""
                    method="PATCH"
                    onSubmit={handleSubmit}
                    className="flex w-full divide-gray-200"
                >
                    <div className="relative w-full text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <PostInputTextarea
                            postText={postText}
                            handleNewPostChange={handleNewPostChange}
                            username={username}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {dbImage && (
                                <div className="bg-white py-2 md:py-4">
                                    <PostEditImageSection
                                        handleImageDelete={handleImageDelete}
                                        convertedImage={convertDatabaseImageToBase64(
                                            dbImage
                                        )}
                                    />
                                </div>
                            )}
                            {dbGif && (
                                <div className="bg-white py-2 md:py-4">
                                    <PostEditGifSection
                                        handleGifDelete={handleGifDelete}
                                        dbGif={dbGif}
                                    />
                                </div>
                            )}
                            {dbEmbeddedVideoID && (
                                <div className="bg-white py-2 md:py-4">
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
                            setShowYoutubeEmbed={setShowYoutubeEmbed}
                            showYoutubeEmbed={showYoutubeEmbed}
                            setShowGifSelector={setShowGifSelector}
                            showGifSelector={showGifSelector}
                            setShowEmojiPicker={setShowEmojiPicker}
                            showEmojiPicker={showEmojiPicker}
                            postText={postText}
                        />
                    </div>
                </form>
                {showEmojiPicker && (
                    <EmojiSelector
                        setText={setPostText}
                        setShowEmojiPicker={setShowEmojiPicker}
                    />
                )}

                {showGifSelector && (
                    <GifSelector
                        setShowGifSelector={setShowGifSelector}
                        setGif={setGif}
                    />
                )}

                {showYoutubeEmbed && (
                    <EmbedYoutubeVideoSelector
                        setShowYoutubeEmbed={setShowYoutubeEmbed}
                        setYoutubeID={setYoutubeID}
                    />
                )}
            </div>
        </div>
    );
}
