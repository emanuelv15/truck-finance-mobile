import styled from 'styled-components/native';

import { TextMask } from 'react-native-masked-text';
import { CheckBox } from 'react-native-elements';

export const Container = styled.View``;

export const FormDetails = styled.View`
  background-color: white;
  padding: 22px;
  justify-content: center;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const FinanceButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 5px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
`;

export const Name = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-left: 6px;
  line-height: 20px;
`;

export const Description = styled.Text`
  font-size: 15px;
  color: #333;
  margin-left: 6px;
  line-height: 20px;
`;

export const Stat = styled.View`
  margin-top: 1px;
  flex-direction: row;
  align-items: stretch;
`;

export const ValueTextMask = styled(TextMask).attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  margin-left: 6px;
  line-height: 20px;
`;

export const DateTextMask = styled(TextMask).attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  margin-left: 6px;
  line-height: 20px;
`;

export const Delete = styled.TouchableOpacity`
  padding: 10px;
  margin-left: 10px;
  flex-direction: row;
`;

export const DeleteText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #f00;
  margin-left: 5px;
`;

export const Edit = styled.TouchableOpacity`
  padding: 10px;
  margin-left: 10px;
  flex-direction: row;
`;

export const EditText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #15a;
  margin-left: 5px;
`;

export const Close = styled.TouchableOpacity`
  padding: 10px;
  margin-left: 10px;
  flex-direction: row;
`;

export const CloseText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-left: 5px;
`;

export const FormButton = styled.View`
  margin-right: 20px;
  padding: 5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Check = styled(CheckBox)``;
