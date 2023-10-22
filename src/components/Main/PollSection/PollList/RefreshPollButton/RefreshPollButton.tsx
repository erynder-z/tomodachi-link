import { MdSync } from 'react-icons/md';
import './RefreshPollButton.css';

type RefreshPollButtonProps = {
    refreshPoll: () => Promise<void>;
};

export default function RefreshPollButton({
    refreshPoll,
}: RefreshPollButtonProps) {
    return (
        <button onClick={refreshPoll} className="refresh-button">
            <MdSync className="spin-on-hover" />
        </button>
    );
}
