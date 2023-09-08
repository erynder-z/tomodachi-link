import React from 'react';
import { LineWave } from 'react-loader-spinner';
import useTheme from '../../../hooks/useTheme';

type LoadingSpinnerProps = {
    message?: string;
};

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
    const { theme } = useTheme();

    const brightThemeColor = 'rgba(0,0,0,0.4)';
    const darkThemeColor = 'rgba(255,255,255,0.4)';
    const highlightColor = '#0598BC';
    const darkHighlightColor = '#BC05BC';
    const mainColor = theme === 'bright' ? brightThemeColor : darkThemeColor;
    const middleBarColor =
        theme === 'bright' ? highlightColor : darkHighlightColor;
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
            {message && (
                <h1 className="font-bold text-loading dark:text-loadingDark">
                    {message}
                </h1>
            )}
            <LineWave
                height="100"
                width="100"
                color={mainColor}
                ariaLabel="line-wave"
                visible={true}
                middleLineColor={middleBarColor}
            />
        </div>
    );
}
