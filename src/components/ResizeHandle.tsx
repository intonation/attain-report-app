import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/resize-handle.css';

interface ResizeHandleProps {
  onResize: (delta: number) => void;
  direction: 'horizontal' | 'vertical';
  position?: 'left' | 'right';
}

export const ResizeHandle = ({
  onResize,
  direction,
  position = 'right'
}: ResizeHandleProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY;
  }, [direction]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
      const delta = currentPos - startPosRef.current;

      // For left-positioned handles, invert the delta
      const adjustedDelta = position === 'left' ? -delta : delta;

      onResize(adjustedDelta);
      startPosRef.current = currentPos;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, direction, position, onResize]);

  return (
    <div
      className={`resizeHandle resizeHandle--${direction} resizeHandle--${position} ${isDragging ? 'resizeHandle--dragging' : ''}`}
      onMouseDown={handleMouseDown}
    >
      <div className="resizeHandle__line" />
    </div>
  );
};
