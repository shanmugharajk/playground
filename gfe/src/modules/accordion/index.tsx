import { useState, type ReactNode } from 'react'
import clsx from 'clsx'

import './styles.css'

type AccordionItem = {
  value: string
  label: string
  content: ReactNode
}

let items: AccordionItem[] = [
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
    value: 'js',
    label: 'Java Script',
    content:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
]

function useActive(): [Set<string>, (value: string) => void] {
  let [activeTabs, setActiveTabs] = useState(new Set<string>())

  return [
    activeTabs,
    function (value: string) {
      setActiveTabs((prev) => {
        if (prev.has(value)) {
          prev.delete(value)
        } else {
          prev.add(value)
        }

        return new Set(prev)
      })
    },
  ]
}

export default function Accordion() {
  let [activeTab, setActiveTab] = useActive()

  return (
    <div className="accordion">
      {items.map((item) => {
        let isActive = activeTab.has(item.value)

        return (
          <div key={item.value} className="accordion-list-item">
            <button
              className="accordion-header"
              onClick={() => setActiveTab(item.value)}
            >
              <span>{item.label}</span>

              <span
                aria-hidden={true}
                className={clsx([
                  'accordion-icon',
                  isActive && 'accordion-icon--rotated',
                ])}
              />
            </button>

            <div className="accordion-content" hidden={!isActive}>
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
