import styled from 'styled-components/native';
import { TextMask } from 'react-native-masked-text';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const Header = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.View`
  align-items: center;
`;

export const Avatar = styled.Image`
  width: ${Dimensions.get('window').height / 4.5}px;
  height: ${Dimensions.get('window').height / 4.5}px;
  border-radius: ${Dimensions.get('window').height / 4.5}px;
  background: #eee;
  border-width: 1px;
  border-color: #999;
`;

export const Name = styled.Text`
  font-size: ${Dimensions.get('window').width / 8}px;
  color: #000;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Board = styled.Text`
  font-size: ${Dimensions.get('window').width / 25}px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

export const Driver = styled.Text`
  font-size: ${Dimensions.get('window').width / 25}px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

export const BalanceHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BalanceText = styled.Text`
  font-size: ${Dimensions.get('window').width / 25}px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
  margin-left: 10px;
`;

export const BalanceTextMask = styled(TextMask)`
  font-size: ${Dimensions.get('window').width / 25}px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

export const Refresh = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 10px;
`;
