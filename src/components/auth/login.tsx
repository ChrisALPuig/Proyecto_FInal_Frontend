import { IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import { AUTH_ENDPOINTS } from "../../config/apiConfig";
import Verify2FA from "./Verify2FA";
import ForgotPassword from "./ForgotPassword";
import { verifyLogin2FA } from "../../services/twoFactorService.ts";
import "./login.css";

interface LoginProps {
  isModal?: boolean;
  onClose?: () => void;
}

interface PendingAuth {
  email: string;
  username: string;
  roles: string[];
}

const Login: React.FC<LoginProps> = ({ isModal = false, onClose }) => {
  const history = useHistory();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldsError, setFieldsError] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [pendingAuth, setPendingAuth] = useState<PendingAuth | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const newFieldsError = { email: !email, password: !password };
    setFieldsError(newFieldsError);

    if (newFieldsError.email || newFieldsError.password) {
      setError(t("pleaseCompleteAllFields"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${AUTH_ENDPOINTS.LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let friendlyMessage = t("serverError");
        if (res.status === 401 || res.status === 403) {
          friendlyMessage = t("invalidCredentials");
        } else if (res.status === 400) {
          friendlyMessage = t("invalidData");
        } else if (res.status === 500) {
          friendlyMessage = t("serverError");
        }
        throw new Error(friendlyMessage);
      }

      const data = await res.json();

      if (data.twoFactorRequired) {
        setPendingAuth({ email, username: data.username, roles: data.roles });
        setTwoFARequired(true);
        setLoading(false);
        return;
      }

      login(data.token, data.username, data.roles);
      if (isModal && onClose) {
        onClose();
      } else {
        history.push("/home");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handle2FASuccess = (token: string, username: string, roles: string[]) => {
    login(token, username, roles);
    setTwoFARequired(false);
    setPendingAuth(null);
    if (isModal && onClose) {
      onClose();
    } else {
      history.push("/home");
    }
  };

  const handle2FACancel = () => {
    setTwoFARequired(false);
    setPendingAuth(null);
  };

  const handleClose = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      history.push("/home");
    }
  };

  return (
    <IonPage>
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="close-btn" onClick={handleClose}>✕</span>
          <h1>{t("signIn")}</h1>

          {error && <div className="error-message">{error}</div>}

          <label>{t("email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldsError.email ? "input-error" : ""}
            disabled={loading}
          />

          <label>{t("password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldsError.password ? "input-error" : ""}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? t("loggingIn") : t("login")}
          </button>

          <p className="forgot-password-link-text">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="forgot-password-link-btn"
            >
              {t("forgotYourPassword")}
            </button>
          </p>

          <p className="signup-link">
            {t("dontHaveAccount")} <a href="/register">{t("signUp")}</a>
          </p>
        </form>
      </div>

      {twoFARequired && pendingAuth && (
        <Verify2FA
          email={pendingAuth.email}
          onSuccess={handle2FASuccess}
          onCancel={handle2FACancel}
        />
      )}

      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </IonPage>
  );
};

export default Login;