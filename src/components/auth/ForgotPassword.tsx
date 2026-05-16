import React, { useState } from "react";
import { forgotPassword } from "../../services/userService";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./ForgotPassword.css";

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError(t("enterEmailError"));
      return;
    }

    setLoading(true);
    try {
      await forgotPassword({ email });
      setSuccess(true);
      setEmail("");
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || t("sendEmailError"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="forgot-password-overlay">
      <div className="forgot-password-modal">
        <button className="forgot-password-close" onClick={onClose}>
          ✕
        </button>

        <h2>{t("resetPassword")}</h2>
        <p className="forgot-password-subtitle">
          {t("resetPasswordSubtitle")}
        </p>

        {success && (
          <div className="success-message">
            {t("recoveryLinkSent")}
          </div>
        )}

        {error && <div className="forgot-password-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">{t("email")}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("enterEmail")}
            disabled={loading || success}
          />

          <button type="submit" disabled={loading || success}>
            {loading ? t("sending") : success ? t("sent") : t("sendLink")}
          </button>
        </form>

        <p className="forgot-password-cancel">
          {t("rememberedPassword")}{" "}
          <button type="button" onClick={onClose} className="forgot-password-link">
            {t("backToLogin")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
