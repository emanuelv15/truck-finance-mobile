import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import getRealm from '~/services/realm';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';

import { Container, Form, SubmitButton } from './styles';

export default class AddNewProfit extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ getParam: PropTypes.func }).isRequired,
    route: PropTypes.shape({ params: PropTypes.object }).isRequired,
  };

  state = {
    name: '',
    description: '',
    value: '',
    loading: false,
    date: new Date(),
  };

  handleAddFinance = async (moneyInput) => {
    Keyboard.dismiss();

    await this.setState({ value: moneyInput });

    await this.saveFinance();

    this.goBack();
  };

  saveFinance = async () => {
    const { route } = this.props;

    const { id } = route.params;

    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      realm.write(() => {
        let idProfit = realm.objects('Profit').sorted('id', true)[0];
        if (!idProfit) {
          idProfit = 1;
        } else {
          idProfit = idProfit.id + 1;
        }

        const truck = realm.objectForPrimaryKey('Truck', id);

        const { name, description, value, date } = this.state;

        // let date = currentDate.split('/');
        // date = new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]));

        truck.profits.push({
          id: idProfit,
          name,
          description,
          value,
          date,
        });
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
              placeholder="Nome do lucro"
              value={name}
              icon="tag-text-outline"
              onChangeText={(text) => this.setState({ name: text })}
              returnKeyType="next"
              ref={nameInput}
              onSubmitEditing={() => descriptionInput.current.focus()}
            />

            <Input
              autoCorrect={false}
              placeholder="Descrição do lucro"
              value={description}
              icon="clipboard-text-outline"
              onChangeText={(text) => this.setState({ description: text })}
              returnKeyType="next"
              ref={descriptionInput}
              onSubmitEditing={() => moneyInput.getElement().focus()}
            />

            <InputMask
              autoCorrect={false}
              placeholder="Valor do lucro"
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
                value.trim() === ''
                  ? this.alertError()
                  : this.handleAddFinance(moneyInput.getRawValue())
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
