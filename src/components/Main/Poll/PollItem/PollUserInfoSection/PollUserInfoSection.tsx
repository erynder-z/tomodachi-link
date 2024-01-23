import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { ImageType } from '../../../../../types/miscTypes';

type PollUserInfoSectionProps = {
    pollOwnerID: string;
    userPic: ImageType | string | null;
    displayName: string;
};

/**
 * React component for rendering the user information section of a poll, including user avatar, display name, and a link to the user's profile page.
 *
 * @component
 * @param {PollUserInfoSectionProps} props - The component props.
 * @param {string} props.pollOwnerID - The ID of the poll owner.
 * @param {ImageType|string|null} props.userPic - The user's profile picture or a placeholder string or null.
 * @param {string} props.displayName - The display name of the poll owner.
 * @returns {JSX.Element} - Rendered PollUserInfoSection component.
 */
export default function PollUserInfoSection({
    pollOwnerID,
    userPic,
    displayName,
}: PollUserInfoSectionProps): JSX.Element {
    const { currentUserData } = useCurrentUserData();

    const linkTarget =
        pollOwnerID === currentUserData?._id
            ? `/mypage`
            : `/users/${pollOwnerID}`;

    /**
     * Renders the user information section of the poll.
     * @returns {JSX.Element} - Rendered user information section.
     */
    return (
        <Link
            to={linkTarget}
            className="flex items-center gap-2 text-regularText dark:text-regularTextDark hover:text-regularText dark:hover:text-regularTextDark w-full"
        >
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full mr-2"
                src={`data:image/png;base64,${userPic}`}
                alt="User avatar"
            />

            <span className="flex items-center h-full text-xs md:text-sm">
                by:
            </span>
            <div className="h-full text-sm md:text-base font-bold text-center truncate">
                <span className="h-full text-sm md:text-base font-bold text-center">
                    {displayName}
                </span>
            </div>
        </Link>
    );
}
