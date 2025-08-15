import React from 'react';

type ResourceDisplayProps = {
  resourceName: string;
  resourceCount: number;
};

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resourceName, resourceCount }: ResourceDisplayProps) => {
  return (
    <div className="resource-display">
      <span>{resourceName}: </span>
      <span>{resourceCount}</span>
    </div>
  );
};

export default ResourceDisplay;
