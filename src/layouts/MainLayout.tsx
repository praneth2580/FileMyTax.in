import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import SidebarNavigation from './SidebarNavigation';
import './MainLayout.css';

const MainLayout = () => {
    return (
        <div className="layout-container">
            <TopBar />
            <div className="layout-body">
                <SidebarNavigation />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
