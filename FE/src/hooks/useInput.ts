import { useState } from "react";

export function useInput(initialState: string): [string, (event: React.ChangeEvent<HTMLInputElement>) => void] {
  const [inputs, setValues] = useState<string>(initialState);

  return [
    inputs,
    function (event: React.ChangeEvent<HTMLInputElement>) {
        setValues(event.target.value);
    }
  ];
}