const SUBMIT_URL = 'https://www.greatfrontend.com/api/questions/contact-form'

export default async function submitForm(
  event: React.SyntheticEvent<HTMLFormElement>
) {
  event.preventDefault()
  const form = event.target as HTMLFormElement

  try {
    if (form.action !== SUBMIT_URL) {
      alert('Incorrect form action value')
      return
    }

    if (form.method.toLowerCase() !== 'post') {
      alert('Incorrect form method value')
      return
    }

    const formData = new FormData(form)

    const response = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    })

    const text = await response.text()
    alert(text)
  } catch (e) {
    console.log(e)
    alert('Error submitting form!')
  }
}
