import { ReactNode } from "react";
import { SEO } from "~/components";
import { GameLayout } from "~/lib/game/game-layout";
import { Game } from "~/lib/game/game";

const GameSpectatePage = () => {
  return (
    <>
      <SEO title="Spectate Game" />
      <Game isSpectate />
    </>
  );
};

const getLayout = (page: ReactNode) => <GameLayout>{page}</GameLayout>;

GameSpectatePage.getLayout = getLayout;

export default GameSpectatePage;
