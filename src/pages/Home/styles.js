import styled from 'styled-components';

export const Button = styled.div`
  background-color: var(--primary-light-green);
  padding: 16px;
  border-radius: 30px;
  max-width: 280px;
  text-align: center;
  transition: all 0.4s ease-in-out;
  text-transform: uppercase;

  :hover {
    background-color: var(--primary-dark-green);
  }

  a {
    padding: 28px;
    font-weight: 700;
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  padding: 0 20px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export const NavContainer = styled.div`
  img {
    height: 130px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 22px;
  }
`;
