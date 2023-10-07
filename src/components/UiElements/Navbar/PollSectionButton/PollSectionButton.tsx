import { MdPieChartOutlined } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function PollSectionButton() {
    return (
        <NavLink
            to="/polls"
            className={({ isActive }) =>
                isActive
                    ? 'text-highlight dark:text-highlightDark flex self-center cursor-pointer h-6 w-full'
                    : 'text-regularText dark:text-regularTextDark flex self-center cursor-pointer h-6 w-full '
            }
        >
            <button type="button">
                <MdPieChartOutlined size="1.5em" />
            </button>
        </NavLink>
    );
}
