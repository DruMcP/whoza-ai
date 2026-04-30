export default function FinalDetailsStep({
  formData,
  setFormData,
  handleFieldChange,
}) {
  return (
    <>
      <p className="step-description">
        Final details (all optional)
      </p>

      <div className="form-field">
        <label htmlFor="credentials">
          Qualifications or certifications
        </label>
        <input
          id="credentials"
          type="text"
          placeholder="For example: Part P registered, 20 years experience, NICEIC approved"
          value={formData.credentials}
          onChange={(e) => handleFieldChange('credentials', e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="competitors">
          Who are your main local competitors?
        </label>
        <input
          id="competitors"
          type="text"
          placeholder="Names or websites, separated by commas"
          value={formData.competitors}
          onChange={(e) => handleFieldChange('competitors', e.target.value)}
        />
        <p className="field-hint">Helps us benchmark your online visibility</p>
      </div>

      <div className="founder-circle-box">
        <label className="founder-circle-label">
          <input
            type="checkbox"
            checked={formData.isFounder}
            onChange={(e) =>
              setFormData({ ...formData, isFounder: e.target.checked })
            }
          />
          <span>
            <strong>I'm interested in the Founders Circle</strong>
            <br />
            <span className="founder-circle-description">
              If spaces are available, you'll get 2 months free and
              then founder pricing (limited to 10 members).
            </span>
          </span>
        </label>
      </div>
    </>
  );
}
