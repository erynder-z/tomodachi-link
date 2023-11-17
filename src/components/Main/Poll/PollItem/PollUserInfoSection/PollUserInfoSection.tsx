import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { ImageType } from '../../../../../types/miscTypes';

type PollUserInfoSectionProps = {
    pollOwnerID: string;
    userPic: ImageType | string | null;
    displayName: string;
};

export default function PollUserInfoSection({
    pollOwnerID,
    userPic,
    displayName,
}: PollUserInfoSectionProps) {
    const { currentUserData } = useCurrentUserData();

    const linkTarget =
        pollOwnerID === currentUserData?._id
            ? `/mypage`
            : `/users/${pollOwnerID}`;

    return (
        <Link
            to={linkTarget}
            className="flex items-center gap-2 text-regularText dark:text-regularTextDark w-full"
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
