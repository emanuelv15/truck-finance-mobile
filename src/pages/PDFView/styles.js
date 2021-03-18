import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const PDF = styled(Pdf)`
  flex: 1;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: #15a;
`;

export const SavePdfButton = styled.TouchableOpacity`
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
