import { CommentType } from '../../../../types/commentTypes';
import CommentItem from './CommentItem/CommentItem';
import ToggleListButton from '../../../UiElements/ToggleListButton/ToggleListButton';

type CommentListProps = {
    comments?: CommentType[];
    onToggleListButtonClick: () => void;
};

/**
 * CommentList component to display a list of comments.
 *
 * @component
 * @param {CommentListProps} props - The props object.
 * @param {CommentType[]} [props.comments=[]] - An array of comment objects.
 * @param {Function} props.onToggleListButtonClick - A function to handle the toggle list button click.
 * @returns {JSX.Element} The rendered CommentList component.
 */
export default function CommentList({
    comments = [],
    onToggleListButtonClick,
}: CommentListProps): JSX.Element {
    const commentItems = comments.map((comment) => (
        <CommentItem key={comment._id} commentDetails={comment} />
    ));

    const hasComments = commentItems.length > 0;

    /**
     * The rendered content of the CommentList component.
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col gap-4">
            <div className="mr-auto">
                <ToggleListButton
                    onToggleListButtonClick={onToggleListButtonClick}
                    showMenu={true}
                />
            </div>
            {hasComments ? (
                commentItems
            ) : (
                <span className="text-xs font-bold">No comments yet!</span>
            )}
        </div>
    );
}
