import submitForm from './send-data'

import styles from './styles.module.css'

export default function ContactForm() {
  return (
    <form
      action="https://www.greatfrontend.com/api/questions/contact-form"
      method="POST"
      className={styles.container}
      onSubmit={submitForm}
    >
      <div className={styles.fieldWrapper}>
        <label htmlFor="name">Name</label>
        <input
          className={styles.input}
          type="text"
          required
          name="name"
          id="name"
        />
      </div>

      <div className={styles.fieldWrapper}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          required
          name="email"
          id="email"
        />
      </div>

      <div className={styles.fieldWrapper}>
        <label htmlFor="message">Message</label>
        <textarea
          className={styles.input}
          required
          name="message"
          id="message"
        />
      </div>

      <footer>
        <input className={styles.sendButton} type="submit" value="Send" />
      </footer>
    </form>
  )
}
