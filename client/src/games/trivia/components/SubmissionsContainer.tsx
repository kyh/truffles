import styled from 'styled-components';

export const SubmissionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .submission {
    display: inline-flex;
    flex-direction: column;
    > button {
      opacity: 1;
    }
  }

  .endorsement-container {
    display: flex;
    flex-direction: row-reverse;
    transform: translateY(-20px);

    .endorsement {
      display: inline-flex;
      flex-direction: column;
      padding: 10px;
      background: #fff;
      justify-content: center;
      align-items: center;
      border: 2px solid;
      border-radius: 100%;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
