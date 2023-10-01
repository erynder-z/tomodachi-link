type DateSectionProps = {
    date: string;
};

export default function DateSection({ date }: DateSectionProps) {
    return <div className="italic">{date}</div>;
}
