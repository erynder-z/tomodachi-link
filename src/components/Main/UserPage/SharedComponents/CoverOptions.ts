import { CoverOption } from '../../../../types/miscTypes';
import defaultCover from '../../../../assets/defaultCover.webp';
import cover1 from '../../../../assets/cover01.webp';
import cover2 from '../../../../assets/cover02.webp';
import cover3 from '../../../../assets/cover03.webp';
import cover4 from '../../../../assets/cover04.webp';
import cover5 from '../../../../assets/cover05.webp';
import cover6 from '../../../../assets/cover06.webp';
import cover7 from '../../../../assets/cover07.webp';
import cover8 from '../../../../assets/cover08.webp';
import cover9 from '../../../../assets/cover09.webp';
import cover10 from '../../../../assets/cover10.webp';
import cover11 from '../../../../assets/cover11.webp';
import cover12 from '../../../../assets/cover12.webp';

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
    { image: cover10, name: 'cover10' },
    { image: cover11, name: 'cover11' },
    { image: cover12, name: 'cover12' },
];
