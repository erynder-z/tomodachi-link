import { CommentType } from '../../../../types/commentType';
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

    return (
        <div className="flex flex-col gap-4">
            <ToggleListButton
                onToggleListButtonClick={onToggleListButtonClick}
                showMenu={true}
            />
            {commentItems.length > 0 ? (
                commentItems
            ) : (
                <span className="text-xs font-bold">No comments yet!</span>
            )}
        </div>
    );
}
