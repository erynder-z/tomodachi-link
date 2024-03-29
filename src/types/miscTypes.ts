import { InfoType } from './infoTypes';
import { MinimalUserTypes } from './otherUserTypes';

export type CoverOption = {
    image: string;
    name: string;
};

export type CoverType =
    | 'cover1'
    | 'cover2'
    | 'cover3'
    | 'cover4'
    | 'cover5'
    | 'cover6'
    | 'cover7'
    | 'cover8'
    | 'cover9'
    | 'cover10'
    | 'cover11'
    | 'cover12';

export type ImageType = {
    id: string;
    data: any;
    contentType?: string;
    type?: string;
};

export enum ViewMode {
    None,
    EmojiPicker,
    YoutubeEmbed,
    GifSelector,
}

export type ThemeType = 'bright' | 'dark';

export type ScanLinesType = 'none' | 'horizontal';

export type TimeOfDayMessageType = {
    typeOfInfo: InfoType;
    message: string;
    icon: JSX.Element;
};

export type FetchStatusType = 'idle' | 'fetching' | 'delayed' | 'error';

export type PaginatedListDataType = {
    page: number;
    pageUserData: MinimalUserTypes[];
};

export type PasswordForm = {
    password: string;
    confirmPassword: string;
};

export type ThemeContextProps = {
    colorScheme: ThemeType;
    setColorScheme: (colorScheme: ThemeType) => void;
    scanLines: ScanLinesType;
    setScanLines: (scanLines: ScanLinesType) => void;
};
