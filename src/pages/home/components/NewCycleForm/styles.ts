import styled from "styled-components";

const BaseInput = styled.input`
  width: 100%;
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${props => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${props => props.theme['gray-100']};

  &:hover{
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme['green-300']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator{
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;
