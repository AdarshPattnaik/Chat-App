import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import RightSidebar from '../components/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

export default function HomePage() {
    const { selectedUser } = useContext(ChatContext);
    const [showRightSidebar, setShowRightSidebar] = useState(false);

    return (
        <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
            <div className={`backdrop-blur-xl border-2 border-gray-500 rounded-2xl overflow-hidden h-full grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] relative`}>

                {/* Sidebar */}
                <Sidebar />

                {/* Chat Container */}
                <ChatContainer showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} />

                {/* Right Sidebar (hidden on mobile) */}
                <div className={`absolute top-0 right-0 h-full w-full md:relative md:w-auto md:block bg-[#8185B2]/10 z-50 transform transition-transform duration-300
                    ${showRightSidebar ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
                    <RightSidebar />
                    {/* Close button for mobile */}
                    <button
                        className="absolute top-4 right-4 md:hidden text-white"
                        onClick={() => setShowRightSidebar(false)}
                    >
                        ✕
                    </button>
                </div>

            </div>
        </div>
    );
}
