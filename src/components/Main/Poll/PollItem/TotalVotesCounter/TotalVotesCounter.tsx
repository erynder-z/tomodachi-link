type TotalVotesCounterProps = {
    totalVotes: number;
};

export default function TotalVotesCounter({
    totalVotes,
}: TotalVotesCounterProps) {
    return <div className="text-xs text-right">Total votes: {totalVotes}</div>;
}
