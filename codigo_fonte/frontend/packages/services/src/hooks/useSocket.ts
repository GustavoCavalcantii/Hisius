import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

interface PatientCalledData {
  message: string;
  room: string;
}

interface UseSocketReturn {
  isConnected: boolean;
  lastNotification: PatientCalledData | null;
  emitEvent: <T>(event: string, data: T) => void;
}

const SOCKET_SERVER_URL = "http://localhost:8088";

export const useSocket = (
  userId: number | null,
  authToken: string | null
): UseSocketReturn => {
  const socketRef = useRef<any | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastNotification, setLastNotification] =
    useState<PatientCalledData | null>(null);

  useEffect(() => {
    if (!userId || !authToken) {
      console.log("Socket: Aguardando userId ou authToken...");
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
      return;
    }

    console.log("Iniciando conexão WebSocket para usuário:", userId);

    const bearerToken = authToken.startsWith("Bearer ")
      ? authToken
      : `Bearer ${authToken}`;

    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket", "polling"],
      auth: {
        authorization: bearerToken,
      },
      query: {
        userId: userId.toString(),
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: bearerToken,
          },
        },
      },
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket");
      setIsConnected(true);
      socket.emit("join-user-room", `user:${userId}`);
    });

    socket.on("disconnect", (reason: string) => {
      console.log("Desconectado do WebSocket. Razão:", reason);
      setIsConnected(false);
    });

    socket.on("connect_error", (error: Error) => {
      console.error("Erro de conexão:", error.message);
      setIsConnected(false);
    });

    socket.on("authenticated", () => {
      console.log("Socket autenticado com sucesso");
    });

    socket.on("unauthorized", (error: any) => {
      console.error("Falha na autenticação:", error);
      setIsConnected(false);
    });

    socket.on("paciente-chamado", (data: PatientCalledData) => {
      console.log("Paciente chamado via WebSocket:", data);
      setLastNotification(data);
    });

    return () => {
      if (socketRef.current) {
        console.log("Limpando conexão WebSocket");
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };
  }, [userId, authToken]);

  const emitEvent = <T>(event: string, data: T): void => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn("Tentativa de emitir evento sem conexão ativa");
    }
  };

  return {
    isConnected,
    lastNotification,
    emitEvent,
  };
};
