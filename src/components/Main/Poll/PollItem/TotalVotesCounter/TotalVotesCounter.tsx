type TotalVotesCounterProps = {
    totalVotes: number;
};

/**
 * React component for rendering the total votes counter section of a poll.
 *
 * @component
 * @param {TotalVotesCounterProps} props - The component props.
 * @param {number} props.totalVotes - The total number of votes for the poll.
 * @returns {JSX.Element} - Rendered TotalVotesCounter component.
 */
export default function TotalVotesCounter({
    totalVotes,
}: TotalVotesCounterProps): JSX.Element {
    /**
     * Renders the total votes counter section of the poll.
     * @returns {JSX.Element} - Rendered total votes counter section.
     */
    return <div className="text-xs text-right">Total votes: {totalVotes}</div>;
}
