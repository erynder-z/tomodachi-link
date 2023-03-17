import { Blocks } from 'react-loader-spinner';

export default function VerifyingInfoBox() {
    return (
        <div>
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
            verifying...
        </div>
    );
}
