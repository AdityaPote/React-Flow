import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNode = ({ data }) => {
  return (
    <>
      <NodeResizer minWidth={120} minHeight={50} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10,backgroundColor:'white',color:'black',width:'100%',height:'100%',textAlign:'center',display:'grid',placeContent:'center',minHeight:30,minWidth:120}}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(ResizableNode);