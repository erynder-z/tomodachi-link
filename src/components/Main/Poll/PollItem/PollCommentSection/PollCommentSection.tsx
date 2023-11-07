import { useState } from 'react';
import { CommentType } from '../../../../../types/commentTypes';
import PollCommentButton from './PollCommentButton/PollCommentButton';
import { MdOutlineCommentsDisabled } from 'react-icons/md';
import CommentList from '../../../Comments/CommentList/CommentList';
import CommentInput from '../../../Comments/CommentInput/CommentInput';
import useDelayUnmount from '../../../../../hooks/useDelayUnmount';

type PollCommentSectionProps = {
    areCommentsAllowed: boolean;
    comments: CommentType[] | undefined;
    parentItemID: string;
    handleRefreshPollData: () => Promise<void>;
};

const UNMOUNT_TIMEOUT = 150;

export default function PollCommentSection({
    areCommentsAllowed,
    comments,
    parentItemID,
    handleRefreshPollData,
}: PollCommentSectionProps) {
    const [shouldCommentsShow, setShouldCommentsShow] =
        useState<boolean>(false);
    const isCommentSectionMounted = shouldCommentsShow;
    const showCommentSection = useDelayUnmount(
        isCommentSectionMounted,
        UNMOUNT_TIMEOUT
    );
    const numberOfComments = comments?.length;

    const handleShowCommentsClick = () => {
        setShouldCommentsShow(!shouldCommentsShow);
    };

    const NoCommentsAllowedContent = (
        <div className="flex items-center gap-2">
            <MdOutlineCommentsDisabled size="1.5em" />
            <span className="text-xs">Comments disabled</span>
        </div>
    );

    const CommentsAllowedContent = (
        <div className="flex flex-col w-full">
            <PollCommentButton
                handleShowCommentsClick={handleShowCommentsClick}
                numberOfComments={numberOfComments}
            />
            {showCommentSection && (
                <div
                    className={`${
                        shouldCommentsShow
                            ? 'animate-popInAnimation'
                            : 'animate-popOutAnimation'
                    }  flex flex-col`}
                >
                    <CommentList
                        comments={comments}
                        onToggleListButtonClick={handleShowCommentsClick}
                    />
                    <div className="p-4">
                        <CommentInput
                            parentItemID={parentItemID}
                            handleRefreshPollData={handleRefreshPollData}
                        />
                    </div>
                </div>
            )}
        </div>
    );

    return areCommentsAllowed
        ? CommentsAllowedContent
        : NoCommentsAllowedContent;
}
