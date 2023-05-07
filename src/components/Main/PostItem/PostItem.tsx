import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
    MdThumbUpOffAlt,
    MdThumbDownOffAlt,
    MdOutlineModeComment,
} from 'react-icons/md';
import { PostType } from '../../../types/postType';
import format from 'date-fns/format';
import { positiveReaction } from '../../../utilities/positiveReaction';
import useInfoCard from '../../../hooks/useInfoCard';
import useAuth from '../../../hooks/useAuth';
import { negativeReaction } from '../../../utilities/negativeReaction';
import { fetchPostContent } from '../../../utilities/fetchPostContent';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import CommentInput from './Comment/CommentInput/CommentInput';
import CommentList from './Comment/CommentList/CommentList';
import { convertImageToBase64 } from '../../../utilities/convertImageToBase64';

type PostItemProps = {
    postID: string;
};

export default React.memo(function PostItem({ postID }: PostItemProps) {
    const { setInfo } = useInfoCard();
    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [postDetails, setPostDetails] = useState<PostType | null>(null);
    const [showComments, setShowComments] = useState<boolean>(false);

    const { timestamp, text, comments, reactions } = postDetails || {};
    const { firstName, lastName } = postDetails?.owner || {};
    const displayName = `${firstName} ${lastName} `;

    const userPic = convertImageToBase64(postDetails?.owner?.userpic);
    const postImage = convertImageToBase64(postDetails?.image);
    const time = timestamp ? format(new Date(timestamp), 'MMMM dd, yyyy') : '';

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
        setShowComments(!showComments);
    };

    useEffect(() => {
        getPostDetails(postID);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <img
                        className="w-8 h-8 object-cover rounded-full shadow-lg"
                        src={`data:image/png;base64,${userPic}`}
                        alt="User avatar"
                    />
                    <div className="font-bold">{displayName}</div>
                </div>

                <div className="italic">{time}</div>
            </div>

            <div className="text-justify">
                {text && (
                    <ReactMarkdown className="prose break-words p-4">
                        {text}
                    </ReactMarkdown>
                )}
            </div>
            {postImage && (
                <div className="flex justify-center">
                    <img
                        className="w-full h-auto object-cover shadow-lg"
                        src={`data:image/png;base64,${postImage}`}
                        alt="User uploaded image"
                    />
                </div>
            )}
            <div className="flex justify-around items-center ">
                <button
                    onClick={handleShowCommentsClick}
                    className="flex justify-center items-center gap-1"
                >
                    <MdOutlineModeComment /> {comments?.length}
                </button>
                <button
                    onClick={handlePositiveReactionClick}
                    className="flex justify-center items-center gap-1"
                >
                    <MdThumbUpOffAlt /> {reactions?.positive}
                </button>
                <button
                    onClick={handleNegativeReactionClick}
                    className="flex justify-center items-center gap-1"
                >
                    <MdThumbDownOffAlt /> {reactions?.negative}
                </button>
            </div>
            {showComments && (
                <div className="flex flex-col gap-4">
                    <CommentList comments={postDetails?.comments} />
                    <CommentInput
                        parentPostID={postID}
                        getPostDetails={getPostDetails}
                    />
                </div>
            )}
        </div>
    );
});
