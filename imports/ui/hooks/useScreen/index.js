import { useContext } from "react";
import { ScreenContext } from "../../contexts/";

export function useScreen() {
  const value = useContext(ScreenContext);
  return value;
}
