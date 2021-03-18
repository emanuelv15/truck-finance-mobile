import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export const Container = styled.View`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-top: 7px;
  margin-bottom: 7px;
`;

export const SwipeableRight = styled(Swipeable)``;

export const Truck = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  background: #16a;
  border-radius: 10px;
  align-items: center;
`;

export const FormDetails = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 20px;
  padding: 5px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
  border-width: 1px;
  border-color: #999;
`;

export const Name = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin-top: 5px;
`;

export const Board = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
`;

export const Driver = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
`;

export const TruckButtonOpenHidden = styled(RectButton)`
  align-items: center;
  justify-content: center;
  width: 75px;
  background-color: #15a;
  border-radius: 10px;
`;

export const TruckButtonDeleteHidden = styled(RectButton)`
  align-items: center;
  justify-content: center;
  width: 75px;
  background-color: #8b0000;
  border-radius: 10px;
`;

export const TextHidden = styled.Text`
  font-size: 16px;
  color: #eee;
  font-weight: bold;
`;

export const ListSeparator = styled.Text`
  height: 1px;
  background-color: #444;
`;
