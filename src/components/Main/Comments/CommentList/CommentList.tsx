import { CommentType } from '../../../../types/commentTypes';
import CommentItem from './CommentItem/CommentItem';
import ToggleListButton from '../../../UiElements/ToggleListButton/ToggleListButton';

type CommentListProps = {
    comments?: CommentType[];
    onToggleListButtonClick: () => void;
};

export default function CommentList({
    comments = [],
    onToggleListButtonClick,
}: CommentListProps) {
    const commentItems = comments.map((comment) => (
        <CommentItem key={comment._id} commentDetails={comment} />
    ));

    const hasComments = commentItems.length > 0;

    return (
        <div className="flex flex-col gap-4">
            <ToggleListButton
                onToggleListButtonClick={onToggleListButtonClick}
                showMenu={true}
            />
            {hasComments ? (
                commentItems
            ) : (
                <span className="text-xs font-bold">No comments yet!</span>
            )}
        </div>
    );
}
