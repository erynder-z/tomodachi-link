import './ScanLinesOverlay.css';

/**
 * React component for rendering a scan lines overlay with horizontal lines.
 *
 * @component
 * @returns {JSX.Element} The rendered ScanLinesOverlay component.
 */
export default function ScanLinesOverlay() {
    /**
     * Rendered JSX for the ScanLinesOverlay component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 pointer-events-none scanlines-horizontal"></div>
    );
}
