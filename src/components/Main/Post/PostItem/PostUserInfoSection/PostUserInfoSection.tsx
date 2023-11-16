import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';

type PostUserInfoSectionProps = {
    postOwnerID: string;
    userPic: string;
    displayName: string;
};

export default function PostUserInfoSection({
    postOwnerID,
    userPic,
    displayName,
}: PostUserInfoSectionProps) {
    const { currentUserData } = useCurrentUserData();

    const linkTarget =
        postOwnerID === currentUserData?._id
            ? `/mypage`
            : `/users/${postOwnerID}`;

    return (
        <Link
            to={linkTarget}
            className="flex gap-4 text-regularText dark:text-regularTextDark"
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
