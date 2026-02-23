import { useState, useEffect } from "react";

export function useEditableContent<T>(key: string, defaultValue: T) {
  const [content, setContent] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(content));
  }, [key, content]);

  return [content, setContent] as const;
}
