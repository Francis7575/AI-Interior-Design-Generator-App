'use client'
import { ReactNode, useState } from 'react';

type ToolTipProps = {
  children: ReactNode
  text: string
}

const Tooltip = ({ children, text }: ToolTipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      onMouseEnter={() => setVisible(true)} 
      onMouseLeave={() => setVisible(false)} 
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {visible && (
        <div 
          style={{
            position: 'absolute',
            backgroundColor: 'black',
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            top: '35px', 
            fontSize: '.8rem',
            right: '-5px',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip