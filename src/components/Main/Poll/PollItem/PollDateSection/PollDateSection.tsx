type PollDateSectionProps = {
    date: string;
};

export default function PollDateSection({ date }: PollDateSectionProps) {
    return (
        <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center h-full">created on:</span>
            <span className="flex items-center h-full text-base font-bold">
                {' '}
                {date}
            </span>
        </div>
    );
}
