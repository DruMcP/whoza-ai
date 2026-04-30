export default function BusinessDetailsStep({
  formData,
  setFormData,
  touched,
  setTouched,
  fieldErrors,
  setFieldErrors,
  getFieldStatus,
  handleFieldChange,
  handleFieldBlur,
}) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="businessName">
          Business name <span className="required-indicator">*</span>
        </label>
        <div className="input-wrapper">
          <input
            id="businessName"
            type="text"
            value={formData.businessName}
            onChange={(e) => handleFieldChange('businessName', e.target.value)}
            onBlur={() => handleFieldBlur('businessName')}
            className={`input-with-validation ${getFieldStatus('businessName')}`}
            required
          />
          {getFieldStatus('businessName') && (
            <span className={`validation-icon ${getFieldStatus('businessName')}`}>
              {getFieldStatus('businessName') === 'success' ? '✓' : '✕'}
            </span>
          )}
        </div>
        {touched.businessName && fieldErrors.businessName && (
          <p className="field-error error">{fieldErrors.businessName}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="tradeType">
          What trade are you? <span className="required-indicator">*</span>
        </label>
        <div className="input-wrapper">
          <select
            id="tradeType"
            name="tradeType"
            value={formData.tradeType}
            onChange={(e) => handleFieldChange('tradeType', e.target.value)}
            onBlur={() => handleFieldBlur('tradeType')}
            className={`input-with-validation ${getFieldStatus('tradeType')}`}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '15px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="">Select your trade...</option>
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="decorator">Decorator / Painter</option>
            <option value="carpenter">Carpenter / Joiner</option>
            <option value="roofer">Roofer</option>
            <option value="builder">Builder</option>
            <option value="plasterer">Plasterer</option>
            <option value="landscaper">Landscaper / Gardener</option>
            <option value="locksmith">Locksmith</option>
            <option value="heating_engineer">Heating Engineer / Gas Fitter</option>
            <option value="tiler">Tiler</option>
            <option value="flooring">Flooring Specialist</option>
            <option value="kitchen_fitter">Kitchen Fitter</option>
            <option value="bathroom_fitter">Bathroom Fitter</option>
            <option value="handyman">Handyman / General</option>
            <option value="other">Other</option>
          </select>
          {getFieldStatus('tradeType') && (
            <span className={`validation-icon ${getFieldStatus('tradeType')}`}>
              {getFieldStatus('tradeType') === 'success' ? '✓' : '✕'}
            </span>
          )}
        </div>
        {touched.tradeType && fieldErrors.tradeType && (
          <p className="field-error error">{fieldErrors.tradeType}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="postcode">
          Postcode <span className="required-indicator">*</span>
        </label>
        <div className="input-wrapper">
          <input
            id="postcode"
            type="text"
            placeholder="For example: SW1A 1AA"
            value={formData.postcode}
            onChange={(e) => handleFieldChange('postcode', e.target.value)}
            onBlur={() => handleFieldBlur('postcode')}
            className={`input-with-validation ${getFieldStatus('postcode')}`}
            required
            maxLength={8}
          />
          {getFieldStatus('postcode') && (
            <span className={`validation-icon ${getFieldStatus('postcode')}`}>
              {getFieldStatus('postcode') === 'success' ? '✓' : '✕'}
            </span>
          )}
        </div>
        {touched.postcode && fieldErrors.postcode && (
          <p className="field-error error">{fieldErrors.postcode}</p>
        )}
        {!fieldErrors.postcode && (
          <p className="field-hint">Automatically formatted as you type</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="serviceArea">
          Where do you work? <span style={{color: 'var(--text-secondary)', fontWeight: 'normal'}}>(optional)</span>
        </label>
        <div className="input-wrapper">
          <input
            id="serviceArea"
            type="text"
            placeholder="For example: West London, or 10 mile radius of Reading"
            value={formData.serviceArea}
            onChange={(e) => handleFieldChange('serviceArea', e.target.value)}
            onBlur={() => handleFieldBlur('serviceArea')}
            className={`input-with-validation ${getFieldStatus('serviceArea')}`}
          />
          {getFieldStatus('serviceArea') && (
            <span className={`validation-icon ${getFieldStatus('serviceArea')}`}>
              {getFieldStatus('serviceArea') === 'success' ? '✓' : '✕'}
            </span>
          )}
        </div>
        {touched.serviceArea && fieldErrors.serviceArea && (
          <p className="field-error error">{fieldErrors.serviceArea}</p>
        )}
      </div>
    </>
  );
}
