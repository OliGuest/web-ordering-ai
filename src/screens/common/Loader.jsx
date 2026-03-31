import React from 'react';

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner">
        <div className="loader-ring" />
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="skeleton-container">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img skeleton-pulse" />
          <div className="skeleton-content">
            <div className="skeleton-title skeleton-pulse" />
            <div className="skeleton-text skeleton-pulse" />
            <div className="skeleton-price skeleton-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loader;
export { SkeletonLoader };
