import { ShoppingCart, ChevronDown, Code, Globe, Cpu, Boxes, Brain, Code2 } from 'lucide-react';
import { IoNotifications } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { useAuth } from "../context/AuthContext.jsx";
import { GiShoppingCart } from "react-icons/gi";
import axios from "axios";

const Navbar = ({cart = []}) => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const location = useLocation(); // Track the current URL path
    
    const courseItems = [
        {id: "programming", name: "Introduction To Programming", icon: <Code className="text-purple-600" size={18} />, link: "/Courses/Programming"},
        {id: "dsa", name: "Data Structures & Algorithms", icon: <Boxes className="text-blue-600" size={18} />, link: "/Courses/DS"},
        {id: "web", name: "Web Development", icon: <Globe className="text-green-600" size={18} />, link: "/Courses/Web"},
        {id: "ai", name: "Artificial Intelligence", icon: <Cpu className="text-red-600" size={18} />, link: "/Courses/AI"},
        {id: "ml", name: "Machine Learning", icon: <Brain className="text-indigo-600" size={18} />, link: "/Courses/ML"},
    ];
    
    const role = localStorage.getItem("role");
    const { logout } = useAuth();
    const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

   const response = await axios.post(
  "http://localhost:5001/api/payment/initiate",
  {
    courses: cart.map(course => course.id),
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    window.location.href = response.data.paymentUrl;

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to initiate payment."
    );
  }
};

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const res = await fetch("http://localhost:5001/api/notifications", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                
                // FIX: Ensure response is okay and data is actually an array before setting state
                if (res.ok && Array.isArray(data)) {
                    setNotifications(data);
                } else {
                    // If token expired (401), we just clear notifications safely
                    console.error("Failed to fetch notifications properly:", data);
                    setNotifications([]);
                }
            } catch (err) { 
                console.error("Error fetching notifications", err); 
                setNotifications([]);
            }
        };
        fetchNotifications();
    }, [location.pathname]); // FIX: Re-run this effect every time the user navigates

    return (
        <div className="navbar bg-neutral text-neutral-content sticky top-0 z-50 shadow-lg px-2 lg:px-6">
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow-2xl bg-base-100 rounded-2xl w-72 text-black border border-gray-100 animate-fadeIn">
                        <li><Link to="/dashboard" className="font-semibold py-2">Dashboard</Link></li>
                        <li><Link to="/about" className="font-semibold py-2">About</Link></li>
                        <li><Link to="/courses" className="font-semibold py-2">Courses</Link></li>
                        <li><Link to="/assessments" className="font-semibold py-2">Assessments</Link></li>
                        <li><Link to="/blogs" className="font-semibold py-2 text-purple-600">Blogs</Link></li>

                        <li className="menu-title mt-3 text-purple-700 font-bold uppercase text-xs tracking-widest">Available Courses</li>
                        {courseItems.map((item) => (
                            <li key={item.id}>
                                <Link to={item.link} className="flex items-center gap-3 py-3 hover:bg-purple-50 rounded-xl transition-all">
                                    <div className="p-2 bg-gray-50 rounded-lg">{item.icon}</div>
                                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                        <div className="divider my-2"></div>
                        <li><Link to="/courses" className="justify-center font-bold text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl py-2">View All Courses</Link></li>
                    </ul>
                </div>

                {/* LOGO */}
                <Link to="/" className="normal-case flex items-center gap-1 group px-2 py-1 rounded-lg hover:bg-white/10 transition-colors">
                    <Code2 className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-2xl font-extrabold tracking-tight text-white">Co</span>
                    <span className="text-2xl font-extrabold tracking-tight text-purple-400 group-hover:text-purple-300 transition-colors">Divas</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4">
                   
                    <li><Link to="/about" className="hover:bg-white hover:text-black rounded-lg font-bold transition-all">About</Link></li>
                     {role === "student" && (<li><Link to="/dashboard" className="hover:bg-white hover:text-black rounded-lg font-bold transition-all">Dashboard</Link></li>)}
                    {role === "instructor" && (<li><Link to="/instructor" className="hover:bg-white hover:text-black rounded-lg font-bold transition-all"> Instructor Dashboard</Link></li>)}
                    {role === "admin" && (
                        <li><Link to="/admin" className="text-purple-400 font-bold">Admin Panel</Link></li>
                    )}
                    <li className="dropdown dropdown-hover group">
                        <Link to="/courses" className="px-4 py-2 hover:bg-white hover:text-black rounded-lg transition-all flex items-center gap-2 font-bold">
                            Courses <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300"/>
                        </Link>
                        <ul tabIndex={0} className="dropdown-content menu p-3 shadow-2xl bg-base-100 rounded-2xl w-80 text-black border border-purple-100 mt-0 transform origin-top transition-all duration-300 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                            <div className="grid grid-cols-1 gap-1">
                                <span className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Pick a Course</span>
                                {courseItems.map((item) => (
                                    <li key={item.id}>
                                        <Link to={item.link} className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-xl group/item transition-colors">
                                            <div className="p-2 bg-gray-50 rounded-lg group-hover/item:bg-white group-hover/item:shadow-sm transition-all">{item.icon}</div>
                                            <span className="text-[15px] font-semibold text-gray-700 group-hover/item:text-purple-700">{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                                <div className="divider my-1 opacity-50"></div>
                                <li><Link to="/courses" className="justify-center font-bold text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl py-2">View All Courses</Link></li>
                            </div>
                        </ul>
                    </li>

                    <li><Link to="/assessments" className="hover:bg-white hover:text-black rounded-lg font-bold transition-all">Assessments</Link></li>
                    <li><Link to="/blogs" className="hover:bg-white hover:text-black rounded-lg font-bold transition-all">Blogs</Link></li>
                </ul>
            </div>

            <div className="navbar-end gap-3">
                
                {/* Notification Dropdown */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle text-white hover:text-purple-400 focus:text-purple-400 active:text-purple-400 relative">
                        <div className="indicator">
                            <IoNotifications size={24} />
                            {notifications.length > 0 && (
                                <span className="badge badge-sm badge-primary indicator-item text-[10px] font-bold text-white border-none">
                                    {notifications.length}
                                </span>
                            )}
                        </div>
                    </label>
                    <div tabIndex={0} className="dropdown-content mt-4 z-1 w-80 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 text-md">Notifications</h3>
                            <span className="text-[10px] font-bold bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full uppercase">
                                {notifications.length} New
                            </span>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {(!notifications || notifications.length === 0) ? (
                                <div className="p-8 text-center text-gray-400"><p className="text-sm">No new updates</p></div>
                            ) : (
                                notifications.map((n) => (
                                    <div 
        key={n._id} 
        className="p-4 border-b border-gray-50 hover:bg-purple-50/50 transition-colors cursor-pointer group"
        onClick={() => {
            if (n.liveLink) {
                window.open(n.liveLink, "_blank", "noopener,noreferrer");
            }
        }}
    >
        <p className="text-sm text-black leading-snug font-medium group-hover:text-purple-900 transition-colors">
            {n.message}
        </p>
        {n.scheduledAt && (
            <div className="mt-2 flex items-center gap-1 text-purple-600 font-bold text-xs">
                <span>Starts: {new Date(n.scheduledAt).toLocaleString([], { 
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}</span>
            </div>
        )}
        {/* Optional: Add a visual cue that it's a clickable link */}
        {n.liveLink && (
            <span className="text-xs text-gray-700 font-semibold mt-1 inline-block">
                Click here to directly join the live class
            </span>
        )}
    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Cart Button */}
                <button
                    className="btn bg-purple-600 hover:bg-purple-300 hover:text-black text-white font-bold rounded-xl border-none"
                    onClick={() => document.getElementById("cart_modal").showModal()}
                >
                    Cart <ShoppingCart />
                    {cart?.length > 0 && (
                        <span className="badge badge-sm ml-2">{cart.length}</span>
                    )}
                </button>

                {/* Auth check */}
                {localStorage.getItem("token") ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer border border-transparent hover:border-purple-500 hover:bg-transparent transition-all">
                            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold uppercase">
                                {(localStorage.getItem("user_name") || "U").charAt(0)}
                            </div>
                            <span className="hidden md:block text-white font-semibold">
                                {localStorage.getItem("user_name")}
                            </span>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black z-1">
                            <li><span className="text-sm opacity-70">{localStorage.getItem("user_email")}</span></li>
                            <li><span className="text-xs text-gray-500">Role: {role}</span></li>
                            <div className="divider my-1"></div>
                            <li>
                                <button className="text-red-500 font-semibold" onClick={() => { logout(); navigate("/"); }}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/signup" className="btn bg-white text-black border-none px-5 rounded-xl hover:bg-purple-600 hover:text-white font-bold">Sign Up</Link>
                        <button className="btn btn-ghost text-white font-bold hover:bg-white/10 px-5 rounded-xl border border-white/20" onClick={() => document.getElementById("login").showModal()}>
                            Login
                        </button>
                    </>
                )}

                {/* Cart Modal */}
                <dialog id="cart_modal" className="modal modal-end">
                    <div className="modal-box">
                        <div className="flex items-center gap-2 mb-5">
                            <GiShoppingCart size={30} className="text-black"/>
                            <h3 className="font-bold text-xl text-black">Your Cart</h3>
                        </div>
                        {cart?.length === 0 ? (
                            <p className="flex justify-center mt-65 text-black/50 w-75">Your cart is empty</p>
                        ) : (
                            <>
                                {cart?.map((item, index) => (
                                    <div key={index} className="card border bg-purple-100 w-75 mb-4 p-2">
                                        <p className="font-bold text-lg text-black">{item.name}</p>
                                        <p className="text-black mt-2">Price: {item.price} TK</p>
                                    </div>
                                ))}
                                <div className="flex justify-center mt-4 pt-4 border-t w-full">
                                    <button
    className="btn bg-purple-700 text-white hover:bg-purple-500 w-full"
    onClick={handleCheckout}
>
    Purchase All
</button>
                                </div>
                            </>
                        )}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default Navbar;