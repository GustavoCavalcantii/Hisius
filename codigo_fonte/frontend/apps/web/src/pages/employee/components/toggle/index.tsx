import { useState } from "react";
import { Switch, Slider, LeftText, RightText } from "./styles";

interface ToggleProps {
  initial?: boolean;
  onToggle?: (state: boolean) => void;
  labels?: {
    on: string;
    off: string;
  };
}

export default function Toggle({
  initial = false,
  onToggle,
  labels = { on: "Sim", off: "Não" },
}: ToggleProps) {
  const [isOn, setIsOn] = useState(initial);

  const handleClick = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle?.(newState);
  };

  return (
    <Switch onClick={handleClick} isOn={isOn}>
      <Slider isOn={isOn} />
      <LeftText isOn={isOn}>{labels.off}</LeftText>
      <RightText isOn={isOn}>{labels.on}</RightText>
    </Switch>
  );
}