import { useEffect, useRef } from 'react'

let innerHTML = `<div id="root-container" style="color: rgb(255, 255, 255)">
  <span class="match" style="color: rgb(255, 255, 255)">
    <!-- Here's a comment -->
    Span
    <span class="match" style="color: rgb(255, 255, 255)">Span</span>
  </span>
  
  <p>Paragraph</p>
  
  <div>
    <span class="match" style="color: rgb(255, 255, 255)">Span</span>
  </div>
</div>`

export default function Js() {
  let elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elRef.current) {
      return
    }

    let result = getElementsByStyle(
      elRef.current.querySelector('#root-container')!,
      'color',
      'rgb(255, 255, 255)'
    )

    console.log(result)
  }, [])

  return (
    <div className="m-5 space-y-2">
      <div>
        <h1>Js demo - Please check the console!</h1>
      </div>

      <div className="rounded-md border bg-gray-700 p-2 px-4 text-sm">
        <div ref={elRef} dangerouslySetInnerHTML={{ __html: innerHTML }} />
      </div>
    </div>
  )
}

function getElementsByStyle(
  element: Element,
  property: string,
  value: string
): Array<Element> {
  let result: Element[] = []

  let getStyles = function (el: Element) {
    // can use element.style - but it won't give the style if the
    // html is not mounted to actual dom
    let computedStyle = getComputedStyle(el)
    if (computedStyle.getPropertyValue(property) === value) {
      result.push(el)
    }

    for (let ch of el.children) {
      getStyles(ch)
    }
  }

  // this will filter the given element
  for (let child of element.children) {
    getStyles(child)
  }

  return result
}
