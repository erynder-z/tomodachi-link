type DateSectionProps = {
    date: string;
};

export default function DateSection({ date }: DateSectionProps) {
    return (
        <div className="flex items-center italic text-center w-1/2 md:w-fit text-xs md:text-sm">
            {date}
        </div>
    );
}
