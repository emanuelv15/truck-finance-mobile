import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  align-items: center;
`;

export const SubmitButtonPhoto = styled(RectButton)`
  width: ${Dimensions.get('window').width / 3}px;
  height: ${Dimensions.get('window').width / 3}px;
  border-radius: ${Dimensions.get('window').width / 3}px;
  background: rgba(0, 0, 0, 0.1);
  border-width: 1px;
  border-color: #999;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

export const SubmitPhotoText = styled.Text`
  font-size: 15px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 5px;
  text-align: center;
`;

export const Avatar = styled.Image`
  width: ${Dimensions.get('window').width / 3}px;
  height: ${Dimensions.get('window').width / 3}px;
  border-radius: ${Dimensions.get('window').width / 3}px;
  background: #eee;
  border-width: 1px;
  border-color: #999;
  margin-bottom: 15px;
`;

export const SubmitButton = styled(RectButton)`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  background: #15a;
  border-radius: 4px;
  padding: 0 12px;
  height: 45px;
  width: ${Dimensions.get('window').width / 4}px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;
