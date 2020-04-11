import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EditableQuestion } from "features/game/components/Question";
import { Answer } from "features/game/components/Answer";
import monitor from "./monitor.svg";
import { Act } from "../types";

type Props = {
  selectedAct: Act;
  onUpdateAct: (_act: Act) => void;
};

export const ActPreview: React.FC<Props> = ({ selectedAct, onUpdateAct }) => {
  const [editableAct, setEditableAct] = useState(selectedAct);

  useEffect(() => {
    setEditableAct(selectedAct);
  }, [selectedAct]);

  const onChange = (newActInfo: Act) => {
    setEditableAct({ ...editableAct, ...newActInfo });
  };

  const onSaveChanges = () => {
    console.log("save changes", editableAct);
    onUpdateAct(editableAct);
  };

  return (
    <Monitor>
      <MonitorScreen>
        {!!selectedAct && (
          <>
            <EditableQuestion
              instruction={editableAct.instruction}
              question={editableAct.question}
              questionType={editableAct.questionType}
              onChange={onChange}
              onSaveChanges={onSaveChanges}
            />
            <Answer
              answer=""
              answerType={editableAct.answerType}
              submitted={false}
              onSubmit={() => {}}
            />
          </>
        )}
      </MonitorScreen>
    </Monitor>
  );
};

const Monitor = styled.section`
  background-image: url(${monitor});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 30px 20px 137px;
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: center;
`;

const MonitorScreen = styled.section`
  position: relative;
  text-align: center;
  background-color: ${({ theme }) => theme.ui.background};
  width: 100%;
  max-width: 445px;
  transform: translateX(-2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
