import React from 'react';
import { MdSync } from 'react-icons/md';
import './RefreshFeedButton.css';

type RefreshFeedButtonProps = {
    refreshFeed: () => Promise<void>;
};

export default function RefreshFeedButton({
    refreshFeed,
}: RefreshFeedButtonProps) {
    return (
        <button onClick={refreshFeed} className="refresh-button">
            <MdSync className="spin-on-hover" />
        </button>
    );
}
