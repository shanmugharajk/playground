import './styles.css'

export default function HolyGrailFlex() {
  return (
    <div className="HolyGrail__container">
      <header className="HolyGrail__header">Header</header>

      <div className="HolyGrail__content">
        <nav>Navigation</nav>
        <main>Main</main>
        <aside>Sidebar</aside>
      </div>

      <footer className="HolyGrail__footer">Footer</footer>
    </div>
  )
}
