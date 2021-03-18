import styled from 'styled-components/native';
import { TextMask } from 'react-native-masked-text';

export const Container = styled.View``;

export const FinanceButton = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 9px;
  margin-top: 8px;
`;

export const FormDetails = styled.View`
  flex: 1;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StatName = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
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

export const StatValue = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const ValueTextMask = styled(TextMask).attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  margin-left: 6px;
  line-height: 20px;
`;

export const StatDate = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

export const DateTextMask = styled(TextMask).attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  margin-left: 6px;
  line-height: 20px;
`;
