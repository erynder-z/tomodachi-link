import { InfoType } from '../../types/infoType';

type InfoOverlayPropsType = {
    showOverlay: boolean;
    info?: InfoType | null;
};

const InfoOverlay = ({
    showOverlay = false,
    info = null,
}: InfoOverlayPropsType) => {
    return (
        <div
            className={`fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center transition-opacity ${
                showOverlay ? 'bg-gray-800/80' : 'opacity-0 pointer-events-none'
            }`}
        >
            <h2 className="flex flex-col items-center gap-4 text-white text-xl font-semibold">
                {info?.icon && info?.icon}
                {info?.message}
            </h2>
        </div>
    );
};

export default InfoOverlay;
