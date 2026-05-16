import React, { useState, useEffect, useRef } from "react";
import { IonPage, IonContent } from "@ionic/react";
import SupportHeader from "../../components/support/SupportHeader.tsx";
import "../../components/support/FormularioComponente.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useNotification } from "../../contexts/NotificationContext.tsx";
import { API_ENDPOINTS } from "../../config/apiConfig";

interface Attachment {
  name: string;
  type: string;
  filePath: string;
}

interface Message {
  sender: "user" | "admin";
  message: string;
  attachments?: Attachment[];
  createdAt: string;
}

interface Ticket {
  id: number;
  email: string;
  orderId: string;
  subject: string;
  description: string;
  attachments: Attachment[];
  responses: {
    id: number;
    message: string;
    responder: "USER" | "ADMIN" | "user" | "admin";
    respondedAt: string;
    attachments?: Attachment[];
  }[];
  createdAt: string;
}

const TicketView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token, username } = useAuth();
  const { addNotification } = useNotification();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`${API_ENDPOINTS.TICKETS}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error cargando ticket");

        const ticketData: Ticket = await res.json();
        setTicket(ticketData);

        // Formatear mensajes
        const formattedMessages: Message[] = [
          {
            sender: "user",
            message: ticketData.description,
            attachments: ticketData.attachments,
            createdAt: ticketData.createdAt,
          },
          ...ticketData.responses.map((resp) => {
            const isAdminResponse = resp.responder?.toString().toLowerCase() === "admin";
            return {
              sender: (isAdminResponse ? "admin" : "user") as "user" | "admin",
              message: resp.message,
              attachments: resp.attachments || [],
              createdAt: resp.respondedAt,
            };
          }),
        ];

        setMessages(formattedMessages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);

  // Auto scroll hacia abajo
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!ticket) return <p>Error cargando ticket</p>;

  return (
    <IonPage>
      <SupportHeader />
      <IonContent fullscreen>
        <div className="support-content">
        <h1 className="title-contact-uno">{ticket.subject}</h1>

        <div
          className="chat"
          ref={chatRef}
          style={{ maxHeight: "400px", overflowY: "auto", padding: "10px" }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.sender === "user" ? "user-msg" : "admin-msg"}
              style={{
                marginBottom: "16px",
                background: msg.sender === "user" ? "#e1f5fe" : "#fff3e0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <div style={{ marginBottom: "8px" }}>
                <strong>{msg.sender === "user" ? username : "admin"}</strong>
                <span style={{ marginLeft: "8px", fontSize: "0.8rem", color: "#666" }}>
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <p style={{ margin: "0 0 5px 0" }}>{msg.message}</p>

              {msg.attachments &&
                msg.attachments.map((att, idx) => (
                  <img
                    key={idx}
                    src={att.filePath}
                    alt={att.name}
                    className="attachment-thumb"
                    style={{
                      marginTop: "6px",
                      maxHeight: "100px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                    onClick={() => window.open(att.filePath, "_blank")}
                  />
                ))}
            </div>
          ))}
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TicketView;