import { CoverOption } from '../../../../types/coverOptionTypes';
import defaultCover from '../../../../assets/defaultCover.webp';
import cover1 from '../../../../assets/cover01.jpg';
import cover2 from '../../../../assets/cover02.jpg';
import cover3 from '../../../../assets/cover03.jpg';
import cover4 from '../../../../assets/cover04.jpg';
import cover5 from '../../../../assets/cover05.jpg';
import cover6 from '../../../../assets/cover06.jpg';
import cover7 from '../../../../assets/cover07.jpg';
import cover8 from '../../../../assets/cover08.jpg';
import cover9 from '../../../../assets/cover09.jpg';

const NONE_COVER_OPTION: CoverOption = {
    image: defaultCover,
    name: 'none',
};

export const COVER_OPTIONS: CoverOption[] = [
    NONE_COVER_OPTION,
    { image: cover1, name: 'cover1' },
    { image: cover2, name: 'cover2' },
    { image: cover3, name: 'cover3' },
    { image: cover4, name: 'cover4' },
    { image: cover5, name: 'cover5' },
    { image: cover6, name: 'cover6' },
    { image: cover7, name: 'cover7' },
    { image: cover8, name: 'cover8' },
    { image: cover9, name: 'cover9' },
];
