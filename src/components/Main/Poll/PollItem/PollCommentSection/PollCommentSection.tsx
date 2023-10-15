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

export default function PollCommentSection({
    areCommentsAllowed,
    comments,
    parentItemID,
    handleRefreshPollData,
}: PollCommentSectionProps) {
    const [shouldCommentsShow, setShouldCommentsShow] =
        useState<boolean>(false);
    const isCommentSectionMounted = shouldCommentsShow;
    const showCommentSection = useDelayUnmount(isCommentSectionMounted, 150);
    const numberOfComments = comments?.length;

    const handleShowCommentsClick = () => {
        setShouldCommentsShow(!shouldCommentsShow);
    };

    const NoCommentsAllowedContent = <MdOutlineCommentsDisabled size="1.5em" />;

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
                    }  flex flex-col gap-4`}
                >
                    <CommentList
                        comments={comments}
                        onToggleListButtonClick={handleShowCommentsClick}
                    />
                    <div className="px-10">
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
