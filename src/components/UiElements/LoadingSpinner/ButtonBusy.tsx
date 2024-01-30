import { RotatingLines } from 'react-loader-spinner';

/**
 * React component for rendering a button in a busy/loading state.
 *
 * @component
 * @returns {JSX.Element} The rendered ButtonBusy component.
 */
export default function ButtonBusy(): JSX.Element {
    /**
     * Render the ButtonBusy component.
     *
     * @type {JSX.Element}
     */
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
