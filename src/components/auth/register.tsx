import { IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import { AUTH_ENDPOINTS } from "../../config/apiConfig";
import Setup2FA from "./Setup2FA";
import "./register.css";

interface RegisterResponse {
  token: string;
  username: string;
  roles: string[];
  user: { id: number; email: string; username: string };
}

interface RegisterProps {
  isModal?: boolean;
  onClose?: () => void;
}

const Register: React.FC<RegisterProps> = ({ isModal = false, onClose }) => {
  const history = useHistory();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldsError, setFieldsError] = useState({ email: false, username: false, password: false });
  const [showSetup2FA, setShowSetup2FA] = useState(false);
  const [token, setToken] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación de campos vacíos
    const newFieldsError = { email: !email, username: !username, password: !password };
    setFieldsError(newFieldsError);

    if (newFieldsError.email || newFieldsError.username || newFieldsError.password) {
      setError(t("pleaseCompleteAllFields"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${AUTH_ENDPOINTS.REGISTER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        const text = await res.text();

        let friendlyMessage = t("serverError");
        if (res.status === 400) {
          // El servidor devuelve el mensaje directamente si está bien formado
          friendlyMessage = text || t("invalidData");
        } else if (res.status === 500) {
          friendlyMessage = t("serverError");
        }

        throw new Error(friendlyMessage);
      }

      const data: RegisterResponse = await res.json();
      console.log("Registro exitoso:", data);

      // Guardar el token y autenticar localmente
      login(data.token, data.username, data.roles);
      setToken(data.token);
      setRegisteredEmail(data.user.email);
      console.log('register token stored', data.token);
      console.log('localStorage token after login', localStorage.getItem('token'));

      // Mostrar Setup2FA
      setShowSetup2FA(true);
    } catch (err: any) {
      console.error("Error en registro:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetup2FAComplete = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      history.push("/login");
    }
  };

  const handleSetup2FASkip = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      history.push("/login");
    }
  };

  if (showSetup2FA) {
    return (
      <Setup2FA
        token={token}
        email={registeredEmail}
        onComplete={handleSetup2FAComplete}
        onSkip={handleSetup2FASkip}
      />
    );
  }

  const handleClose = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      history.push("/home");
    }
  };

  return (
    <IonPage>
      <div className="register-page">
        <form className="register-form" onSubmit={handleSubmit}>
          <span className="close-btn" onClick={handleClose}>✕</span>
          <h1>{t("signUp")}</h1>

          {error && <div className="error-message">{error}</div>}

          <label>{t("email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldsError.email ? "input-error" : ""}
          />

          <label>{t("username")}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={fieldsError.username ? "input-error" : ""}
          />

          <label>{t("password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldsError.password ? "input-error" : ""}
          />

          <button type="submit" disabled={loading} className="register-btn">
            {loading ? (
              <>
                <span className="spinner"></span>
                {t("registering")}
              </>
            ) : (
              t("signUp")
            )}
          </button>

          <p className="login-link">
            {t("alreadyHaveAccount")} <a href="/login">{t("signIn")}</a>
          </p>
        </form>
      </div>
    </IonPage>
  );
};

export default Register;