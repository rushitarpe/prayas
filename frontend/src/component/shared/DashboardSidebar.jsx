import React from 'react';
import { FaHome, FaUser, FaUsers, FaPen, FaSignOutAlt } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { signOutSuccess } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillPostcardFill } from "react-icons/bs";

const DashboardSidebar = () => {

    const dispatch = useDispatch(); 
    const currentUser = useSelector((state) => state.user.currentUser); // Assuming you have a Redux store set up
     const handleSignout = async () => {
        try {
          const res = await fetch("/api/user/signout", {
            method: "POST",
          });
    
          const data = await res.json();
    
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signOutSuccess());
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <aside className="w-[300px] h-[80vh] bg-black border-r-4
     border-cyan-400 rounded-tr-[100px] rounded-br-[100px] shadow-[0_0_25px_#0ff] p-4 text-white flex flex-col justify-between absolute left-0 top-20 z-[1000]">
      <h2 className="text-xl font-bold text-center mb-6 text-cyan-400 [text-shadow:_0_0_10px_#0ff]">Dashboard</h2>
      <nav className="flex-1 flex flex-col gap-4">

        {currentUser && currentUser.isAdmin &&(
          <Link to="/dashboard?tab=dashboard" className="no-underline text-inherit">
          <NavItem icon={<FaHome />} label="MainDashboard" />
        </Link>

        )}
         <Link to="/dashboard?tab=profile" className="no-underline text-inherit">
          <NavItem icon={<FaUser />} label="Profile" />
        </Link>
        <Link to="/create-post" className="no-underline text-inherit">
          <NavItem icon={<FaPen />} label=" Create Post" />
        </Link>
        <Link to="/dashboard?tab=posts" className="no-underline text-inherit">
          <NavItem icon={<BiMessageDetail />} label=" Your Posts" />
        </Link>
{currentUser && currentUser.isAdmin &&(
  <Link to="/dashboard?tab=users" className="no-underline text-inherit">
          <NavItem icon={<FaUsers />} label="All Users" />
        </Link>
          
)}
 {currentUser && currentUser.isAdmin &&(

<Link to="/dashboard?tab=admin-posts" className="no-underline text-inherit">
<NavItem icon={<BsFillPostcardFill />} label=" All Posts" />
</Link> 
)}
  {currentUser && currentUser.isAdmin &&(

<Link to="/dashboard?tab=comments" className="no-underline text-inherit">
<NavItem icon={<BiMessageDetail />} label="All Comments" />
</Link>

  )}
        
       
        
        
       
        <button 
          onClick={handleSignout}
          className="mt-auto p-2 text-sm bg-[#ff004f] text-white border-none rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e60045]"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label }) => {
  const [isHovered, setHovered] = React.useState(false);

  return (
    <div
      className={`flex items-center gap-3 text-base p-2 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
        isHovered ? 'bg-[#0ff1] translate-x-1 shadow-[0_0_10px_#0ff]' : 'bg-transparent'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default DashboardSidebar;
