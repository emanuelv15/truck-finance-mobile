import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 30px;
`;

export const Form = styled.View`
  align-items: center;
  border-color: #eee;
`;

export const SubmitButton = styled(RectButton)`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  background: #15a;
  border-radius: 4px;
  height: 45px;
  width: 150px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;
