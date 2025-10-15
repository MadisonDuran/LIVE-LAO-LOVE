import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
    if (!form.comment.trim()) errs.comment = "Comment required";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // You can handle form submission here
      alert("Form submitted!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <div className="error">{errors.name}</div>}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <div className="error">{errors.email}</div>}
      <textarea
        placeholder="Comment"
        value={form.comment}
        onChange={e => setForm({ ...form, comment: e.target.value })}
      />
      {errors.comment && <div className="error">{errors.comment}</div>}
      <button type="submit">Send</button>
    </form>
  );
}