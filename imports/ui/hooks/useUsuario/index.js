import { useContext } from "react";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";

export function useUsuario() {
  const value = useContext(AutenticacaoContext);
  return value;
}
