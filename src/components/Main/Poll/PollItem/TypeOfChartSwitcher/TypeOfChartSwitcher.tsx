import { MdPieChartOutline, MdBarChart } from 'react-icons/md';
import { motion } from 'framer-motion';

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
        <motion.button
            onClick={toggleChart}
            whileTap={{ scale: 0.97 }}
            className="w-fit hover:text-highlight dark:hover:text-highlightDark duration-300"
        >
            {typeOfChart === 'PIE' ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex items-center gap-4"
                >
                    <MdBarChart
                        size="1.5em"
                        style={{ transform: 'rotate(90deg)' }}
                    />
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex items-center gap-4"
                >
                    <MdPieChartOutline size="1.5em" />
                </motion.div>
            )}
        </motion.button>
    );
}
