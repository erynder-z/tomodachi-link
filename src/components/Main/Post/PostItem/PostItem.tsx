import React, { useEffect, useRef, useState } from 'react';
import { PostType } from '../../../../types/postTypes';
import format from 'date-fns/format';
import useInfoCard from '../../../../hooks/useInfoCard';
import useAuth from '../../../../hooks/useAuth';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { convertDatabaseImageToBase64 } from '../../../../utilities/convertDatabaseImageToBase64';
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
    const userPic = convertDatabaseImageToBase64(postDetails?.owner?.userpic);
    const postImage = convertDatabaseImageToBase64(postDetails?.image);
    const postVideoID = postDetails?.embeddedVideoID;
    const postOwnerID = postDetails?.owner._id;
    const date = createdAt ? format(new Date(createdAt), 'MMMM dd, yyyy') : '';
    const isPostFromCurrentUser = authUser?.user._id === postOwnerID;
    const hasImage = !!postImage;

    const shouldGetPostDetails = useRef(true);

    const getPostDetails = async (postID: string) => {
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

    const handlePositiveReactionClick = async () => {
        if (token) {
            await handlePostReaction(token, setInfo, postID, 'positive');
            getPostDetails(postID);
        }
    };

    const handleNegativeReactionClick = async () => {
        if (token) {
            await handlePostReaction(token, setInfo, postID, 'negative');
            getPostDetails(postID);
        }
    };

    const handleShowCommentsClick = () =>
        setShouldCommentSectionShow(!shouldCommentSectionShow);

    const handleImageClick = (image: ImageType) => setClickedImage(image);

    const handleGifClick = (gifURL: string) => setClickedGif(gifURL);

    useEffect(() => {
        if (shouldGetPostDetails.current) getPostDetails(postID);

        return () => {
            shouldGetPostDetails.current = false;
        };
    }, []);

    const LoadingContent = (
        <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
            <LoadingSpinner />
        </div>
    );

    const PostItemContent = (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-roboto flex flex-col gap-4 p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark rounded lg:rounded-lg"
        >
            {postDetails ? (
                <>
                    <div className="flex justify-between">
                        <PostUserInfoSection
                            postOwnerID={postDetails?.owner._id}
                            userPic={userPic}
                            displayName={displayName}
                        />
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

    return loading ? LoadingContent : PostItemContent;
});
