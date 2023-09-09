import { Blocks } from 'react-loader-spinner';

export default function VerifyingInfoBox() {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
            Verifying...
        </div>
    );
}
