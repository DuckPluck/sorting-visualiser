import classNames from 'classnames';
import React, { ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';

import './SortVisualiser.scss';


interface Props {
  className?: string;
  elCount: number;
  min: number;
  max: number;
  sortRenderFn: (
    arr: number[],
    colorChange: (idx: number) => void,
    action: React.Dispatch<SetStateAction<number[]>>
  ) => void;
}

const resetArray = (elCount: number, min: number, max: number) => {
  const array = [];
  for (let i = 0; i < elCount; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return array;
};

const SortVisualiser = ({ className, max, min, elCount, sortRenderFn }: Props) => {
  const blockClassName = classNames('sort-visualiser', className);
  const [array, setArray] = useState<number[]>([]);
  const containerRef = useRef<ReactNode | HTMLDivElement>(null!);

  useEffect(() => {
    setArray(resetArray(elCount, min, max));
  }, []);

  const barColorChange = (idx: number) => {
    const arrBars = containerRef.current.children;
    const barStyle = arrBars[idx].style;
    setTimeout(() => {
      barStyle.backgroundColor = "red";
    }, 4);
    setTimeout(() => {
      barStyle.backgroundColor = "";
    }, 8);
  };

  return (
    <div className={blockClassName} ref={containerRef}>
      {array.map((el, i) => (
        <div className="sort-visualiser__bar" key={i} style={{ height: el }}>{el}</div>
      ))}
      <button onClick={() => sortRenderFn(array, barColorChange, setArray)}>sort</button>
      <button onClick={() => console.log(array)}>log</button>
    </div>
  );
};

export default SortVisualiser;
