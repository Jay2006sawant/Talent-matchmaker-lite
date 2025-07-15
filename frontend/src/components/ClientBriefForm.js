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

export default function ClientBriefForm({ onSubmit, onFormChange }) {
  const [form, setForm] = useState(initialState);
  const [validationMsg, setValidationMsg] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (onFormChange) onFormChange();
  };

  const handleMultiSelect = (name, value) => {
    setForm(f => {
      const arr = f[name].includes(value)
        ? f[name].filter(v => v !== value)
        : [...f[name], value];
      return { ...f, [name]: arr };
    });
    if (onFormChange) onFormChange();
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
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm mb-4" style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2 className="mb-3">Client Brief</h2>
      {validationMsg && <div className="alert alert-danger py-1 mb-2">{validationMsg}</div>}
      <div className="mb-3">
        <label className="form-label">Location</label>
        <select name="location" value={form.location} onChange={handleChange} required className="form-select">
          <option value="">Select</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Skills Required</label>
        <div className="d-flex flex-wrap gap-2">
          {skillsList.map(skill => (
            <div className="form-check me-2" key={skill}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={form.skills_required.includes(skill)}
                onChange={() => handleMultiSelect('skills_required', skill)}
                id={`skill-${skill}`}
              />
              <label className="form-check-label" htmlFor={`skill-${skill}`}>{skill}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Budget</label>
        <input
          type="number"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Style Preferences</label>
        <div className="d-flex flex-wrap gap-2">
          {styleList.map(style => (
            <div className="form-check me-2" key={style}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={form.style_preferences.includes(style)}
                onChange={() => handleMultiSelect('style_preferences', style)}
                id={`style-${style}`}
              />
              <label className="form-check-label" htmlFor={`style-${style}`}>{style}</label>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2 w-100">Find Matches</button>
    </form>
  );
} 