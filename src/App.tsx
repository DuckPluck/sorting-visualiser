import SortVisualiser from './components/SortVisualiser/SortVisualiser';

import './App.scss'
import React, { SetStateAction } from 'react';


const swap = (i1: number, i2: number, arr: number[]) => {
  const temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
};

const getBubbleSortChanges = (array: number[]) => {
  const changeList = [];
  const arr = array.slice();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      changeList.push([[j - 1, i], false]);
      if (arr[j - 1] > arr[i]) {
        swap(j - 1, i, arr);
        changeList.push([[j - 1, i], true]);
      }
    }
  }
  return changeList;
};

const bubbleSortRender = (
  array: number[],
  colorChange: (idx: number) => void,
  action: React.Dispatch<SetStateAction<number[]>>
) => {
  const changeList = getBubbleSortChanges(array);
  changeList.forEach(([comparison, isSwapped], idx) => {
    setTimeout(() => {
      const [i, j] = comparison;
      if (!isSwapped) {
        colorChange(i);
        colorChange(j);
      } else {
        action(prevArr => {
          const newArr = [...prevArr];
          swap(i, j, newArr);
          return newArr;
        });
      }
    }, idx * 4);
  })
}

function App() {

  return (
    <div className="app">
      <SortVisualiser elCount={100} max={900} min={5} sortRenderFn={bubbleSortRender} />
    </div>
  )
}

export default App;
