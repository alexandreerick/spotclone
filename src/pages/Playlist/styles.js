import styled from 'styled-components';

export const Title = styled.h1`
  font-weight: 700;
  color: var(--primary-light-green);
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

  display: flex;
  justify-content: space-between;
  align-items: center;

  /* @media (max-width: 640px) {
    flex-direction: column;
  } */
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 30px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-left: 10rem;

  img {
    border-radius: 50%;
    height: 120px;
    margin-right: 20px;
    box-shadow: 0 1px 5px rgb(255 255 255 / 20%);
  }

  h2 {
    font-size: 2rem;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    padding-left: 0px;

    img {
      margin-bottom: 18px;
      margin-right: 0px;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LeaveButton = styled.button`
  background-color: #d9092b;
  padding: 16px;
  border-radius: 30px;
  min-width: 200px;
  text-align: center;
  transition: all 0.4s ease-in-out;
  text-transform: uppercase;
  border: none;
  color: #fff;
  font-weight: 700;
  outline: none;

  :hover {
    background-color: #a10d25;
    cursor: pointer;
  }
`;

export const Button = styled(LeaveButton)`
  background-color: var(--primary-light-green);
  margin-top: 40px;

  :hover {
    background-color: var(--primary-dark-green);
  }
`;
