import { useState } from 'react';

export default function Contact() {
  const [vals, setVals] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    country: ''
  });
  const [errs, setErrs] = useState({});

  const validate = () => {
    const e = {};
    if (!vals.firstName.trim()) e.firstName = 'First name required';
    if (!vals.lastName.trim()) e.lastName = 'Last name required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = 'Valid email required';
    if (!vals.message.trim() || vals.message.trim().length < 10) e.message = 'Please enter a message (10+ chars)';
    if (!vals.country.trim()) e.country = 'Country required';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const errors = validate();
    setErrs(errors);
    if (Object.keys(errors).length === 0) {
      alert("Thanks! We will reach out soon.");
      setVals({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        country: ''
      });
      setErrs({});
    }
  };

  return (
    <div>
      <div className="pattern-divider"></div>
      <section className="contact-form">
        <h2>We'd Love to Hear From You!</h2>
        <form id="contact-form" className="contact-form" onSubmit={submit} noValidate>
          <label className="contact-form__label">
            First Name:
            <input
              className="contact-form__input"
              type="text"
              name="firstName"
              value={vals.firstName}
              onChange={e => setVals({ ...vals, firstName: e.target.value })}
            />
            {errs.firstName && <span className="contact-form__error">{errs.firstName}</span>}
          </label>
          <label className="contact-form__label">
            Last Name:
            <input
              className="contact-form__input"
              type="text"
              name="lastName"
              value={vals.lastName}
              onChange={e => setVals({ ...vals, lastName: e.target.value })}
            />
            {errs.lastName && <span className="contact-form__error">{errs.lastName}</span>}
          </label>
          <label className="contact-form__label">
            Email:
            <input
              className="contact-form__input"
              type="email"
              name="email"
              value={vals.email}
              onChange={e => setVals({ ...vals, email: e.target.value })}
            />
            {errs.email && <span className="contact-form__error">{errs.email}</span>}
          </label>
          <label className="contact-form__label">
            Message:
            <textarea
              className="contact-form__input"
              name="message"
              value={vals.message}
              onChange={e => setVals({ ...vals, message: e.target.value })}
            />
            {errs.message && <span className="contact-form__error">{errs.message}</span>}
          </label>
          <label className="contact-form__label">
            Country:
            <input
              className="contact-form__input"
              type="text"
              name="country"
              value={vals.country}
              onChange={e => setVals({ ...vals, country: e.target.value })}
            />
            {errs.country && <span className="contact-form__error">{errs.country}</span>}
          </label>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>
    </div>
  );
}
