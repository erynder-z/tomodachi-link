import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { convertDatabaseImageToBase64 } from '../../../../../utilities/convertDatabaseImageToBase64';
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

    let src = '';

    if (typeof userPic === 'string') {
        src = `data:image/png;base64,${userPic}`;
    } else if (userPic && userPic.type === 'Buffer') {
        const convertedImage = convertDatabaseImageToBase64(userPic);
        src = `data:image/png;base64,${convertedImage}`;
    }

    const linkTarget =
        pollOwnerID === currentUserData?._id
            ? `/mypage`
            : `/users/${pollOwnerID}`;

    return (
        <Link
            to={linkTarget}
            className="flex items-center gap-4 text-regularText dark:text-regularTextDark"
        >
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={src}
                alt="User avatar"
            />
            <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center h-full"> by:</span>
                <span className="flex items-center h-full text-base font-bold">
                    {displayName}
                </span>
            </div>
        </Link>
    );
}
