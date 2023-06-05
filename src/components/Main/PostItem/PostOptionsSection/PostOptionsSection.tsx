import React, { useState } from 'react';
import { FaRegSmile, FaExclamationTriangle } from 'react-icons/fa';
import { handleFetchErrors } from '../../../../utilities/handleFetchErrors';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import ConfirmationOverlay from '../../../ConfirmationOverlay/ConfirmationOverlay';
import { TbQuestionCircle } from 'react-icons/tb';
import EditPostInput from '../../EditPostInput/EditPostInput';
import { PostType } from '../../../../types/postType';
import ToggleListButton from '../../UiElements/ToggleListButton/ToggleListButton';
import useDelayUnmount from '../../../../hooks/useDelayUnmount';
import PostMenu from './PostMenu/PostMenu';

type PostOptionsSectionProps = {
    postDetails: PostType | null;
    onPostChange?: () => void;
};

export default function PostOptionsSection({
    postDetails,
    onPostChange,
}: PostOptionsSectionProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
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
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const postID = postDetails?._id;

            const response = await fetch(
                `${serverURL}/api/v1/post/${postID}/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ postID }),
                }
            );

            if (!response.ok) {
                handleFetchErrors(response, setInfo);
            }

            setInfo({
                typeOfInfo: 'good',
                message: 'Post deleted!',
                icon: <FaRegSmile />,
            });
            if (onPostChange) {
                onPostChange();
            }
        } catch (err: unknown) {
            setInfo({
                typeOfInfo: 'bad',
                message: 'Unable to delete post!',
                icon: <FaExclamationTriangle />,
            });
        }
    };

    const handleShowPostMenu = () => {
        setShouldMenuShow(!shouldMenuShow);
    };

    const handleEditButtonClick = () => {
        setShouldPostEditShow(true);
        setShouldMenuShow(false);
    };

    const handleDeleteButtonClick = () => {
        setShouldConfirmDialogShow(true);
        setShouldMenuShow(false);
    };

    return (
        <>
            {showConfirmDialog && (
                <ConfirmationOverlay
                    shouldConfirmDialogShow={shouldConfirmDialogShow}
                    setShouldConfirmDialogShow={setShouldConfirmDialogShow}
                    onConfirm={() => {
                        handleDelete();
                    }}
                    dialogInfo={{
                        message: 'Do you really want to delete this post?',
                        icon: <TbQuestionCircle size="2em" />,
                    }}
                />
            )}
            <div className="relative inline-block">
                <ToggleListButton
                    onToggleListButtonClick={handleShowPostMenu}
                    showMenu={showMenu}
                />

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
                    />
                )}
            </div>
        </>
    );
}
