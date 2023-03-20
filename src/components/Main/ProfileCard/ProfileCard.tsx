import React from 'react';

export default function ProfileCard() {
    return (
        <div className="flex w-full mr-4">
            <div className="w-full text-center rounded-md shadow-lg p-4 bg-white">
                <img
                    className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
                    src="https://images.unsplash.com/photo-1611342799915-5dd9f1665d04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="User avatar"
                />
                <p className="font-semibold text-lg mb-5">Username</p>
                <p className="text-sm mb-2">69 Friends</p>
                <p className="text-sm">Status: Idle</p>
            </div>
        </div>
    );
}
