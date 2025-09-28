import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Welcome to Video Calling App</h2>
          <p className="mb-4">Get started by joining or creating a room.</p>
          <div className="card-actions">
            <button className="btn btn-primary">Create Room</button>
            <button className="btn btn-secondary">Join Room</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;