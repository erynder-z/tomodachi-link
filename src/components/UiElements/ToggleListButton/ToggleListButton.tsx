import { MdExpandMore } from 'react-icons/md';
import './ToggleListButton.css';

type ToggleListButtonProps = {
    onToggleListButtonClick: () => void;
    showMenu?: boolean;
};

/**
 * React component for rendering a toggle button to show/hide a list.
 *
 * @component
 * @param {ToggleListButtonProps} props - The component props.
 * @param {Function} props.onToggleListButtonClick - Function to handle the click event when the button is clicked.
 * @param {boolean} [props.showMenu] - Indicates whether the list is currently visible.
 * @returns {JSX.Element} The rendered ToggleListButton component.
 */
export default function ToggleListButton({
    onToggleListButtonClick,
    showMenu,
}: ToggleListButtonProps): JSX.Element {
    /**
     * JSX Element representing the toggle list button.
     *
     * @type {JSX.Element}
     */
    return (
        <div
            className={`ml-auto h-full flex items-center rotate-on-hover cursor-pointer hover:text-highlight dark:hover:text-highlightDark transition-all ${
                showMenu ? 'rotate-up' : 'rotate-down'
            }`}
            onClick={onToggleListButtonClick}
        >
            <MdExpandMore size="1.25em" className="hover:animate-squish" />
        </div>
    );
}
