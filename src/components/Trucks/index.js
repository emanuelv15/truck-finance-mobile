import React from 'react';

import { Animated } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Container,
  SwipeableRight,
  Truck,
  FormDetails,
  Avatar,
  Name,
  Board,
  Driver,
  TruckButtonOpenHidden,
  TruckButtonDeleteHidden,
  TextHidden,
  ListSeparator,
} from './styles';

const row = [];
let prevOpenedRow;

const closeRow = (index) => {
  if (prevOpenedRow && prevOpenedRow !== row[index]) {
    prevOpenedRow.close();
  }
  prevOpenedRow = row[index];
};

export function Separator() {
  return <ListSeparator />;
}

const RightActions = (progress, dragX, onDelete, onOpen) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0],
  });
  return (
    <>
      <TruckButtonDeleteHidden onPress={onDelete}>
        <Animated.View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale }],
          }}
        >
          <AntDesign name="delete" color="#eee" size={16} />
          <TextHidden>Apagar</TextHidden>
        </Animated.View>
      </TruckButtonDeleteHidden>
      <TruckButtonOpenHidden onPress={onOpen}>
        <Animated.View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale }],
          }}
        >
          <AntDesign name="folderopen" color="#eee" size={16} />
          <TextHidden>Abrir</TextHidden>
        </Animated.View>
      </TruckButtonOpenHidden>
    </>
  );
};

// eslint-disable-next-line react/prop-types
export function Trucks({ data, onDelete, onOpen, index }) {
  return (
    <Container>
      <SwipeableRight
        // eslint-disable-next-line react/prop-types
        ref={(ref) => (row[index] = ref)}
        overshootFriction={8}
        rightThreshold={80}
        renderRightActions={(progress, dragX) =>
          RightActions(progress, dragX, onDelete, onOpen)
        }
        // eslint-disable-next-line react/prop-types
        onSwipeableOpen={() => closeRow(index)}
      >
        <Truck>
          <Avatar
            source={
              // eslint-disable-next-line react/prop-types
              data.photo && {
                // eslint-disable-next-line react/prop-types
                uri: `data:image/jpeg;base64,${data.photo}`,
              }
            }
          />
          <FormDetails>
            {/* eslint-disable-next-line react/prop-types */}
            <Name>Nome: {data.name}</Name>
            {/* eslint-disable-next-line react/prop-types */}
            <Board>Placa: {data.board}</Board>
            {/* eslint-disable-next-line react/prop-types */}
            <Driver>Motorista: {data.driver}</Driver>
          </FormDetails>
        </Truck>
      </SwipeableRight>
    </Container>
  );
}
