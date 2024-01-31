type BadgeProps = {
    numberToShow: number;
};

/**
 * React component for rendering a badge with a number.
 *
 * @function
 * @param {BadgeProps} props - The component props.
 * @param {number} props.numberToShow - The number to display in the badge.
 * @returns {JSX.Element} The rendered Badge component.
 */
export default function Badge({ numberToShow }: BadgeProps): JSX.Element {
    /**
     * Render the Badge component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="absolute top-3 left-3 flex items-center justify-center h-4 w-4 rounded-full bg-highlight dark:bg-highlightDark text-regularTextDark text-xs pointer-events-none">
            {numberToShow}
        </div>
    );
}
