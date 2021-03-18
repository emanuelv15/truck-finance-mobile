import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import getRealm from '~/services/realm';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';

import { Container, Form, SubmitButton, Check, FormCheck } from './styles';

export default class AddNewSpent extends Component {
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
    parceledOut: false,
    installments: 0,
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
        let idSpent = realm.objects('Spent').sorted('id', true)[0];
        if (!idSpent) {
          idSpent = 1;
        } else {
          idSpent = idSpent.id + 1;
        }

        const truck = realm.objectForPrimaryKey('Truck', id);

        const {
          name,
          description,
          value,
          date,
          parceledOut,
          installments,
        } = this.state;

        // truck.spents.push({
        //   id: idSpent,
        //   name,
        //   description,
        //   value,
        //   date,
        // });

        if (!parceledOut) {
          truck.spents.push({
            id: idSpent,
            name,
            description,
            value,
            date,
            parceledOut,
            installmentOneId: idSpent,
            paidOut: false,
          });
        } else {
          const installmentOneId = idSpent;

          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < installments; i++) {
            const date2 = new Date(date);
            date2.setMonth(date.getMonth() + i);

            idSpent += i;

            truck.spents.push({
              id: idSpent,
              name,
              description,
              value,
              date: date2,
              parceledOut,
              installment: i + 1,
              installments,
              installmentOneId,
              paidOut: false,
            });
          }
        }
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
    const {
      name,
      description,
      value,
      loading,
      date,
      parceledOut,
      installments,
    } = this.state;
    const nameInput = React.createRef(null);
    const descriptionInput = React.createRef(null);
    let moneyInput = React.createRef(null);
    const installmentsInput = React.createRef(null);

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

            <FormCheck>
              <Check
                title="Parcelado"
                textStyle={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 'normal',
                  fontSize: 15,
                  marginLeft: 10,
                }}
                containerStyle={{
                  flex: 1,
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 10,
                  marginBottom: 0,
                  padding: 15,
                  height: 50,
                  borderWidth: 0,
                  borderRadius: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }}
                checkedIcon={
                  <Ionicons
                    name="md-checkbox-outline"
                    size={25}
                    color="rgba(255, 255, 255, 0.8)"
                  />
                }
                uncheckedIcon={
                  <Icon
                    name="check-box-outline-blank"
                    size={25}
                    color="rgba(255, 255, 255, 0.8)"
                  />
                }
                checked={parceledOut}
                onPress={() => this.setState({ parceledOut: !parceledOut })}
              />
            </FormCheck>
            {parceledOut ? (
              <Input
                keyboardType="numeric"
                autoCorrect={false}
                placeholder="Quantidade de parcelas"
                value={installments}
                icon="format-list-numbered"
                onChangeText={(text) =>
                  this.setState({ installments: Number(text) })
                }
                returnKeyType="send"
                ref={installmentsInput}
                onSubmitEditing={() =>
                  name.trim() === '' ||
                  description.trim() === '' ||
                  String(date).trim() === '' ||
                  value.trim() === ''
                    ? this.alertError()
                    : this.handleAddFinance(moneyInput.getRawValue())
                }
              />
            ) : null}

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
