import { useState } from 'react';
import { handleFetchErrors } from '../../../../../utilities/handleFetchErrors';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import ConfirmationOverlay from '../../../../UiElements/Overlays/ConfirmationOverlay/ConfirmationOverlay';
import EditPostInput from '../../EditPostInput/EditPostInput';
import { PostType } from '../../../../../types/postTypes';
import ToggleListButton from '../../../../UiElements/ToggleListButton/ToggleListButton';
import useDelayUnmount from '../../../../../hooks/useDelayUnmount';
import PostMenu from './PostMenu/PostMenu';
import { displaySuccessInfo } from '../../../../UiElements/UserNotification/displaySuccessInfo';
import { displayErrorInfo } from '../../../../UiElements/UserNotification/displayErrorInfo';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../../hooks/useTheme';

type PostOptionsSectionProps = {
    postDetails: PostType | null;
    hasImage: boolean;
    onPostChange?: () => void;
    setShouldRefreshPictureList?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PostOptionsSection({
    postDetails,
    hasImage,
    onPostChange,
    setShouldRefreshPictureList,
}: PostOptionsSectionProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { isMobileDevice } = useTheme();
    const [shouldMenuShow, setShouldMenuShow] = useState(false);
    const [shouldPostEditShow, setShouldPostEditShow] = useState(false);
    const [shouldConfirmDialogShow, setShouldConfirmDialogShow] =
        useState(false);
    const isMenuMounted = shouldMenuShow;
    const isPostEditMounted = shouldPostEditShow;
    const isConfirmDialogMounted = shouldConfirmDialogShow;
    const showMenu = useDelayUnmount(isMenuMounted, 150);
    const showPostEdit = useDelayUnmount(isPostEditMounted, 150);
    const showConfirmDialog = useDelayUnmount(isConfirmDialogMounted, 150);

    const handleDelete = async () => {
        try {
            const SERVER_URL = import.meta.env.VITE_SERVER_URL;
            const postID = postDetails?._id;

            const response = await fetch(
                `${SERVER_URL}/api/v1/post/${postID}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) handleFetchErrors(response, setInfo);

            displaySuccessInfo(setInfo, 'Post deleted!', '🗑️');
            if (setShouldRefreshPictureList && hasImage)
                setShouldRefreshPictureList(true);
            if (onPostChange) onPostChange();
        } catch (err: unknown) {
            displayErrorInfo(setInfo, 'Unable to delete post!', '👻');
        }
    };

    const handleShowPostMenu = () => setShouldMenuShow(!shouldMenuShow);

    const handleEditButtonClick = () => {
        setShouldPostEditShow(true);
        setShouldMenuShow(false);
    };

    const handleDeleteButtonClick = () => {
        setShouldConfirmDialogShow(true);
        setShouldMenuShow(false);
    };

    const ConfirmModal = (
        <ConfirmationOverlay
            shouldConfirmDialogShow={shouldConfirmDialogShow}
            setShouldConfirmDialogShow={setShouldConfirmDialogShow}
            onConfirm={() => {
                handleDelete();
            }}
            dialogInfo={{
                message: 'Do you really want to delete this post?',
                icon: '✋',
            }}
        />
    );

    const PostOptionsContent = (
        <div className="relative flex cursor-pointer">
            <div
                data-tooltip-id="post-options-tooltip"
                data-tooltip-content={`${
                    showMenu ? 'Hide options' : 'Show options'
                }`}
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
            >
                <ToggleListButton
                    onToggleListButtonClick={handleShowPostMenu}
                    showMenu={showMenu}
                />
            </div>
            {showMenu && (
                <PostMenu
                    handleEditButtonClick={handleEditButtonClick}
                    handleDeleteButtonClick={handleDeleteButtonClick}
                    shouldMenuShow={shouldMenuShow}
                />
            )}
            {showPostEdit && (
                <EditPostInput
                    postDetails={postDetails}
                    shouldPostEditShow={shouldPostEditShow}
                    setShouldPostEditShow={setShouldPostEditShow}
                    onPostChange={onPostChange}
                    setShouldRefreshPictureList={setShouldRefreshPictureList}
                />
            )}
            <Tooltip
                id="post-options-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </div>
    );

    return (
        <>
            {PostOptionsContent}
            {showConfirmDialog && ConfirmModal}
        </>
    );
}
