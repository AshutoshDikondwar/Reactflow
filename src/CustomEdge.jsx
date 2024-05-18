import { BaseEdge, EdgeLabelRenderer, getStraightPath, useReactFlow } from 'reactflow';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath}  style={{stroke:'#492E87'}} /> {/* Add stroke prop here */}
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan bg-[#404258] text-white font-bold py-1 px-3 rounded-md shadow-md hover:bg-[#50577A] transition duration-300"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          Delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
}