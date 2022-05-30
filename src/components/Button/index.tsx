import styled, { css } from "styled-components";
import { Colors, spacing } from "../../utils/layout";

interface IButtonStyle {
  primary?: boolean;
  disabled?: boolean;
}

const Button = styled("button")<IButtonStyle>`
  padding: ${spacing(3)}px;
  font-size: 1.2rem;
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.primary ? Colors.borderPrimary : Colors.bodrerSecondary};
  background-color: ${(props) =>
    props.primary ? Colors.primary : Colors.secondary};
  color: ${(props) =>
    props.primary ? Colors.textPrimary : Colors.textSecondary};
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      box-shadow: 0px 2px 6px 0px rgb(0 0 0 / 35%);
    }
`;

export default Button;