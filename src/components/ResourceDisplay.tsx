import React from 'react';

type ResourceDisplayProps = {
  resourceName: string;
  resourceCount: number;
};

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resourceName, resourceCount }: ResourceDisplayProps) => {
  return (
    <div className="resource-display">
      <Header />
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">{resourceName}:</span>
        <span className="text-xl text-green-500">{resourceCount}</span>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div
      className="font-bold h-11 border-b border-gray-700 flex justify-between items-center px-4"
      style={{ height: '60px' }}
    >
      <div></div>
      <h1 className="text-white text-lg">Lisa</h1>
      <img
        src="/image/ewallet.png"
        alt="e-wallet"
        width={30}
        height={30}
        className="mr-4"
      />
    </div>
  );
};

export default ResourceDisplay;
