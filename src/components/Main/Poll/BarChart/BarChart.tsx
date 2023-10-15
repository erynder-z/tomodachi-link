import { useMemo, useRef } from 'react';
import * as d3 from 'd3';
import './BarChart.css';
import { PollDataItemType } from '../../../../types/pollTypes';

type BarChartProps = {
    dimensions: {
        width: number;
        height: number;
    };

    data: PollDataItemType[];
};

const CHART_MARGINS = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;
const FALLBACK_HEIGHT = 480;
const FALLBACK_WIDTH = 640;

const colorScale = d3.scaleOrdinal<string>().range(d3.schemeTableau10);

export const BarChart = ({ dimensions, data }: BarChartProps) => {
    // Create references for the SVG and the wrapper div.
    const svgRef = useRef<SVGGElement | null>(null);

    const { width: dimensionsWidth, height: dimensionsHeight } = dimensions;

    // Calculate the actual width and height of the chart area, considering margins.
    const boundsWidth = dimensionsWidth
        ? dimensionsWidth - CHART_MARGINS.right - CHART_MARGINS.left
        : FALLBACK_WIDTH - CHART_MARGINS.right - CHART_MARGINS.left;

    const boundsHeight = dimensionsHeight
        ? dimensionsHeight - CHART_MARGINS.top - CHART_MARGINS.bottom
        : FALLBACK_HEIGHT - CHART_MARGINS.top - CHART_MARGINS.bottom;

    // Extract and sort the groups from the data.
    const groups = data
        .sort((a, b) => b.selectionCount - a.selectionCount)
        .map((d) => d.nameOfOption);

    // Y axis
    const yScale = useMemo(() => {
        return d3
            .scaleBand()
            .domain(groups)
            .range([0, boundsHeight])
            .padding(BAR_PADDING);
    }, [data, FALLBACK_HEIGHT]);

    // X axis
    const xScale = useMemo(() => {
        const [min, max] = d3.extent(data.map((d) => d.selectionCount));
        return d3
            .scaleLinear()
            .domain([0, max || 10])
            .range([0, boundsWidth]);
    }, [data, FALLBACK_WIDTH]);

    // Build the shapes (bars, labels, and grid lines).
    const allShapes = data.map((d, i) => {
        const y = yScale(d.nameOfOption);
        if (y === undefined) {
            return null;
        }

        return (
            <g key={i}>
                <rect
                    x={xScale(0)}
                    y={yScale(d.nameOfOption)}
                    width={xScale(d.selectionCount)}
                    height={yScale.bandwidth()}
                    fill={colorScale(i.toString())}
                    fillOpacity={0.9}
                    strokeWidth={1}
                    rx={1}
                    className="bar transition duration-300 filter saturate-100 opacity-100 cursor-pointer"
                    onMouseEnter={() => {
                        if (svgRef.current) {
                            svgRef.current.classList.add('hasHighlight');
                        }
                    }}
                    onMouseLeave={() => {
                        if (svgRef.current) {
                            svgRef.current.classList.remove('hasHighlight');
                        }
                    }}
                />
                <text
                    x={xScale(d.selectionCount) - 10}
                    y={y + yScale.bandwidth() / 2}
                    textAnchor="end"
                    alignmentBaseline="central"
                    className="fill-regularText dark:fill-regularTextDark"
                    opacity={xScale(d.selectionCount) > 90 ? 1 : 0} // hide label if bar is not wide enough
                >
                    {d.selectionCount}
                </text>
                <text
                    x={xScale(0) + 10}
                    y={y + yScale.bandwidth() / 2}
                    textAnchor="start"
                    alignmentBaseline="central"
                    className="fill-regularText dark:fill-regularTextDark"
                >
                    {d.nameOfOption}
                </text>
            </g>
        );
    });

    // Create grid lines for the x-axis.
    const grid = xScale
        .ticks(5)
        .filter((value) => Number.isInteger(value)) // Filter to include only whole numbers
        .map((value, i) => (
            <g key={i}>
                <line
                    x1={xScale(value)}
                    x2={xScale(value)}
                    y1={0}
                    y2={boundsHeight}
                    className="stroke-regularText dark:stroke-regularTextDark"
                    opacity={0.2}
                />
                <text
                    x={xScale(value)}
                    y={boundsHeight + 10}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    className="fill-regularText dark:fill-regularTextDark"
                    opacity={0.8}
                >
                    {value}
                </text>
            </g>
        ));

    return (
        <div>
            <svg
                width={boundsWidth + CHART_MARGINS.left + CHART_MARGINS.right}
                height={boundsHeight + CHART_MARGINS.top + CHART_MARGINS.bottom}
            >
                <g
                    ref={svgRef}
                    width={boundsWidth}
                    height={boundsHeight}
                    className="container"
                    transform={`translate(${CHART_MARGINS.left},${CHART_MARGINS.top})`}
                >
                    {grid}
                    {allShapes}
                </g>
            </svg>
        </div>
    );
};
