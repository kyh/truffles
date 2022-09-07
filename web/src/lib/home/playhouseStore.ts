import create from "zustand";
import shallow from "zustand/shallow";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { createOrGetThemesong } from "~/styles/sound";

export type PlayhouseStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMusicOn: boolean;
  toggleMusic: () => void;
  isSFXOn: boolean;
  toggleSFX: () => void;
  playerId: string;
  setPlayerId: (playerId: string) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
};

const getDarkModeDefault = () => {
  if (typeof window !== "undefined" && window.matchMedia)
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  return true;
};

export const usePlayhouseStore = create<PlayhouseStore>()(
  persist(
    (set) => ({
      isDarkMode: getDarkModeDefault(),
      toggleDarkMode: () =>
        set((state) => ({ ...state, isDarkMode: !state.isDarkMode })),
      isMusicOn: false,
      toggleMusic: () =>
        set((state) => ({ ...state, isMusicOn: !state.isMusicOn })),
      isSFXOn: false,
      toggleSFX: () => set((state) => ({ ...state, isSFXOn: !state.isSFXOn })),
      playerId: nanoid(),
      setPlayerId: (playerId) => set((state) => ({ ...state, playerId })),
      playerName: "",
      setPlayerName: (playerName) => set((state) => ({ ...state, playerName })),
    }),
    {
      name: "playhouse-storage",
    }
  )
);

export const useAllPlayhouseStore = () =>
  usePlayhouseStore((state) => state, shallow);