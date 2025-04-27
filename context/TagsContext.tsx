'use client';
import { createContext, useState, useContext, ReactNode } from 'react';

interface TagsContextType {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsContext = createContext<TagsContextType>({
  tags: [],
  setTags: () => {}
});

export const TagsProvider = ({ children }: { children: ReactNode }) => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => useContext(TagsContext);
