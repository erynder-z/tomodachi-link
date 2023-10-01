import { RotatingLines } from 'react-loader-spinner';

export default function ButtonBusy() {
    return (
        <div className="flex justify-center items-center p-2 md:p-4">
            <RotatingLines
                strokeColor="white"
                strokeWidth="4"
                animationDuration="0.75"
                width="28"
                visible={true}
            />
        </div>
    );
}
