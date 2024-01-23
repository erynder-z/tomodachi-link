type PollDateSectionProps = {
    date: string;
};

/**
 * React component for rendering the date section of a poll, displaying the creation date.
 *
 * @component
 * @param {PollDateSectionProps} props - The component props.
 * @param {string} props.date - The creation date of the poll.
 * @returns {JSX.Element} - Rendered PollDateSection component.
 */
export default function PollDateSection({
    date,
}: PollDateSectionProps): JSX.Element {
    /**
     * Renders the date section of the poll.
     * @returns {JSX.Element} - Rendered date section.
     */
    return (
        <div className="flex items-center justify-end gap-2 w-full">
            <span className="hidden md:flex items-center h-full text-center text-xs md:text-sm">
                created:
            </span>
            <span className="flex items-center h-full text-xs md:text-base md:font-bold truncate">
                {date}
            </span>
        </div>
    );
}
