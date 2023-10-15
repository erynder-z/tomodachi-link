import { useMemo, useRef } from 'react';
import * as d3 from 'd3';
import './PieChart.css';
import { PollDataItemType } from '../../../../types/pollTypes';

type PieChartProps = {
    dimensions: {
        width: number;
        height: number;
    };
    data: PollDataItemType[];
};

const MARGIN_X = 150;
const MARGIN_Y = 50;
const LABEL_EXTENSION = 20;

const FALLBACK_HEIGHT = 480;
const FALLBACK_WIDTH = 640;

const colorScale = d3.scaleOrdinal<string>().range(d3.schemeTableau10);

export const PieChart = ({ dimensions, data }: PieChartProps) => {
    const svgRef = useRef<SVGGElement | null>(null);

    const chartWidth = dimensions.width || FALLBACK_WIDTH;
    const chartHeight = dimensions.height || FALLBACK_HEIGHT;

    const radius =
        Math.min(chartWidth - 2 * MARGIN_X, chartHeight - 2 * MARGIN_Y) / 2;
    const innerRadius = 0;

    const pieData = useMemo(() => {
        const pieGenerator = d3
            .pie<PollDataItemType>()
            .value((d) => d.selectionCount);
        return pieGenerator(data);
    }, [data]);

    const arcGenerator = d3.arc();

    const pieSlices = pieData.map((slice, index) => {
        const sliceInfo = {
            innerRadius,
            outerRadius: radius,
            startAngle: slice.startAngle,
            endAngle: slice.endAngle,
        };

        const centroid = arcGenerator.centroid(sliceInfo);
        const slicePath = arcGenerator(sliceInfo);
        const labelExtensionInfo = {
            innerRadius: radius + LABEL_EXTENSION,
            outerRadius: radius + LABEL_EXTENSION,
            startAngle: slice.startAngle,
            endAngle: slice.endAngle,
        };

        const labelExtensionPoint = arcGenerator.centroid(labelExtensionInfo);

        const isRightLabel = labelExtensionPoint[0] > 0;
        const labelPosX = labelExtensionPoint[0] + 50 * (isRightLabel ? 1 : -1);
        const textAnchor = isRightLabel ? 'start' : 'end';

        const labelText = slice.data.nameOfOption + ' (' + slice.value + ')';
        if (slice.value > 0) {
            return (
                <g
                    key={index}
                    className="slice transition duration-300 filter saturate-100 opacity-100 cursor-pointer"
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
                >
                    <path
                        d={String(slicePath)}
                        fill={colorScale(index.toString())}
                    />
                    <circle cx={centroid[0]} cy={centroid[1]} r={2} />
                    <line
                        x1={centroid[0]}
                        y1={centroid[1]}
                        x2={labelExtensionPoint[0]}
                        y2={labelExtensionPoint[1]}
                        className="stroke-regularText dark:stroke-regularTextDark"
                    />
                    <line
                        x1={labelExtensionPoint[0]}
                        y1={labelExtensionPoint[1]}
                        x2={labelPosX}
                        y2={labelExtensionPoint[1]}
                        className="stroke-regularText dark:stroke-regularTextDark"
                    />
                    <text
                        x={labelPosX + (isRightLabel ? 2 : -2)}
                        y={labelExtensionPoint[1]}
                        textAnchor={textAnchor}
                        dominantBaseline="middle"
                        fontSize={14}
                        className="text-xs md:text-base fill-regularText dark:fill-regularTextDark"
                    >
                        {labelText}
                    </text>
                </g>
            );
        } else {
            return null;
        }
    });
    return (
        <div>
            <svg width={chartWidth} height={chartHeight}>
                <g
                    transform={`translate(${chartWidth / 2}, ${
                        chartHeight / 2
                    })`}
                    className="container"
                    ref={svgRef}
                >
                    {pieSlices}
                </g>
            </svg>
        </div>
    );
};
