import React, { useState, memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import UpdateNodeModal from './UpdateNodeModal';

const CustomNodeComponent = ({ id, data, onDelete, onNodeUpdate }) => {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleNodeClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleUpdateNode = useCallback(
    (newLabel) => {
      onNodeUpdate(id, newLabel);
    },
    [id, onNodeUpdate]
  );

  return (
    <>
      <div
        onClick={handleNodeClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          background: '#fff',
          cursor: 'pointer',
        }}
      >
        {data.label}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'red',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              cursor: 'pointer',
            }}
            onClick={() => onDelete(id)}
          >
            X
          </div>
        )}
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
      <div className='relative'>
      <UpdateNodeModal
        isOpen={showModal}
        onClose={handleModalClose}
        onUpdate={handleUpdateNode}
        initialLabel={data.label}
      />
      </div>
    </>
  );
};

const CustomNode = memo(CustomNodeComponent);

export default CustomNode;