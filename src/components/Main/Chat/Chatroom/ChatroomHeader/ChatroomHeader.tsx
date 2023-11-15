import { TbMessages } from 'react-icons/tb';
import { CurrentUserDataType } from '../../../../../types/currentUserTypes';
import { MinimalUserTypes } from '../../../../../types/otherUserTypes';

type ChatroomHeaderProps = {
    currentUserData: CurrentUserDataType | null;
    partnerData: MinimalUserTypes | null;
};

export default function ChatroomHeader({
    currentUserData,
    partnerData,
}: ChatroomHeaderProps) {
    const currentUserPicSrc = currentUserData?.userpic.data;
    const partnerPicSrc = partnerData?.userpic.data;

    const CurrentUserContent = (
        <div className="flex flex-col justify-center items-center">
            <img
                loading="lazy"
                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
                src={`data:image/png;base64,${currentUserPicSrc}`}
                alt="User avatar"
            />
            <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                You
            </div>
        </div>
    );

    const ChatLogoContent = (
        <div className="flex flex-col justify-center items-center font-bold text-xl">
            <TbMessages className="text-3xl md:text-7xl" />
            Chat
        </div>
    );

    const ChatPartnerContent = (
        <div className="flex flex-col justify-center items-center">
            <img
                loading="lazy"
                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
                src={`data:image/png;base64,${partnerPicSrc}`}
                alt="User avatar"
            />
            <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                {partnerData?.firstName} {partnerData?.lastName}
            </div>
        </div>
    );

    return (
        <div className="w-full sticky top-[5.75rem] md:-top-4 bg-background2 dark:bg-background2Dark z-10">
            <header className="flex justify-around py-2 md:py-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark shadow-lg rounded md:rounded-lg">
                {CurrentUserContent}
                {ChatLogoContent}
                {ChatPartnerContent}
            </header>
        </div>
    );
}
