import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';

export const Container = styled.View`
  padding: 1px;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

export const PickerDate = styled(Picker).attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  color: rgba(255, 255, 255, 0.8);
  height: 40px;
`;
