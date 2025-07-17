import React, { useState } from 'react';

const initialState = {
  location: '',
  skills_required: [],
  budget: '',
  style_preferences: [],
  remoteOnly: false
};

const skillsList = ['portrait', 'pastel', 'wedding', 'fashion', 'editorial', 'travel', 'landscape', 'candid'];
const styleList = ['candid', 'natural light', 'studio', 'bold', 'outdoor', 'vivid'];
const locations = ['Goa', 'Mumbai'];

export default function ClientBriefForm({ onSubmit, onFormChange }) {
  const [form, setForm] = useState(initialState);
  const [validationMsg, setValidationMsg] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
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
    <div className="form-container fade-in-up">
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <h2>Project Brief</h2>
          <p className="text-secondary">Tell us about your project requirements</p>
        </div>
        
        {validationMsg && (
          <div className="card mb-3" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <div className="text-center text-secondary">
              <p>{validationMsg}</p>
            </div>
          </div>
        )}
        
        <div className="form-section">
          <label className="form-label" htmlFor="locationSelect">Location</label>
          <select 
            name="location" 
            value={form.location} 
            onChange={handleChange} 
            required 
            id="locationSelect"
            className="form-select"
          >
            <option value="">Select a location</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <div className="text-secondary mt-1">Where is your project based?</div>
        </div>

        <div className="form-section">
          <label className="form-label">Skills Required</label>
          <div className="checkbox-grid">
            {skillsList.map(skill => (
              <div className="checkbox-item" key={skill}>
                <input
                  type="checkbox"
                  checked={form.skills_required.includes(skill)}
                  onChange={() => handleMultiSelect('skills_required', skill)}
                  id={`skill-${skill}`}
                />
                <label htmlFor={`skill-${skill}`} className="mb-0">{skill}</label>
              </div>
            ))}
          </div>
          <div className="text-secondary mt-1">Select all that apply.</div>
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="budgetInput">Budget</label>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
            id="budgetInput"
            placeholder="Enter your budget in INR"
            className="form-input"
          />
          <div className="text-secondary mt-1">Enter your budget in INR (e.g., 75000).</div>
        </div>

        <div className="form-section">
          <label className="form-label">Style Preferences</label>
          <div className="checkbox-grid">
            {styleList.map(style => (
              <div className="checkbox-item" key={style}>
                <input
                  type="checkbox"
                  checked={form.style_preferences.includes(style)}
                  onChange={() => handleMultiSelect('style_preferences', style)}
                  id={`style-${style}`}
                />
                <label htmlFor={`style-${style}`} className="mb-0">{style}</label>
              </div>
            ))}
          </div>
          <div className="text-secondary mt-1">Choose the style(s) you prefer for your project.</div>
        </div>

        <div className="form-section">
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="remoteOnly"
              id="remoteOnly"
              checked={form.remoteOnly}
              onChange={handleChange}
            />
            <label htmlFor="remoteOnly" className="mb-0">Remote Only</label>
          </div>
          <div className="text-secondary mt-1">Check to include only creators available for remote work.</div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Find Matches
        </button>
      </form>
    </div>
  );
} 