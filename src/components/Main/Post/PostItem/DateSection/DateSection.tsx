type DateSectionProps = {
    date: string;
};

/**
 * Represents a component for displaying a date section.
 *
 * @component
 * @param {DateSectionProps} props - The component properties.
 * @returns {JSX.Element} The rendered DateSection component.
 */
export default function DateSection({ date }: DateSectionProps): JSX.Element {
    /**
     * The rendered DateSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex items-center italic text-center w-1/2 md:w-fit text-xs md:text-sm">
            {date}
        </div>
    );
}
