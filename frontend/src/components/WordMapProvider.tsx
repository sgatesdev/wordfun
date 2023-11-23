import React, { createContext, useState } from 'react';

// Define the shape of the context

export type WordMap = {
	letter: string,
	correct: boolean,
}

interface IMapContext {
  map: Array<WordMap>;
  updateMap: (pos: number, value: WordMap) => void;
}

interface MapProviderProps {
	children: React.ReactNode;
}

// Create a context
export const MapContext = createContext<IMapContext | undefined>(undefined);

export const WordMapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [map, setMap] = useState(new Array<WordMap>());

  const updateMap = (pos: number, value: WordMap) => {
	setMap(prevMap => {
		let newMap = [...prevMap]
		newMap[pos] = value
		return newMap
	})
  };

  return (
    <MapContext.Provider value={{ map, updateMap }}>
      {children}
    </MapContext.Provider>
  );
};