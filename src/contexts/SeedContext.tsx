import { createContext, useState } from 'react';

type SeedContextProviderProps = {
    children: React.ReactElement;
};

type SeedContextProps = {
    seed: number;
    setSeed: (seed: number) => void;
    generateNewSeed: () => void;
};

const SeedContext = createContext<SeedContextProps>({
    seed: Math.random(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setSeed: (seed: number) => {},
    generateNewSeed: () => null,
});

export function SeedContextProvider({ children }: SeedContextProviderProps) {
    const [seed, setSeed] = useState<number>(Math.random());

    const generateNewSeed = () => {
        const newRandomInt = Math.random();
        setSeed(newRandomInt);
    };

    return (
        <SeedContext.Provider value={{ seed, setSeed, generateNewSeed }}>
            {children}
        </SeedContext.Provider>
    );
}

export default SeedContext;
