import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import getRealm from '~/services/realm';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';

import { Container, Form, SubmitButton } from './styles';

export default class EditSpent extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ getParam: PropTypes.func }).isRequired,
    route: PropTypes.shape({ params: PropTypes.object }).isRequired,
  };

  state = {
    truck: '',
    name: '',
    description: '',
    value: '',
    date: new Date(),
    loading: false,
  };

  async componentDidMount() {
    const { route } = this.props;

    const { id, index } = route.params;

    await this.getTruck(id);

    const { truck } = this.state;

    await this.setState({
      name: truck.spents[index].name,
      description: truck.spents[index].description,
      value: truck.spents[index].value,
      date: truck.spents[index].date,
    });
  }

  getTruck = async (id) => {
    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      realm.write(() => {
        const data = realm.objectForPrimaryKey('Truck', id);

        if (data) {
          this.setState({ truck: data });
        }
      });
      // realm.close();
    });
  };

  handleEditFinance = async (moneyInput) => {
    Keyboard.dismiss();

    try {
      await this.setState({ value: moneyInput.getRawValue() });
    } catch (err) {
      Keyboard.dismiss();
    }

    await this.saveFinance();

    this.goBack();
  };

  saveFinance = async () => {
    const { route } = this.props;

    const { id, index } = route.params;

    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      realm.write(() => {
        const truck = realm.objectForPrimaryKey('Truck', id);

        const { name, description, value, date } = this.state;

        truck.spents[index].name = name;
        truck.spents[index].description = description;
        truck.spents[index].value = value;
        truck.spents[index].date = date;
      });
    });
  };

  alertError = async () => {
    Alert.alert(
      'Erro!',
      'Campos em obrigatorios em branco ou preencido incorretamente. Verifique se possui Nome, Descrição, Data e Valor.',
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false }
    );
  };

  async goBack() {
    const { navigation, route } = this.props;
    route.params.onGoBack();
    // eslint-disable-next-line react/prop-types
    navigation.goBack();
  }

  render() {
    const { name, description, value, loading, date } = this.state;
    const nameInput = React.createRef(null);
    const descriptionInput = React.createRef(null);
    let moneyInput = React.createRef(null);

    return (
      <Background>
        <Container>
          <Form>
            <Input
              autoFocus
              autoCorrect={false}
              placeholder="Nome do gasto"
              value={name}
              icon="tag-text-outline"
              onChangeText={(text) => this.setState({ name: text })}
              returnKeyType="next"
              ref={nameInput}
              onSubmitEditing={() => descriptionInput.current.focus()}
            />

            <Input
              autoCorrect={false}
              placeholder="Descrição do gasto"
              value={description}
              icon="clipboard-text-outline"
              onChangeText={(text) => this.setState({ description: text })}
              returnKeyType="next"
              ref={descriptionInput}
              onSubmitEditing={() => moneyInput.getElement().focus()}
            />

            <InputMask
              autoCorrect={false}
              placeholder="Valor do gasto"
              type="money"
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$',
                suffixUnit: '',
              }}
              value={value}
              icon="currency-usd"
              onChangeText={(text) => {
                this.setState({
                  value: text,
                });
              }}
              returnKeyType="send"
              ref={(ref) => (moneyInput = ref)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />

            <DateInput
              date={date}
              onChange={(selectedDate) => {
                this.setState({ date: selectedDate });
              }}
            />

            <SubmitButton
              loading={loading}
              onPress={() =>
                name.trim() === '' ||
                description.trim() === '' ||
                String(date).trim() === '' ||
                String(value).trim() === ''
                  ? this.alertError()
                  : this.handleEditFinance(moneyInput)
              }
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <MaterialIcons name="edit" size={20} color="#fff" />
              )}
            </SubmitButton>
          </Form>
        </Container>
      </Background>
    );
  }
}
