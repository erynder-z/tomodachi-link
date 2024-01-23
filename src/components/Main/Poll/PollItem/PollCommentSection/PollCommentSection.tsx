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

/**
 * React component for rendering the comment section of a poll, including comment button, list, and input.
 *
 * @component
 * @param {PollCommentSectionProps} props - The component props.
 * @param {boolean} props.areCommentsAllowed - Indicates whether comments are allowed for the poll.
 * @param {CommentType[]|undefined} props.comments - The array of comments or undefined if not available.
 * @param {string} props.parentItemID - The ID of the parent item (e.g., poll).
 * @param {Function} props.handleRefreshPollData - Callback function to refresh poll data.
 * @returns {JSX.Element} - Rendered PollCommentSection component.
 */
export default function PollCommentSection({
    areCommentsAllowed,
    comments,
    parentItemID,
    handleRefreshPollData,
}: PollCommentSectionProps): JSX.Element {
    const [shouldCommentsShow, setShouldCommentsShow] =
        useState<boolean>(false);
    const isCommentSectionMounted = shouldCommentsShow;
    const showCommentSection = useDelayUnmount(
        isCommentSectionMounted,
        UNMOUNT_TIMEOUT
    );
    const numberOfComments = comments?.length;

    /**
     * Handles the click event to show/hide the comment section.
     * @returns {void}
     */
    const handleShowCommentsClick = (): void => {
        setShouldCommentsShow(!shouldCommentsShow);
    };

    /**
     * Content to display when comments are not allowed for the poll.
     * @type {JSX.Element}
     */
    const NoCommentsAllowedContent: JSX.Element = (
        <div className="flex items-center gap-2">
            <MdOutlineCommentsDisabled size="1.5em" />
            <span className="text-xs">Comments disabled</span>
        </div>
    );

    /**
     * Content to display when comments are allowed for the poll.
     * @type {JSX.Element}
     */
    const CommentsAllowedContent: JSX.Element = (
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

    /**
     * Render based on whether comments are allowed or not
     *
     * @type {JSX.Element}
     */
    return areCommentsAllowed
        ? CommentsAllowedContent
        : NoCommentsAllowedContent;
}
