import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content:  center;
  
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display:flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.124rem;
  font-weight: bold;
  flex-wrap: wrap;

`

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme['gray-100']};
  
  gap: 0.5rem;
  font-weight: bold;
  
  cursor: pointer;

  &:disabled {
    opacity:0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover{
    background: ${(props) => props.theme['green-700']};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['red-500']};
  
  &:not(:disabled):hover{
    background: ${(props) => props.theme['red-700']};
  }
  &:focus{
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme['red-500']} ;
  }
`;