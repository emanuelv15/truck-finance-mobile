import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker from 'react-native-image-picker';

import getRealm from '~/services/realm';

import Background from '~/components/Background';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';

import {
  Container,
  Form,
  SubmitButton,
  SubmitButtonPhoto,
  SubmitPhotoText,
  Avatar,
} from './styles';

export default class AddTruck extends Component {
  state = {
    name: '',
    board: '',
    driver: '',
    loading: false,
    photo: null,
  };

  alertError = async () => {
    Alert.alert(
      'Erro!',
      'Campos em obrigatorios em branco ou preencido incorretamente. Verifique se possui Foto, Nome, Placa e Motorista.',
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false }
    );
  };

  handleChosePhoto = async () => {
    const options = {
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({ photo: response.data });
      }
    });
  };

  handleAddTruck = async () => {
    Keyboard.dismiss();

    this.setState({ loading: true });

    await this.saveTruck();

    this.goBack();
  };

  saveTruck = async () => {
    const realm = getRealm();
    const { name, board, driver, photo } = this.state;

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      realm.write(() => {
        let idTruck = realm.objects('Truck').sorted('id', true)[0];
        if (!idTruck) {
          idTruck = 1;
        } else {
          idTruck = idTruck.id + 1;
        }

        let idSpent = realm.objects('Spent').sorted('id', true)[0];
        if (!idSpent) {
          idSpent = 1;
        } else {
          idSpent = idSpent.id + 1;
        }

        let idProfit = realm.objects('Profit').sorted('id', true)[0];
        if (!idProfit) {
          idProfit = 1;
        } else {
          idProfit = idProfit.id + 1;
        }

        const truck = {
          id: idTruck,
          name,
          board,
          driver,
          photo,
          spents: [
            {
              id: idSpent,
              name: 'Gasto Inicial',
              description:
                'Descrição da despeza... Este gasto pode ser apagado ou editado.',
              value: 0,
              date: new Date(),
              parceledOut: false,
              installmentOneId: idSpent,
              paidOut: false,
            },
          ],
          profits: [
            {
              id: idProfit,
              name: 'Lucro Inicial',
              description:
                'Descrição do lucro... Este lucro pode ser apagado ou editado.',
              value: 0,
              date: new Date(),
            },
          ],
        };

        realm.create('Truck', truck);
      });
      // realm.close();
    });
  };

  async goBack() {
    // eslint-disable-next-line react/prop-types
    const { navigation, route } = this.props;
    // eslint-disable-next-line react/prop-types
    route.params.onGoBack();
    // eslint-disable-next-line react/prop-types
    navigation.goBack();
  }

  render() {
    const { name, board, driver, loading, photo } = this.state;
    const nameRef = React.createRef(null);
    let boardRef = React.createRef(null);
    const driverRef = React.createRef(null);

    return (
      <Background>
        <Container>
          <Form>
            {photo ? (
              <Avatar
                source={
                  photo && {
                    uri: `data:image/jpeg;base64,${photo}`,
                  }
                }
              />
            ) : (
              <SubmitButtonPhoto
                loading={loading}
                onPress={this.handleChosePhoto}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Icon2 name="image-plus" size={30} color="#15a" />
                    <SubmitPhotoText>Selecionar Foto</SubmitPhotoText>
                  </>
                )}
              </SubmitButtonPhoto>
            )}

            <Input
              autoCorrect={false}
              placeholder="Nome do Caminhao"
              value={name}
              icon="truck"
              onChangeText={(text) => this.setState({ name: text })}
              autoFocus
              ref={nameRef}
              returnKeyType="next"
              onSubmitEditing={() => boardRef.getElement().focus()}
            />

            <InputMask
              autoCorrect={false}
              placeholder="Placa do Caminhao"
              type="custom"
              options={{
                mask: 'AAA-9999',
              }}
              value={board}
              icon="card-text"
              onChangeText={(text) => {
                this.setState({
                  board: text.toUpperCase(),
                });
              }}
              ref={(ref) => (boardRef = ref)}
              returnKeyType="next"
              onSubmitEditing={() => driverRef.current.focus()}
            />

            <Input
              autoCorrect={false}
              placeholder="Motorista do Caminhao"
              value={driver}
              icon="clipboard-account-outline"
              onChangeText={(text) => this.setState({ driver: text })}
              ref={driverRef}
              returnKeyType="send"
              onSubmitEditing={() =>
                photo === null ||
                name.trim() === '' ||
                board.trim() === '' ||
                board.length < 8 ||
                driver.trim() === ''
                  ? this.alertError()
                  : this.handleAddTruck()
              }
              // onSubmitEditing={() => this.state.unmasked.getElement().focus()}
            />

            {/* <InputMask
              autoCorrect={false}
              placeholder="Saldo Atual do Caminhao"
              type="money"
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$',
                suffixUnit: '',
              }}
              value={value}
              onChangeText={(text) => {
                this.setState({
                  value: text,
                });
              }}
              ref={(ref) => (this.state.unmasked = ref)}
              returnKeyType="send"
              onSubmitEditing={() =>
                photo === null ||
                name.trim() === '' ||
                board.trim() === '' ||
                board.length < 8 ||
                driver.trim() === ''
                  ? Alert.alert(
                      'Erro!',
                      'Campos em obrigatorios em branco ou preencido incorretamente. Verifique se possui Foto, Nome, Placa e Motorista.',
                      [
                        {
                          text: 'OK',
                        },
                      ],
                      { cancelable: false }
                    )
                  : this.handleAddTruck
              }
            /> */}

            <SubmitButton
              loading={loading}
              onPress={() =>
                photo === null ||
                name.trim() === '' ||
                board.trim() === '' ||
                board.length < 8 ||
                driver.trim() === ''
                  ? this.alertError()
                  : this.handleAddTruck()
              }
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Icon name="add" size={20} color="#fff" />
              )}
            </SubmitButton>
          </Form>
        </Container>
      </Background>
    );
  }
}
