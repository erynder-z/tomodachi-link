import { CommentType } from '../../../../../types/commentTypes';
import CommentList from '../../../Comments/CommentList/CommentList';
import CommentInput from '../../../Comments/CommentInput/CommentInput';

type PostCommentSectionProps = {
    comments: CommentType[] | undefined;
    parentItemID: string;
    getPostDetails: (postID: string) => Promise<void>;
    handleShowCommentsClick: () => void;
    shouldCommentSectionShow: boolean;
};

/**
 * Represents a component for displaying the comment section of a post.
 *
 * @component
 * @param {PostCommentSectionProps} props - The component properties.
 * @returns {JSX.Element} The rendered PostCommentSection component.
 */
export default function PostCommentSection({
    comments,
    parentItemID,
    getPostDetails,
    handleShowCommentsClick,
    shouldCommentSectionShow,
}: PostCommentSectionProps): JSX.Element {
    /**
     * Handles the click event for toggling the comment list visibility.
     *
     * @function
     */
    const onToggleListButtonClick = () => handleShowCommentsClick();

    /**
     * The rendered PostCommentSection component.
     *
     * @type {JSX.Element}
     */
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
