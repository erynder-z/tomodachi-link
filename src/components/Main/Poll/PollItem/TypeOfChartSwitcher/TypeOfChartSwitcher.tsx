import { MdPieChartOutline, MdBarChart } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../../hooks/useTheme';

type TypeOfChartSwitcherProps = {
    typeOfChart: 'PIE' | 'BAR';
    setTypeOfChart: React.Dispatch<React.SetStateAction<'PIE' | 'BAR'>>;
};

/**
 * React component for rendering a chart type switcher button, allowing toggling between pie and bar charts.
 *
 * @component
 * @param {TypeOfChartSwitcherProps} props - The component props.
 * @param {('PIE' | 'BAR')} props.typeOfChart - The currently selected type of chart ('PIE' or 'BAR').
 * @param {React.Dispatch<React.SetStateAction<'PIE' | 'BAR'>>} props.setTypeOfChart - State setter function for updating the type of chart.
 * @returns {JSX.Element} - Rendered TypeOfChartSwitcher component.
 */
export default function TypeOfChartSwitcher({
    typeOfChart,
    setTypeOfChart,
}: TypeOfChartSwitcherProps) {
    const { isMobileDevice } = useTheme();
    /**
     * Toggles between pie and bar chart types when the button is clicked.
     * @returns {void}
     */ const toggleChart = () => {
        typeOfChart === 'PIE' ? setTypeOfChart('BAR') : setTypeOfChart('PIE');
    };

    /**
     * Renders the chart type switcher button with motion effects and tooltips.
     * @returns {JSX.Element} - Rendered chart type switcher button.
     */
    return (
        <motion.button
            onClick={toggleChart}
            whileTap={{ scale: 0.97 }}
            className="w-fit hover:text-highlight dark:hover:text-highlightDark duration-300"
        >
            {typeOfChart === 'PIE' ? (
                <>
                    <motion.div
                        data-tooltip-id="poll-toggle-bar-tooltip"
                        data-tooltip-content="Show bar chart"
                        data-tooltip-variant="dark"
                        data-tooltip-delay-show={500}
                        data-tooltip-hidden={isMobileDevice}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-4"
                    >
                        <MdBarChart
                            size="1.5em"
                            style={{ transform: 'rotate(90deg)' }}
                        />
                    </motion.div>
                    <Tooltip
                        id="poll-toggle-bar-tooltip"
                        style={{ fontSize: '0.75rem' }}
                    />
                </>
            ) : (
                <>
                    <motion.div
                        data-tooltip-id="poll-toggle-pie-tooltip"
                        data-tooltip-content="Show pie chart"
                        data-tooltip-variant="dark"
                        data-tooltip-delay-show={500}
                        data-tooltip-hidden={isMobileDevice}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-4"
                    >
                        <MdPieChartOutline size="1.5em" />
                    </motion.div>
                    <Tooltip
                        id="poll-toggle-pie-tooltip"
                        style={{ fontSize: '0.75rem' }}
                    />
                </>
            )}
        </motion.button>
    );
}
