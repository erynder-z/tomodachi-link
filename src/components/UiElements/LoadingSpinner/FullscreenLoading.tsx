import { ColorRing } from 'react-loader-spinner';

type FullscreenLoadingProps = {
    message: string;
};

export default function FullscreenLoading({ message }: FullscreenLoadingProps) {
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
            <h1>{message}</h1>
        </div>
    );
}
