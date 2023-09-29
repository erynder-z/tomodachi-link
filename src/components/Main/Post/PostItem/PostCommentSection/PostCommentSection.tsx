import React from 'react';
import { CommentType } from '../../../../../types/commentType';
import CommentList from '../../../Comments/CommentList/CommentList';
import CommentInput from '../../../Comments/CommentInput/CommentInput';

type PostCommentSectionProps = {
    comments: CommentType[] | undefined;
    parentItemID: string;
    getPostDetails: (postID: string) => Promise<void>;
    handleShowCommentsClick: () => void;
    shouldCommentSectionShow: boolean;
};

export default function PostCommentSection({
    comments,
    parentItemID,
    getPostDetails,
    handleShowCommentsClick,
    shouldCommentSectionShow,
}: PostCommentSectionProps) {
    const onToggleListButtonClick = () => handleShowCommentsClick();

    return (
        <div
            className={`${
                shouldCommentSectionShow
                    ? 'animate-popInAnimation'
                    : 'animate-popOutAnimation'
            } flex flex-col gap-4`}
        >
            <CommentList
                comments={comments}
                onToggleListButtonClick={onToggleListButtonClick}
            />
            <CommentInput
                parentItemID={parentItemID}
                getPostDetails={getPostDetails}
            />
        </div>
    );
}
