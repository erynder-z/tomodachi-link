import { MdPieChartOutline, MdBarChart } from 'react-icons/md';

type TypeOfChartSwitcherProps = {
    typeOfChart: 'PIE' | 'BAR';
    setTypeOfChart: React.Dispatch<React.SetStateAction<'PIE' | 'BAR'>>;
};
export default function TypeOfChartSwitcher({
    typeOfChart,
    setTypeOfChart,
}: TypeOfChartSwitcherProps) {
    const toggleChart = () => {
        typeOfChart === 'PIE' ? setTypeOfChart('BAR') : setTypeOfChart('PIE');
    };
    return (
        <button
            onClick={toggleChart}
            className="flex justify-center md:justify-start items-center w-full hover:text-highlight dark:hover:text-highlightDark duration-300"
        >
            {typeOfChart === 'PIE' ? (
                <div className="flex items-center gap-4">
                    <MdBarChart
                        size="1.5em"
                        style={{ transform: 'rotate(90deg)' }}
                    />
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <MdPieChartOutline size="1.5em" />
                </div>
            )}
        </button>
    );
}
