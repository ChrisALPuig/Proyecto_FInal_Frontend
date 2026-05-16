import { API_ENDPOINTS } from '../config/apiConfig.ts';

const API_URL = API_ENDPOINTS.TICKETS;

export const getUserTickets = async (token: string) => {
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error al cargar los tickets");
  }
  return await res.json();
};

export const getTicketById = async (id: number, token: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al cargar el ticket");
  return await res.json();
};

export const createTicket = async (
  email: string,
  orderId: string,
  subject: string,
  description: string,
  attachments: FileList | null,
  token: string
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("orderId", orderId);
  formData.append("subject", subject);
  formData.append("description", description);

  if (attachments) {
    for (let i = 0; i < attachments.length; i++) {
      formData.append("attachments", attachments[i]);
    }
  }

  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Error al crear el ticket");
  return await res.json();
};

export const replyToTicket = async (
  id: number,
  message: string,
  token: string
) => {
  const formData = new FormData();
  formData.append("message", message);
  formData.append("responder", "USER");

  const res = await fetch(`${API_URL}/${id}/response`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Error al responder el ticket");
  return await res.json();
};
