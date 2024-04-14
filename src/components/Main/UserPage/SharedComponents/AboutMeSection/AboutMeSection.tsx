import { unescapeString } from '../../../../../utilities/unescapeString';

type AboutMeSectionProps = {
    aboutName?: string;
    aboutText: string | undefined;
};

export default function AboutMeSection({
    aboutText,
    aboutName,
}: AboutMeSectionProps): JSX.Element {
    const name = aboutName ? aboutName : 'Me'; // default name; also used for the MyPage component where no name is provided
    const text = aboutText ? aboutText : 'No information available!';

    return (
        <div className="px-4 md:px-0">
            <h1 className="text-base font-bold">About {name}</h1>
            <p className="text-sm text-start">{unescapeString(text)}</p>
        </div>
    );
}
