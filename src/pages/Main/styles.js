import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: #333;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #15a;
  border-radius: 4px;
  height: 45px;
  flex-direction: row;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const AddTruck = styled.Text`
  font-size: 14px;
  color: #eee;
  font-weight: bold;
  text-align: center;
  margin-left: 10px;
`;
