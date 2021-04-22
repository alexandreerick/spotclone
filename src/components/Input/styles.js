import styled from 'styled-components';

export const TInput = styled.input`
  height: 60px;
  min-width: 430px;
  border-radius: 5px;
  border: none;
  color: #000;
  outline: none;
  margin-bottom: 20px;

  ::placeholder {
    color: grey;
  }

  padding: 0 6px;


  @media (max-width: 640px) {
    min-width: 100%;
  }
`;
