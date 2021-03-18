import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 10px;
  height: 50px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const DateButton = styled.TouchableOpacity`
  flex: 1;
  padding: 15px;
  height: 50px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 15px;
`;

export const Picker = styled.View`
  background: rgba(255, 255, 255, 0.8);
  padding: 15px 30px;
  margin-top: 30px;
`;
