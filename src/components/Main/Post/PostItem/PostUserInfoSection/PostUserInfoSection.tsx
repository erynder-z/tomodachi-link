import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';

type PostUserInfoSectionProps = {
    postOwnerID: string;
    userPic: string;
    displayName: string;
};

/**
 * Represents a component for rendering the user information section of a post.
 *
 * @component
 * @param {PostUserInfoSectionProps} props - The component properties.
 * @returns {JSX.Element} The rendered PostUserInfoSection component.
 */
export default function PostUserInfoSection({
    postOwnerID,
    userPic,
    displayName,
}: PostUserInfoSectionProps): JSX.Element {
    const { currentUserData } = useCurrentUserData();

    const linkTarget =
        postOwnerID === currentUserData?._id
            ? `/mypage`
            : `/users/${postOwnerID}`;

    /**
     * The rendered PostUserInfoSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <Link
            to={linkTarget}
            className="flex gap-4 text-regularText dark:text-regularTextDark hover:text-regularText dark:hover:text-regularTextDark"
        >
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${userPic}`}
                alt="User avatar"
            />
            <div className="font-bold truncate">{displayName}</div>
        </Link>
    );
}
