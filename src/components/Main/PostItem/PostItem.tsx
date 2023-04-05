import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
    MdThumbUpOffAlt,
    MdThumbDownOffAlt,
    MdOutlineModeComment,
} from 'react-icons/md';
import { PostType } from '../../../types/postType';
import format from 'date-fns/format';
import { positiveReaction } from '../../../utilities/positiveReaction';
import useInfoOverlay from '../../../hooks/useInfoOverlay';
import useAuth from '../../../hooks/useAuth';
import { negativeReaction } from '../../../utilities/negativeReaction';

type Props = {
    postContent: PostType;
};

export default function PostItem({ postContent }: Props) {
    const { setInfo } = useInfoOverlay();
    const { token } = useAuth();
    const {
        _id,
        owner: { username, userpic },
        timestamp,
        text,
        comments,
        reactions,
    } = postContent;
    const base64String = userpic
        ? btoa(String.fromCharCode(...new Uint8Array(userpic.data.data)))
        : '';

    const time = new Date(timestamp);
    const formattedDate = format(time, 'MMMM dd, yyyy');

    const handlePositiveReactionClick = async () => {
        if (token) {
            await positiveReaction(token, setInfo, _id);
        }
    };

    const handleNegativeReactionClick = async () => {
        if (token) {
            await negativeReaction(token, setInfo, _id);
        }
    };

    return (
        <div className="flex flex-col gap-4 md:p-4 lg:w-full lg:justify-around lg:rounded-md lg:shadow-lg bg-card">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <img
                        className="w-8 h-8 object-cover rounded-full shadow-lg"
                        src={`data:image/png;base64,${base64String}`}
                        alt="User avatar"
                    />
                    <div className="font-bold"> {username}</div>
                </div>

                <div className="italic">{formattedDate}</div>
            </div>

            <div className="text-justify">
                <ReactMarkdown className="prose break-words p-4">
                    {text}
                </ReactMarkdown>
            </div>
            <div className="flex justify-around items-center ">
                <button className="flex justify-center items-center gap-1">
                    <MdOutlineModeComment /> {comments.length}
                </button>
                <button
                    onClick={handlePositiveReactionClick}
                    className="flex justify-center items-center gap-1"
                >
                    <MdThumbUpOffAlt /> {reactions.positive}
                </button>
                <button
                    onClick={handleNegativeReactionClick}
                    className="flex justify-center items-center gap-1"
                >
                    <MdThumbDownOffAlt /> {reactions.negative}
                </button>
            </div>
        </div>
    );
}
