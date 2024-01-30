import { ColorRing } from 'react-loader-spinner';

type FullscreenLoadingProps = {
    message: string;
};

/**
 * React component for displaying a fullscreen loading spinner with a message.
 *
 * @component
 * @param {FullscreenLoadingProps} props - The component props.
 * @param {string} props.message - The message to display alongside the loading spinner.
 * @returns {JSX.Element} The rendered FullscreenLoading component.
 */
export default function FullscreenLoading({
    message,
}: FullscreenLoadingProps): JSX.Element {
    /**
     * Render the FullscreenLoading component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <ColorRing
                visible={true}
                height="100"
                width="100"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            <h1 className="text-xl m-0">{message}</h1>
        </div>
    );
}
