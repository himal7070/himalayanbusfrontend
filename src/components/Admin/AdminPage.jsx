import React, {useEffect, useState} from 'react';
import '/src/styles/Admin/AdminDashboard.css';
import AdminSidebar from "./AdminSidebar.jsx";
import AdminDashboard from "./AdminDashboard.jsx";


function AdminPage() {
    const [isCollapsible, setIsCollapsible] = useState(false);


    const toggleSidebar = () => {
        setIsCollapsible(!isCollapsible);
    };


    const checkScreenWidth = () => {
        const breakpoint = 768;

        if (window.innerWidth <= breakpoint) {
            setIsCollapsible(true);
        } else {
            setIsCollapsible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', checkScreenWidth);
        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        };
    }, []);

    useEffect(() => {
        checkScreenWidth();
    }, []);


    return (
        <div>
            <AdminSidebar isCollapsible={isCollapsible} toggleSidebar={toggleSidebar} />
            <AdminDashboard isCollapsible={isCollapsible} />
        </div>
    );
}

export default AdminPage;
