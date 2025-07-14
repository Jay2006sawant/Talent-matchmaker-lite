import React, { useState } from 'react';

const initialState = {
  location: '',
  skills_required: [],
  budget: '',
  style_preferences: []
};

const skillsList = ['portrait', 'pastel', 'wedding', 'fashion', 'editorial', 'travel', 'landscape', 'candid'];
const styleList = ['candid', 'natural light', 'studio', 'bold', 'outdoor', 'vivid'];
const locations = ['Goa', 'Mumbai'];

export default function ClientBriefForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [validationMsg, setValidationMsg] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleMultiSelect = (name, value) => {
    setForm(f => {
      const arr = f[name].includes(value)
        ? f[name].filter(v => v !== value)
        : [...f[name], value];
      return { ...f, [name]: arr };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.location) {
      setValidationMsg('Please select a location.');
      return;
    }
    if (!form.budget) {
      setValidationMsg('Please enter a budget.');
      return;
    }
    setValidationMsg('');
    onSubmit({
      ...form,
      budget: Number(form.budget)
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Client Brief</h2>
      {validationMsg && <div style={{ color: 'red', marginBottom: 8 }}>{validationMsg}</div>}
      <label>Location:
        <select name="location" value={form.location} onChange={handleChange} required>
          <option value="">Select</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </label>
      <br />
      <label>Skills Required:</label>
      <div>
        {skillsList.map(skill => (
          <label key={skill} style={{ marginRight: 8 }}>
            <input
              type="checkbox"
              checked={form.skills_required.includes(skill)}
              onChange={() => handleMultiSelect('skills_required', skill)}
            /> {skill}
          </label>
        ))}
      </div>
      <label>Budget:
        <input
          type="number"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>Style Preferences:</label>
      <div>
        {styleList.map(style => (
          <label key={style} style={{ marginRight: 8 }}>
            <input
              type="checkbox"
              checked={form.style_preferences.includes(style)}
              onChange={() => handleMultiSelect('style_preferences', style)}
            /> {style}
          </label>
        ))}
      </div>
      <button type="submit" style={{ marginTop: 16 }}>Find Matches</button>
    </form>
  );
} 