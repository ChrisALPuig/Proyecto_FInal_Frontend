import React, { useState } from 'react';
import { verifyLogin2FA } from '../../services/twoFactorService.ts';
import { useLanguage } from '../../contexts/LanguageContext.tsx';
import './Verify2FA.css';

interface Verify2FAProps {
  email: string;
  onSuccess: (token: string, username: string, roles: string[]) => void;
  onCancel: () => void;
}

const Verify2FA: React.FC<Verify2FAProps> = ({ email, onSuccess, onCancel }) => {
  const { t } = useLanguage();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (code.length !== 6 || !/^[0-9]{6}$/.test(code)) {
      setError(t('codeMustBeSixDigits'));
      return;
    }

    setLoading(true);
    try {
      const data = await verifyLogin2FA({ email, code });
      onSuccess(data.token, data.username, data.roles);
    } catch (err: any) {
      setError(err.message || t('invalidCode'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-2fa-overlay" onClick={onCancel}>
      <div className="verify-2fa-container" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onCancel}>✕</span>
        <h2>{t('verify2FA')}</h2>
        <p>{t('verify2FADescription')}</p>

        <form className="verify-2fa-form" onSubmit={handleSubmit}>
          <label>{t('authenticationCode')}</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            disabled={loading}
          />

          {error && <div className="error-message">{error}</div>}

          <div className="verify-2fa-buttons">
            <button type="button" className="btn-skip" onClick={onCancel} disabled={loading}>
              {t('cancel')}
            </button>
            <button type="submit" className="btn-activate" disabled={loading || code.length !== 6}>
              {loading ? t('verifying') : t('verify')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify2FA;
