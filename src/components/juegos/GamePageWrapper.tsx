// GamePageWrapper.tsx
import React from "react";
import { useParams } from "react-router-dom";
import GamePage from "./GameContainer.tsx";

const GamePageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>Juego no encontrado</p>;

  const gameId = parseInt(id, 10);
  if (isNaN(gameId)) return <p>ID inválido</p>;

  return <GamePage gameId={gameId} />;
};

export default GamePageWrapper;