import { useState } from 'react';

export default function Contact() {
  const [vals, setVals] = useState({ name: '', email: '', comment: '' });
  const [errs, setErrs] = useState({});

  const validate = () => {
    const e = {};
    if (!vals.name.trim()) e.name = 'Name required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = 'Valid email required';
    if (vals.comment.trim().length < 10) e.comment = 'Please add more detail (10+ chars)';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) alert('Thanks! We will reach out soon.');
  };

  return (
    <form className="contact" onSubmit={submit} noValidate>
      <h2>Contact</h2>
      <label>Name<input value={vals.name} onChange={e=>setVals({...vals, name:e.target.value})}/>{errs.name && <span className="err">{errs.name}</span>}</label>
      <label>Email<input value={vals.email} onChange={e=>setVals({...vals, email:e.target.value})}/>{errs.email && <span className="err">{errs.email}</span>}</label>
      <label>Comment<textarea rows="4" value={vals.comment} onChange={e=>setVals({...vals, comment:e.target.value})}/>{errs.comment && <span className="err">{errs.comment}</span>}</label>
      <button type="submit">Send</button>
    </form>
  );
}
