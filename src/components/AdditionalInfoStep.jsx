export default function AdditionalInfoStep({
  formData,
  handleFieldChange,
  handleFieldBlur,
  touched,
  fieldErrors,
  getFieldStatus,
}) {
  return (
    <>
      <p className="step-description">
        Help Rex understand your business better (all optional)
      </p>

      <div className="form-field">
        <label htmlFor="websiteUrl">Website (if you have one)</label>
        <div className="input-wrapper">
          <input
            id="websiteUrl"
            type="url"
            placeholder="https://example.com"
            value={formData.websiteUrl}
            onChange={(e) => handleFieldChange('websiteUrl', e.target.value)}
            onBlur={() => handleFieldBlur('websiteUrl')}
            className={`input-with-validation ${getFieldStatus('websiteUrl')}`}
          />
          {getFieldStatus('websiteUrl') && (
            <span className={`validation-icon ${getFieldStatus('websiteUrl')}`}>
              {getFieldStatus('websiteUrl') === 'success' ? '✓' : '✕'}
            </span>
          )}
        </div>
        {touched.websiteUrl && fieldErrors.websiteUrl && (
          <p className="field-error error">{fieldErrors.websiteUrl}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="googleBusinessUrl">
          Google Business Profile URL (if you have one)
        </label>
        <div className="input-wrapper">
          <input
            id="googleBusinessUrl"
            type="url"
            placeholder="https://g.page/..."
            value={formData.googleBusinessUrl}
            onChange={(e) => handleFieldChange('googleBusinessUrl', e.target.value)}
            onBlur={() => handleFieldBlur('googleBusinessUrl')}
            className={`input-with-validation ${getFieldStatus('googleBusinessUrl')}`}
          />
          {getFieldStatus('googleBusinessUrl') && (
            <span className={`validation-icon ${getFieldStatus('googleBusinessUrl')}`}>
              {getFieldStatus('googleBusinessUrl') === 'success' ? '✓' : '✕'}
            </span>
          )}
        </div>
        {touched.googleBusinessUrl && fieldErrors.googleBusinessUrl && (
          <p className="field-error error">{fieldErrors.googleBusinessUrl}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="keyServices">Main services you offer</label>
        <input
          id="keyServices"
          type="text"
          placeholder="Separate with commas, like: rewiring, fuse boxes, emergency callouts"
          value={formData.keyServices}
          onChange={(e) => handleFieldChange('keyServices', e.target.value)}
        />
        <p className="field-hint">Separate multiple services with commas</p>
      </div>
    </>
  );
}
