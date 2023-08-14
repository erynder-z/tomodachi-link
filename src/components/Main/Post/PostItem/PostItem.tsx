import React, { useEffect, useRef, useState } from 'react';
import { PostType } from '../../../../types/postType';
import format from 'date-fns/format';
import { positiveReaction } from '../../../../utilities/positiveReaction';
import useInfoCard from '../../../../hooks/useInfoCard';
import useAuth from '../../../../hooks/useAuth';
import { negativeReaction } from '../../../../utilities/negativeReaction';
import { fetchPostContent } from '../../../../utilities/fetchPostContent';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { convertDatabaseImageToBase64 } from '../../../../utilities/convertDatabaseImageToBase64';
import { ImageType } from '../../../../types/imageType';
import PostUserInfoSection from './PostUserInfoSection/PostUserInfoSection';
import DateSection from './DateSection/DateSection';
import PostOptionsSection from './PostOptionsSection/PostOptionsSection';
import PostTextSection from './PostTextSection/PostTextSection';
import PostImageSection from './PostImageSection/PostImageSection';
import PostGifSection from './PostGifSection/PostGifSection';
import PostEmbeddedYoutubeVideoSection from './PostEmbeddedYoutubeVideoSection/PostEmbeddedYoutubeVideoSection';
import PostReactionSection from './PostReactionSection/PostReactionSection';
import CommentSection from './CommentSection/CommentSection';
import useDelayUnmount from '../../../../hooks/useDelayUnmount';

type PostItemProps = {
    postID: string;
    setClickedImage: React.Dispatch<React.SetStateAction<ImageType | null>>;
    setClickedGif: React.Dispatch<React.SetStateAction<string | null>>;
    onPostChange?: () => void;
};

export default React.memo(function PostItem({
    postID,
    setClickedImage,
    setClickedGif,
    onPostChange,
}: PostItemProps) {
    const { setInfo } = useInfoCard();
    const { token, authUser } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [postDetails, setPostDetails] = useState<PostType | null>(null);
    const [shouldCommentSectionShow, setShouldCommentSectionShow] =
        useState<boolean>(false);

    const { timestamp, text, comments, reactions, gifUrl } = postDetails || {};
    const { _id, firstName, lastName } = postDetails?.owner || {};

    const isCommentSectionMounted = shouldCommentSectionShow;
    const showCommentSection = useDelayUnmount(isCommentSectionMounted, 150);

    const isPostFromCurrentUser = authUser?.user._id === _id;
    const displayName = `${firstName} ${lastName} `;
    const userPic = convertDatabaseImageToBase64(postDetails?.owner?.userpic);
    const postImage = convertDatabaseImageToBase64(postDetails?.image);
    const postVideoID = postDetails?.embeddedVideoID;
    const date = timestamp ? format(new Date(timestamp), 'MMMM dd, yyyy') : '';

    const shouldGetPostDetails = useRef(true);

    const getPostDetails = async (postID: string) => {
        if (token) {
            const response = await fetchPostContent(token, postID, setInfo);

            setPostDetails(response);
            setLoading(false);
        }
    };

    const handlePositiveReactionClick = async () => {
        if (token) {
            await positiveReaction(token, setInfo, postID);
            getPostDetails(postID);
        }
    };

    const handleNegativeReactionClick = async () => {
        if (token) {
            await negativeReaction(token, setInfo, postID);
            getPostDetails(postID);
        }
    };

    const handleShowCommentsClick = () => {
        setShouldCommentSectionShow(!shouldCommentSectionShow);
    };

    const handleImageClick = (image: ImageType) => {
        setClickedImage(image);
    };

    const handleGifClick = (gifURL: string) => {
        setClickedGif(gifURL);
    };

    useEffect(() => {
        if (shouldGetPostDetails.current === true) {
            getPostDetails(postID);
        }
        return () => {
            shouldGetPostDetails.current = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-canvas dark:bg-canvasDark">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="font-roboto animate-popInAnimation flex flex-col gap-4 md:p-4 lg:w-full lg:justify-around shadow-lg bg-canvas dark:bg-canvasDark">
            <div className="flex justify-between">
                <PostUserInfoSection
                    userPic={userPic}
                    displayName={displayName}
                />
                <DateSection date={date} />
                {isPostFromCurrentUser && (
                    <PostOptionsSection
                        postDetails={postDetails}
                        onPostChange={onPostChange}
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
                <PostEmbeddedYoutubeVideoSection postVideoID={postVideoID} />
            )}
            <PostReactionSection
                handleShowCommentsClick={handleShowCommentsClick}
                numberOfComments={comments?.length}
                handlePositiveReactionClick={handlePositiveReactionClick}
                numberOfPositiveReactions={reactions?.positive}
                handleNegativeReactionClick={handleNegativeReactionClick}
                numberOfNegativeReactions={reactions?.negative}
            />
            {showCommentSection && (
                <CommentSection
                    comments={postDetails?.comments}
                    parentPostID={postID}
                    getPostDetails={getPostDetails}
                    handleShowCommentsClick={handleShowCommentsClick}
                    shouldCommentSectionShow={shouldCommentSectionShow}
                />
            )}
        </div>
    );
});
