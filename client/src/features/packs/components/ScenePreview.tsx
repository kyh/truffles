import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useAlert } from "react-alert";

import { EditableQuestion } from "features/game/components/Question";
import { EditableAnswer } from "features/game/components/Answer";

import monitor from "./monitor.svg";

import { SceneUpdateMutation } from "./__generated__/SceneUpdateMutation";
import { ScenePreviewFragment } from "./__generated__/ScenePreviewFragment";

type Props = {
  scene: ScenePreviewFragment;
  setSaving: (saved: boolean) => void;
};

export const ScenePreview = ({ scene, setSaving }: Props) => {
  const alert = useAlert();
  const [editableScene, setEditableScene] = useState(scene);
  const [sceneUpdate] = useMutation<SceneUpdateMutation>(SCENE_UPDATE);

  useEffect(() => {
    setEditableScene(scene);
  }, [scene]);

  const onChange = async (updatedScene = {}) => {
    setSaving(true);
    const newScene = { ...editableScene, ...updatedScene };
    try {
      await sceneUpdate({
        variables: {
          input: {
            id: newScene.id,
            question: newScene.question,
            question_type_slug: newScene.questionType.slug,
            answer: newScene.answer,
            answer_type_slug: newScene.answerType.slug,
            instruction: newScene.instruction,
          },
        },
      });
      setSaving(false);
    } catch (error) {
      alert.show(error.message);
      setSaving(false);
    }
  };

  return (
    <Monitor>
      <MonitorScreenContainer>
        <MonitorScreen>
          <EditableQuestion
            instruction={editableScene?.instruction || ""}
            question={editableScene?.question}
            questionType={editableScene?.questionType?.slug}
            onChange={onChange}
          />
          <EditableAnswer
            answer={editableScene?.answer || ""}
            answerType={editableScene?.answerType?.slug}
            onChange={onChange}
          />
        </MonitorScreen>
      </MonitorScreenContainer>
    </Monitor>
  );
};

ScenePreview.fragments = {
  act: gql`
    fragment ScenePreviewFragment on Act {
      id
      question
      answer
      instruction
      questionType {
        id
        slug
      }
      answerType {
        id
        slug
      }
    }
  `,
};

const SCENE_UPDATE = gql`
  mutation SceneUpdateMutation($input: ActUpdateInput!) {
    actUpdate(input: $input) {
      act {
        ...ScenePreviewFragment
      }
    }
  }
  ${ScenePreview.fragments.act}
`;

const Monitor = styled.section`
  background-image: url(${monitor});
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 43px 43px 120px;
  width: 700px;
  height: 500px;
`;

const MonitorScreenContainer = styled.section`
  height: 100%;
  overflow: auto;
`;

const MonitorScreen = styled.section`
  position: relative;
  text-align: center;
  min-height: 335px;
  background-color: ${({ theme }) => theme.ui.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacings(5)};
`;