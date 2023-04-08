import React from 'react';
import { CommentType } from '../../../../../types/commentType';
import CommentItem from './CommentItem/CommentItem';

type Props = {
    comments?: CommentType[];
};

export default function CommentList({ comments = [] }: Props) {
    const commentItems = comments.map((comment) => (
        <CommentItem key={comment._id} commentDetails={comment} />
    ));

    return <div className="flex flex-col gap-4">{commentItems}</div>;
}
