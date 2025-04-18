import React, { useEffect, useState } from 'react'
import DashboardComments from '../component/shared/DashboardComments'
import DashboardPosts from '../component/shared/DashboardPosts'
import DashboardProfile from '../component/shared/DashboardProfile'
import DashboardSidebar from '../component/shared/DashboardSidebar'
import DashboardUsers from '../component/shared/DashboardUsers'
import MainDashboard from '../component/shared/MainDashboard'
import BottomNavBar from '../component/shared/BottomNavBar'
import { useLocation } from 'react-router-dom'
const Dashboard = () => {
const location =useLocation()
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
    {/* Sidebar */}
    <div className="hidden md:block">
      <DashboardSidebar />
    </div>

    <BottomNavBar />

    <div className="w-full">
      {/* profile */}
      {tab === "profile" && <DashboardProfile />}

      {/* news articles */}
      {tab === "posts" && <DashboardPosts />}

      {/* users */}
      {tab === "users" && <DashboardUsers />}

      {/* comments */}
      {tab === "comments" && <DashboardComments />}

      {/* dashboard main component */}
      {tab === "dashboard" && <MainDashboard />}
    </div>
  </div>
  )
}

export default Dashboard