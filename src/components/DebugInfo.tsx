
import React from 'react';

const DebugInfo = () => {
  return (
    <div className="fixed top-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
      <div>React: ✅ Working</div>
      <div>URL: {window.location.pathname}</div>
      <div>Time: {new Date().toLocaleTimeString()}</div>
    </div>
  );
};

export default DebugInfo;
