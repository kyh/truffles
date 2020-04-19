import React from "react";
import styled from "styled-components";
import { Link, useParams, useHistory } from "react-router-dom";
import graphql from "babel-plugin-relay/macro";
import { useAlert } from "react-alert";

import { playhouseActions, usePlayhouse } from "features/home/playhouseSlice";
import { gameActions } from "features/game/gameSlice";
import { Card, Button } from "components";
import { useMutation } from "utils/useMutation";
import { useQueryParams } from "utils/queryUtils";

import { PackDetailsPageGameCreateMutation } from "./__generated__/PackDetailsPageGameCreateMutation.graphql";

import { Navigation } from "./components/Navigation";
import { Page, Content } from "./components/Page";

const GameCreateMutation = graphql`
  mutation PackDetailsPageGameCreateMutation($input: GameCreateInput!) {
    gameCreate(input: $input) {
      code
    }
  }
`;

export const PackDetailsPage = () => {
  const params = useQueryParams();
  const { packId } = useParams();
  const history = useHistory();
  const alert = useAlert();
  const { dispatch } = usePlayhouse();

  const [gameCreate, isCreatingGame] = useMutation<
    PackDetailsPageGameCreateMutation
  >(GameCreateMutation);

  const onHostGame = () => {
    gameCreate({
      variables: { input: { pack: params.get("packName")! } },
      onCompleted: (data) => {
        if (!data || !data.gameCreate) return;
        const gameId = data.gameCreate.code;
        dispatch(gameActions.toggle_host(true));
        dispatch(playhouseActions.update_user({ name: "" }));
        dispatch(gameActions.new_game({ gameId }));
        history.push(`/game/${gameId}/lobby`);
      },
      onError: (error: Error) => {
        alert.show(error.message);
      },
    });
  };

  return (
    <Page>
      <Navigation />
      <PackDetailsPageContent>
        <Link className="back-link" to="/gamemaster">
          &#171; Back to packs
        </Link>
        <div className="pack-details">
          <GameCard>
            <img src="https://ds055uzetaobb.cloudfront.net/brioche/chapter/Logic_1_by_1_white-wRqCbD.png?width=320" />
            <Button onClick={onHostGame} disabled={isCreatingGame}>
              Host a game
            </Button>
            <Link to={`/gamemaster/${packId}/edit`}>Edit Pack</Link>
          </GameCard>
          <div className="description-container">
            <h1 className="pack-name">Pack Name</h1>
            <p className="pack-description">
              A guided tour through our most beautiful and delightful puzzles.
            </p>
          </div>
        </div>
      </PackDetailsPageContent>
    </Page>
  );
};

const PackDetailsPageContent = styled(Content)`
  display: block;

  .back-link {
    display: inline-block;
    margin-bottom: ${({ theme }) => theme.spacings(3)};
  }

  .pack-details {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;

    ${({ theme }) => theme.media.desktop`
      display: block;
    `}
  }

  .description-container {
    padding-right: ${({ theme }) => theme.spacings(10)};
  }
`;

const GameCard = styled(Card)`
  height: max-content;
  min-width: 250px;
  align-items: center;

  img {
    display: block;
    width: 160px;
    height: 160px;
    object-fit: cover;
    margin: ${({ theme }) => `0 auto ${theme.spacings(2)}`};
  }

  button {
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacings(2)};
  }

  ${({ theme }) => theme.media.desktop`
    margin-bottom: ${theme.spacings(5)};
  `}
`;