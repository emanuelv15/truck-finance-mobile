import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { TextMask } from 'react-native-masked-text';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  padding-top: 1px;
  padding-bottom: 5px;
`;

export const Header = styled.View`
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: #15a;
`;

export const GeneratePdfButton = styled.TouchableOpacity`
  height: 50px;
  width: ${Dimensions.get('window').width / 4}px;
  margin-left: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NewPdf = styled.Text`
  font-size: 16px;
  color: #15a;
  font-weight: bold;
  text-align: center;
  margin-left: 10px;
`;

export const HeaderText = styled.View`
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
  border-width: 1px;
  border-color: #999;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Board = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

export const Driver = styled.Text`
  font-size: 14px;
  line-height: 18px;
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
  font-size: 14px;
  line-height: 18px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

export const BalanceTextMask = styled(TextMask)`
  font-size: 14px;
  line-height: 18px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const PickerText = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

export const ContainerPicker = styled.View`
  flex: 1;
  padding: 5px;
  align-items: flex-start;
`;

export const ContainerPickerRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const NewFinanceButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  height: 50px;
  width: ${Dimensions.get('window').width / 2.5}px;
  flex-direction: row;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const AddFinance = styled.Text`
  font-size: 16px;
  color: #15a;
  font-weight: bold;
  text-align: center;
  margin-left: 10px;
`;
