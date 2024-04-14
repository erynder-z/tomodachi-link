import { TbMessages } from 'react-icons/tb';
import { CurrentUserDataType } from '../../../../../types/currentUserTypes';
import { MinimalUserTypes } from '../../../../../types/otherUserTypes';

type ChatroomHeaderProps = {
    currentUserData: CurrentUserDataType | null;
    partnerData: MinimalUserTypes | null;
};

/**
 * Chatroom header component displaying user avatars and chat logo.
 *
 * @component
 * @param {ChatroomHeaderProps} props - The props object.
 * @param {CurrentUserDataType | null} props.currentUserData - Current user's data.
 * @param {MinimalUserTypes | null} props.partnerData - Partner's data.
 * @returns {JSX.Element} The rendered ChatroomHeader component.
 */
export default function ChatroomHeader({
    currentUserData,
    partnerData,
}: ChatroomHeaderProps): JSX.Element {
    const currentUserPicSrc = currentUserData?.userpic?.data || '';
    const partnerPicSrc = partnerData?.userpic?.data || '';

    /**
     * JSX content for the current user's avatar and name.
     * @type {JSX.Element}
     */
    const CurrentUserContent: JSX.Element = (
        <div className="flex flex-col justify-center items-center gap-2">
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

    /**
     * JSX content for the chat logo.
     * @type {JSX.Element}
     */
    const ChatLogoContent: JSX.Element = (
        <TbMessages className="text-3xl md:text-6xl my-auto" />
    );

    /**
     * JSX content for the partner's avatar and name.
     * @type {JSX.Element}
     */
    const ChatPartnerContent: JSX.Element = (
        <div className="flex flex-col justify-center items-center gap-2">
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

    /**
     * The rendered content of the ChatroomHeader component.
     * @type {JSX.Element}
     */
    return (
        <div className="w-full sticky top-[6.75rem] md:-top-4 bg-background2 dark:bg-background2Dark z-10">
            <header className="flex justify-around p-2 md:p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark shadow-lg rounded md:rounded-lg">
                {CurrentUserContent}
                {ChatLogoContent}
                {ChatPartnerContent}
            </header>
        </div>
    );
}
