import { Tab } from "@headlessui/react";
import clsx from "clsx";

export default function Tabs({ items, children, className }) {
  return (
    <Tab.Group>
      <Tab.List className={`flex font-medium whitespace-nowrap border-b border-neutral-200 dark:border-neutral-800 ${className}`}>
        <div className="flex gap-x-6">
          {items.map((item, index) => (
            <Tab key={index + 1} className={({ selected }) =>
              clsx(
                'tracking-wide w-full py-2 text-sm font-semibold transition-all',
                'text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200',
                'border-b-2 border-transparent',
                selected ? '!text-emerald-600 border-b-2 !border-emerald-600 dark:!border-emerald-500 dark:!text-emerald-500' : ''
              )
            }
            >
              {item}
            </Tab>
          ))}
        </div>
      </Tab.List>
      <Tab.Panels className="mt-2">
        {children}
      </Tab.Panels>
    </Tab.Group>
  )
}

Tabs.panel = ({ children, className }) => {
  return (
    <>
      <Tab.Panel className={`rounded-xl py-2 text-neutral-700 dark:text-neutral-200 ${className}`}>
        {children}
      </Tab.Panel>
    </>
  )
}