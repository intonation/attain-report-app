import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed: number, start: boolean) {
  const [value, setValue] = useState(start ? "" : text);

  useEffect(() => {
    if (!start) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setValue(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);

  const skip = () => setValue(text);

  return { value, skip };
}
