import React from 'react';
import { CommentType } from '../../../../../types/commentType';
import CommentItem from './CommentItem/CommentItem';
import CollapseListButton from '../../../UiElements/CollapseListButton/CollapseListButton';

type CommentListProps = {
    comments?: CommentType[];
    onCollapseListButtonClick: () => void;
};

export default function CommentList({
    comments = [],
    onCollapseListButtonClick,
}: CommentListProps) {
    const commentItems = comments.map((comment) => (
        <CommentItem key={comment._id} commentDetails={comment} />
    ));

    return (
        <div className="flex flex-col gap-4">
            <CollapseListButton
                onCollapseListButtonClick={onCollapseListButtonClick}
            />
            {commentItems.length > 0 ? (
                commentItems
            ) : (
                <span className="text-xs font-bold">No comments yet!</span>
            )}
        </div>
    );
}
