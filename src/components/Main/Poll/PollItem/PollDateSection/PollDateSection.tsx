type PollDateSectionProps = {
    date: string;
};

export default function PollDateSection({ date }: PollDateSectionProps) {
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
