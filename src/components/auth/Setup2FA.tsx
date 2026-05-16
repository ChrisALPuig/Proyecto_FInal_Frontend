import React, { useState, useEffect } from 'react';
import { generate2FAQR, verify2FACode } from '../../services/twoFactorService.ts';
import { useLanguage } from '../../contexts/LanguageContext.tsx';
import './Setup2FA.css';

interface Setup2FAProps {
  token: string;
  email: string;
  onComplete: () => void;
  onSkip: () => void;
}

const Setup2FA: React.FC<Setup2FAProps> = ({ token, email, onComplete, onSkip }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1); // 1: preguntar, 2: mostrar QR, 3: validar código
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleActivate2FA = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await generate2FAQR(token);
      // Agregar el prefijo data URI si el QR es base64
      const qrWithPrefix = data.qr.startsWith('data:') ? data.qr : `data:image/png;base64,${data.qr}`;
      setQrCode(qrWithPrefix);
      setSecret(data.secret);
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6 || !/^\d+$/.test(code)) {
      setError(t('codeMustBeSixDigits'));
      return;
    }

    setLoading(true);
    setError('');
    try {
      await verify2FACode(token, code);
      setStep(3); // success
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-2fa-overlay">
      <div className="setup-2fa-container">
        {step === 1 && (
          <>
            <h2>{t('setup2FA')}</h2>
            <p>{t('setup2FADescription')}</p>
            <div className="setup-2fa-buttons">
              <button className="btn-skip" onClick={onSkip} disabled={loading}>
                {t('notNow')}
              </button>
              <button className="btn-activate" onClick={handleActivate2FA} disabled={loading}>
                {loading ? t('loading') : t('activate2FAButton')}
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>{t('scanQRCode')}</h2>
            <p>{t('useAuthenticator')}</p>
            {qrCode && (
              <div className="qr-container">
                <img src={qrCode} alt="2FA QR Code" className="qr-code" />
              </div>
            )}
            <p className="secret-text">
              {t('copyManually')} <code>{secret}</code>
            </p>
            <div className="code-input">
              <input
                type="text"
                placeholder={t('enterSixDigitCode')}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                disabled={loading}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="setup-2fa-buttons">
              <button className="btn-skip" onClick={onSkip} disabled={loading}>
                {t('cancel')}
              </button>
              <button className="btn-activate" onClick={handleVerifyCode} disabled={loading || code.length !== 6}>
                {loading ? t('verifying') : t('confirmButton')}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>{t('twoFAActivated')}</h2>
            <p>{t('accountProtected')}</p>
            <div className="success-message">
              {t('setupCompletedSuccessfully')}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Setup2FA;
