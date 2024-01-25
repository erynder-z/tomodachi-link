import React, { useEffect, useRef, useState } from 'react';
import { PostType } from '../../../../types/postTypes';
import format from 'date-fns/format';
import useInfoCard from '../../../../hooks/useInfoCard';
import useAuth from '../../../../hooks/useAuth';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { ImageType } from '../../../../types/miscTypes';
import PostUserInfoSection from './PostUserInfoSection/PostUserInfoSection';
import DateSection from './DateSection/DateSection';
import PostOptionsSection from './PostOptionsSection/PostOptionsSection';
import PostTextSection from './PostTextSection/PostTextSection';
import PostImageSection from './PostImageSection/PostImageSection';
import PostGifSection from './PostGifSection/PostGifSection';
import PostEmbeddedYoutubeVideoSection from './PostEmbeddedYoutubeVideoSection/PostEmbeddedYoutubeVideoSection';
import PostReactionSection from './PostReactionSection/PostReactionSection';
import PostCommentSection from './PostCommentSection/PostCommentSection';
import useDelayUnmount from '../../../../hooks/useDelayUnmount';
import { motion } from 'framer-motion';
import { backendFetch } from '../../../../utilities/backendFetch';
import { handlePostReaction } from '../../../../utilities/handlePostReaction';

type PostItemProps = {
    postID: string;
    setClickedImage: React.Dispatch<React.SetStateAction<ImageType | null>>;
    setClickedGif: React.Dispatch<React.SetStateAction<string | null>>;
    onPostChange?: () => void;
    setShouldRefreshPictureList?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default React.memo(function PostItem({
    postID,
    setClickedImage,
    setClickedGif,
    onPostChange,
    setShouldRefreshPictureList,
}: PostItemProps) {
    const { setInfo } = useInfoCard();
    const { token, authUser } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [postDetails, setPostDetails] = useState<PostType | null>(null);
    const [shouldCommentSectionShow, setShouldCommentSectionShow] =
        useState<boolean>(false);

    const { createdAt, text, comments, reactions, gifUrl } = postDetails || {};
    const { firstName, lastName } = postDetails?.owner || {};

    const isCommentSectionMounted = shouldCommentSectionShow;
    const showCommentSection = useDelayUnmount(isCommentSectionMounted, 150);
    const displayName = `${firstName} ${lastName} `;
    const userPic = postDetails?.owner?.userpic?.data;
    const postImage = postDetails?.image?.data;
    const postVideoID = postDetails?.embeddedVideoID;
    const postOwnerID = postDetails?.owner._id;
    const date = createdAt ? format(new Date(createdAt), 'MMM dd, yyyy') : '';
    const isPostFromCurrentUser = authUser?.user._id === postOwnerID;
    const hasImage = !!postImage;

    const shouldGetPostDetails = useRef(true);

    /**
     * Fetches the details of the post from the server.
     *
     * @async
     * @function
     * @param {string} postID - The ID of the post.
     * @returns {Promise<void>} A promise that resolves when the post details are fetched.
     */
    const getPostDetails = async (postID: string): Promise<void> => {
        if (token) {
            const apiEndpointURL = `/api/v1/post/${postID}`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch posts!';
            const response = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                METHOD,
                ERROR_MESSAGE
            );

            setPostDetails(response?.retrievedPost);
            setLoading(false);
        }
    };

    /**
     * Handles the click event for the positive reaction button.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the positive reaction is handled.
     */
    const handlePositiveReactionClick = async (): Promise<void> => {
        if (token) {
            await handlePostReaction(token, setInfo, postID, 'positive');
            getPostDetails(postID);
        }
    };

    /**
     * Handles the click event for the negative reaction button.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the negative reaction is handled.
     */
    const handleNegativeReactionClick = async (): Promise<void> => {
        if (token) {
            await handlePostReaction(token, setInfo, postID, 'negative');
            getPostDetails(postID);
        }
    };

    /**
     * Handles the click event to toggle the comment section visibility.
     *
     * @function
     * @returns {void}
     */
    const handleShowCommentsClick = (): void =>
        setShouldCommentSectionShow(!shouldCommentSectionShow);

    /**
     * Handles the click event for the image.
     *
     * @function
     * @param {ImageType} image - The clicked image.
     * @returns {void}
     */
    const handleImageClick = (image: ImageType): void => setClickedImage(image);

    /**
     * Handles the click event for the GIF.
     *
     * @function
     * @param {string} gifURL - The URL of the clicked GIF.
     * @returns {void}
     */
    const handleGifClick = (gifURL: string): void => setClickedGif(gifURL);

    /**
     * Effect hook to fetch the post details on mount.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldGetPostDetails.current) getPostDetails(postID);

        return () => {
            shouldGetPostDetails.current = false;
        };
    }, []);

    /**
     * JSX Element representing the loading content.
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
            <LoadingSpinner />
        </div>
    );

    /**
     * JSX Element representing the content of the post item.
     * @type {JSX.Element}
     */
    const PostItemContent: JSX.Element = (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-roboto flex flex-col gap-4 p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark rounded lg:rounded-lg"
        >
            {postDetails ? (
                <>
                    <div className="flex justify-between gap-2">
                        <div className="w-2/3">
                            <PostUserInfoSection
                                postOwnerID={postDetails?.owner._id}
                                userPic={userPic}
                                displayName={displayName}
                            />
                        </div>
                        <div className="w-1/3 flex gap-2 justify-end">
                            <DateSection date={date} />
                            {isPostFromCurrentUser && (
                                <PostOptionsSection
                                    postDetails={postDetails}
                                    hasImage={hasImage}
                                    onPostChange={onPostChange}
                                    setShouldRefreshPictureList={
                                        setShouldRefreshPictureList
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <PostTextSection text={text} />
                    {postImage && (
                        <PostImageSection
                            handleImageClick={handleImageClick}
                            databaseImage={postDetails?.image}
                            convertedImage={postImage}
                        />
                    )}
                    {gifUrl && (
                        <PostGifSection
                            handleGifClick={handleGifClick}
                            gifUrl={gifUrl}
                        />
                    )}
                    {postVideoID && (
                        <PostEmbeddedYoutubeVideoSection
                            postVideoID={postVideoID}
                        />
                    )}
                    <PostReactionSection
                        handleShowCommentsClick={handleShowCommentsClick}
                        numberOfComments={comments?.length}
                        handlePositiveReactionClick={
                            handlePositiveReactionClick
                        }
                        numberOfPositiveReactions={reactions?.positive}
                        handleNegativeReactionClick={
                            handleNegativeReactionClick
                        }
                        numberOfNegativeReactions={reactions?.negative}
                    />
                    {showCommentSection && (
                        <PostCommentSection
                            comments={postDetails?.comments}
                            parentItemID={postID}
                            getPostDetails={getPostDetails}
                            handleShowCommentsClick={handleShowCommentsClick}
                            shouldCommentSectionShow={shouldCommentSectionShow}
                        />
                    )}
                </>
            ) : (
                <div className="text-center">Could not load post</div>
            )}
        </motion.div>
    );

    /**
     * Render the content based on the loading state.
     *
     * @type {JSX.Element}
     */
    return loading ? LoadingContent : PostItemContent;
});
