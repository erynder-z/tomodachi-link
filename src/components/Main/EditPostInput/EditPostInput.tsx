import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PostInputTextarea from '../NewPostInput/PostInputTextarea/PostInputTextarea';
import EmbeddedYoutubeVideoArea from '../NewPostInput/EmbeddedYoutubeVideoArea/EmbeddedYoutubeVideoArea';
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
import { convertImageToBase64 } from '../../../utilities/convertImageToBase64';
import PostEditGifSection from './PostEditGifSection/PostEditGifSection';
import PostEditEmbeddedYoutubeVideo from './PostEditEmbeddedYoutubeVideo/PostEditEmbeddedYoutubeVideo';

type EditPostInputProps = {
    postDetails: PostType | null;
    setShowPostEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditPostInput({
    postDetails,
    setShowPostEdit,
}: EditPostInputProps) {
    const { currentUserData } = useCurrentUserData();
    const [postText, setPostText] = useState<string>(postDetails?.text || '');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showYoutubeEmbed, setShowYoutubeEmbed] = useState<boolean>(false);
    const [showGifSelector, setShowGifSelector] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [youtubeID, setYoutubeID] = useState<string | null>(
        postDetails?.embeddedVideoID || null
    );
    const [gif, setGif] = useState<TenorImage | null>(null);

    const { username } = currentUserData || {};
    const { gifUrl, embeddedVideoID } = postDetails || {};
    const postImage = convertImageToBase64(postDetails?.image);

    const handleComponentClose = () => {
        setShowPostEdit(false);
    };

    const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const handleSubmit = () => {
        // handle form submission
    };

    const handleNewPostChange = () => {
        // handle post text change
    };

    const handleImageSelect = () => {
        // handle image selection
    };

    const handleImageDelete = () => {
        //
    };

    const handleVideoDelete = () => {
        //
    };

    const handleGifDelete = () => {
        //
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80 px-4 py-8">
            <button
                onClick={handleComponentClose}
                className="absolute top-2 right-2 text-white"
            >
                <FaTimes />
            </button>
            <div
                onClick={handleCardClick}
                className="flex gap-4 px-4 py-8 w-full lg:w-2/6 lg:flex-row lg:justify-around lg:shadow-lg overflow-auto bg-card"
            >
                <form
                    action=""
                    method="POST"
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
                            {postImage && (
                                <div className="bg-white py-2 md:py-4">
                                    <PostEditImageSection
                                        handleImageDelete={handleImageDelete}
                                        convertedImage={postImage}
                                    />
                                </div>
                            )}
                            {gifUrl && (
                                <div className="bg-white py-2 md:py-4">
                                    <PostEditGifSection
                                        handleGifDelete={handleGifDelete}
                                        gifUrl={gifUrl}
                                    />
                                </div>
                            )}
                            {embeddedVideoID && (
                                <div className="bg-white py-2 md:py-4">
                                    <PostEditEmbeddedYoutubeVideo
                                        handleVideoDelete={handleVideoDelete}
                                        postVideoID={embeddedVideoID}
                                    />
                                </div>
                            )}
                        </div>

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
                        setPostText={setPostText}
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
