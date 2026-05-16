import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../../services/userService";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./ResetPassword.css";

interface LocationState {
  token?: string;
}

const ResetPassword: React.FC = () => {
  const { t } = useLanguage();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(t("invalidOrExpiredToken"));
    }
  }, [token, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError(t("pleaseCompleteAllFields"));
      return;
    }

    if (newPassword.length < 8) {
      setError(t("minimumCharacters"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      return;
    }

    if (!token) {
      setError(t("invalidToken"));
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ token, newPassword });
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || t("errorResettingPassword"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h1>{t("resetPasswordTitle")}</h1>

        {success && (
          <div className="success-message-reset">
            {t("passwordResetSuccessfully")}
          </div>
        )}

        {error && <div className="error-message-reset">{error}</div>}

        {!success && token && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="newPassword">{t("newPassword")}</label>
              <div className="password-input-group">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t("enterNewPassword")}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                  disabled={loading}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <small>{t("minimumCharacters")}</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">{t("confirmPassword")}</label>
              <div className="password-input-group">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("confirmYourPassword")}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password"
                  disabled={loading}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="reset-submit-btn">
              {loading ? t("resetting") : t("resetPasswordButton")}
            </button>
          </form>
        )}

        {!token && (
          <button onClick={() => history.push("/login")} className="back-to-login-btn">
            {t("backToLoginButton")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
