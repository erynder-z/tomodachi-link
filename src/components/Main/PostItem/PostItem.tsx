import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
    MdThumbUpOffAlt,
    MdThumbDownOffAlt,
    MdOutlineModeComment,
    MdMoreVert,
    MdEdit,
    MdOutlineDeleteForever,
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
import { EmbeddedYoutubeVideo } from './EmbeddedYoutubeVideo/EmbeddedYoutubeVideo';
import { ImageType } from '../../../types/imageType';

type PostItemProps = {
    postID: string;
    setClickedImage: React.Dispatch<React.SetStateAction<ImageType | null>>;
    setClickedGif: React.Dispatch<React.SetStateAction<string | null>>;
};

export default React.memo(function PostItem({
    postID,
    setClickedImage,
    setClickedGif,
}: PostItemProps) {
    const { setInfo } = useInfoCard();
    const { token, authUser } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [postDetails, setPostDetails] = useState<PostType | null>(null);
    const [showComments, setShowComments] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { timestamp, text, comments, reactions, gifUrl } = postDetails || {};
    const { _id, firstName, lastName } = postDetails?.owner || {};

    const isPostFromCurrentUser = authUser?.user._id === _id;
    const displayName = `${firstName} ${lastName} `;
    const userPic = convertImageToBase64(postDetails?.owner?.userpic);
    const postImage = convertImageToBase64(postDetails?.image);
    const postVideoID = postDetails?.embeddedVideoID;
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

    const handleImageClick = (image: ImageType) => {
        setClickedImage(image);
    };

    const handleGifClick = (gifURL: string) => {
        setClickedGif(gifURL);
    };

    const handleShowPostMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                {isPostFromCurrentUser && (
                    <div className="relative inline-block">
                        <button onClick={handleShowPostMenu}>
                            <MdMoreVert size="1.25em" />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-8 right-0 z-10 bg-popupMenu border shadow-lg">
                                <ul className="flex flex-col gap-4 ">
                                    <li>
                                        <button className="flex justify-around items-center gap-2 w-full p-4 hover:bg-red-300">
                                            <MdEdit size="1.25em" />
                                        </button>
                                    </li>
                                    <li>
                                        <button className="flex justify-center items-center gap-2 w-full p-4 hover:bg-red-300">
                                            <MdOutlineDeleteForever size="1.25em" />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
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
                        onClick={() => handleImageClick(postDetails?.image)}
                        className="w-fit h-auto object-cover shadow-lg cursor-pointer"
                        src={`data:image/png;base64,${postImage}`}
                        alt="User uploaded image"
                    />
                </div>
            )}
            {gifUrl && (
                <div className="flex justify-center">
                    <img
                        onClick={() => handleGifClick(gifUrl)}
                        className="w-fit h-auto object-cover shadow-lg cursor-pointer"
                        src={gifUrl}
                        alt="User uploaded gif"
                    />
                </div>
            )}
            {postVideoID && (
                <div className="flex flex-col text-xs h-auto w-full">
                    <EmbeddedYoutubeVideo videoID={postVideoID} />
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
