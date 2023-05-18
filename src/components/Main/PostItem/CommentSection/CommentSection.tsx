import React from 'react';
import { CommentType } from '../../../../types/commentType';
import CommentList from './CommentList/CommentList';
import CommentInput from './CommentInput/CommentInput';

type CommentSectionProps = {
    comments: CommentType[] | undefined;
    parentPostID: string;
    getPostDetails: (postID: string) => Promise<void>;
};

export default function CommentSection({
    comments,
    parentPostID,
    getPostDetails,
}: CommentSectionProps) {
    return (
        <div className="flex flex-col gap-4">
            <CommentList comments={comments} />
            <CommentInput
                parentPostID={parentPostID}
                getPostDetails={getPostDetails}
            />
        </div>
    );
}
