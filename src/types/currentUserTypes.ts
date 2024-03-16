import { CoverType, ImageType } from './miscTypes';

export type CurrentUserDataType = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    about?: string;
    friends: string[];
    posts: string[];
    bookmarks: string[];
    pendingFriendRequests: string[];
    joined: Date;
    lastSeen: Date;
    userpic: ImageType;
    cover: CoverType;
    accountType: 'regularUser' | 'guest';
    hasAcceptedTOS: boolean;
};

export type CurrentUserDataContextProviderProps = {
    children: React.ReactElement;
};

export type CurrentUserDataContextProps = {
    currentUserData: CurrentUserDataType | null;
    setCurrentUserData: (user: CurrentUserDataType | null) => void;
    handleFetchUserData: () => void;
};
