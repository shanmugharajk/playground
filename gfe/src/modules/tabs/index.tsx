import { useState, type ReactNode } from 'react'
import clsx from 'clsx'

import './styles.css'

type TabItem<TValue = string> = {
  value: TValue
  label: string
  content: ReactNode
}

type Props = {
  items: TabItem[]
}

function Tabs({ items }: Props) {
  let [activeTab, setActiveTab] = useState(items[0].value)

  return (
    <div className="Tab__container">
      {/* tab headers */}
      <div className="Tab__header">
        {items.map((item) => (
          <button
            key={item.value}
            className={clsx([
              'Tab__item',
              activeTab === item.value && 'Tab__item-active',
            ])}
            onClick={() => setActiveTab(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* content */}
      <div>
        {items.map((item) => (
          <div key={item.value} hidden={activeTab !== item.value}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

let tabItems: TabItem[] = [
  {
    value: 'html',
    label: 'HTML',
    content:
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
  },
  {
    value: 'css',
    label: 'CSS',
    content:
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
  },
  {
    value: 'javascript',
    label: 'JavaScript',
    content:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
]

export default function TabsDemo() {
  return <Tabs items={tabItems} />
}
