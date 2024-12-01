// https://tailwindcomponents.com/component/radio-buttons-1
'use client'

import { useState } from "react"

interface Props {
  tabsOptions?: number[],
  currentTab?: number
}

export const TabBar = ({ tabsOptions = [1, 2, 3, 4, 5], currentTab = 1 }: Props) => {

  const [selected, setselected] = useState(currentTab);

  const onSelected = (tab: number) => {
    setselected(tab);
  }

  return (
    <div className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2
      ${'grid-cols-' + tabsOptions.length} 
    `}>

      {
        tabsOptions.map(tab => (
          <div key={tab}>
            <input
              checked={selected === tab}
              type="radio"
              onChange={() => { }}
              id={tab.toString()}
              className="peer hidden"
            />
            <label
              onClick={() => onSelected(tab)}
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              {tab}
            </label>
          </div>
        ))
      }

    </div>
  )
}