import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileEdit,
    FileText,
    PieChart,
    Send,
    Settings
} from 'lucide-react';
import './SidebarNavigation.css';

const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/taxpayers', label: 'My Taxpayers', icon: Users },
    { path: '/start-filing', label: 'Start Filing', icon: FileEdit },
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/summary', label: 'Tax Summary', icon: PieChart },
    { path: '/submit', label: 'Submit & Track', icon: Send },
    { path: '/settings', label: 'Settings', icon: Settings },
];

const SidebarNavigation = () => {
    return (
        <nav className="sidebar-nav">
            <ul className="nav-list">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <li key={item.path} className="nav-item">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                <Icon size={20} className="nav-icon" />
                                <span className="nav-label">{item.label}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default SidebarNavigation;
