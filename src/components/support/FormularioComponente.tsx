import { IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SupportHeader from "./SupportHeader.tsx";
import "./FormularioComponente.css";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useNotification } from "../../contexts/NotificationContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import { API_ENDPOINTS } from "../../config/apiConfig.ts";
import { getUserProfile } from "../../services/userService.ts";

const FormularioComponente: React.FC = () => {
  const history = useHistory();
  const { token } = useAuth();
  const { addNotification } = useNotification();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileId, setProfileId] = useState<number | null>(null);
  const [orderId, setOrderId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [attachmentError, setAttachmentError] = useState("");

  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArr = Array.from(files);
    const validFiles = fileArr.filter(file => allowedImageTypes.includes(file.type));
    const invalidFiles = fileArr.filter(file => !allowedImageTypes.includes(file.type));

    if (invalidFiles.length > 0) setAttachmentError(t("ticketFormAttachmentInvalid"));
    else setAttachmentError("");

    if (validFiles.length > 0) {
      const newAttachments = [...attachments, ...validFiles].slice(0, 5);
      setAttachments(newAttachments);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const loadProfileEmail = async () => {
      if (!token) return;
      try {
        const profile = await getUserProfile(token);
        setProfileEmail(profile.email);
        setEmail(profile.email);
        setProfileId(profile.id);
      } catch (error) {
        console.error("No se pudo cargar el email de usuario:", error);
      }
    };

    loadProfileEmail();
  }, [token]);

  const handleSubmit = async () => {
    if (!token) {
      alert(t("ticketFormAuthError"));
      return;
    }

    if (!email || !subject || !description) {
      alert(t("ticketFormRequiredFields"));
      return;
    }

    const formData = new FormData();
    const emailToUse = profileEmail || email;
    formData.append("email", emailToUse);
    if (profileId !== null) {
      formData.append("userId", profileId.toString());
    }
    formData.append("orderId", orderId);
    formData.append("subject", subject);
    formData.append("description", description);

    attachments.forEach(file => formData.append("attachments", file));
    try {
      const response = await fetch(`${API_ENDPOINTS.TICKETS}/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // No necesitamos la respuesta del ticket, solo confirmamos que se guardó
      if (response.ok) {
        addNotification({
          id: `support-request-${Date.now()}`,
          title: t("ticketFormSubmittedTitle"),
          message: t("ticketFormSubmittedMessage"),
          createdAt: new Date().toISOString(),
          read: false,
          link: "/my-tickets",
        });
        
        // Limpiar formulario si quieres
        setEmail("");
        setOrderId("");
        setSubject("");
        setDescription("");
        setAttachments([]);
        setAttachmentError("");
      } else {
        const data = await response.json();
        alert(data.message || t("ticketFormSaveError"));
      }
    } catch (error) {
      console.error("Error submit:", error);
      alert(t("ticketFormSaveError"));
    }
  };

  return (
    <>
      <SupportHeader />

      <div className="support-content">
        <div className="title-contact">
          <h1 className="title-contact-uno">{t("ticketFormTitle")}</h1>
        </div>

        <div className="contact">
          <div className="p-form">
            <p className="form-label">{t("ticketFormEmailLabel")}</p>
            <input
              type="text"
              className="inputs-form"
              value={email}
              onChange={e => setEmail(e.target.value)}
              readOnly={!!profileEmail}
            />

            <p className="form-label">{t("ticketFormOrderLabel")}</p>
            <input type="text" className="inputs-form-1" value={orderId} onChange={e => setOrderId(e.target.value)} />

            <p className="form-label">{t("ticketFormSubjectLabel")}</p>
            <input type="text" className="inputs-form-2" value={subject} onChange={e => setSubject(e.target.value)} />

            <p className="form-label">{t("ticketFormDescriptionLabel")}</p>
            <input type="text" className="inputs-form-3" value={description} onChange={e => setDescription(e.target.value)} />

            <p className="form-label">{t("ticketFormAttachmentsLabel")}</p>
            <div
              className={`attachment-zone ${dragActive ? "drag-active" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p>{t("ticketFormDropHint")}</p>
              <input type="file" accept="image/*" multiple className="attachment-input" onChange={e => handleFiles(e.target.files)} />
            </div>

            {attachmentError && <p className="attachment-error">{attachmentError}</p>}

            {attachments.length > 0 && (
              <div className="attachment-preview-grid">
                {attachments.map((file, index) => (
                  <div className="attachment-preview" key={index}>
                    <img src={URL.createObjectURL(file)} alt={file.name} className="attachment-thumb" />
                    <span>{file.name}</span>
                    <button type="button" className="attachment-remove" onClick={() => removeAttachment(index)}>{t("ticketFormAttachmentRemove")}</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="contact-footer">
            <button className="contact-boton-secondary" onClick={() => history.push('/support')}>
              <ArrowLeft size={16} style={{ marginRight: 8 }} />
              {t("ticketFormSupportHome")}
            </button>
            <button className="contact-boton-dos" onClick={handleSubmit}>{t("ticketFormSendButton")}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormularioComponente;
