/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Avatar,
  Name,
  Board,
  Driver,
  BalanceHeader,
  BalanceText,
  BalanceTextMask,
  HeaderText,
  Refresh,
} from './styles';

import getRealm from '~/services/realm';
import Background from '~/components/Background';

export default class Truck extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ getParam: PropTypes.func }).isRequired,
    route: PropTypes.shape({ params: PropTypes.object }).isRequired,
  };

  state = {
    truck: '',
    balance: 0,
    spentBalance: 0,
    profitBalance: 0,
  };

  async componentDidMount() {
    const { route } = this.props;

    const { id } = route.params;

    await this.getTruck(id);

    await this.balanceSum();
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

  balanceSum = async () => {
    const { truck } = this.state;

    // Profits
    if (truck.profits.length === 1) {
      await this.setState({ profitBalance: truck.profits[0].value });
    } else {
      const positiveTotal = truck.profits.reduce(
        (total, numero) => total + numero.value,
        0
      );

      await this.setState({ profitBalance: positiveTotal });
    }

    // Spents
    if (truck.spents.length === 1) {
      await this.setState({ spentBalance: truck.spents[0].value });
    } else {
      const negativeTotal = truck.spents.reduce(
        (total, numero) => total + numero.value,
        0
      );

      await this.setState({ spentBalance: negativeTotal });
    }

    const { profitBalance, spentBalance } = this.state;

    await this.setState({ balance: profitBalance - spentBalance });
  };

  refresh = async () => {
    const { route } = this.props;

    const { id } = route.params;

    await this.getTruck(id);

    await this.balanceSum();
  };

  render() {
    const { truck, balance } = this.state;

    const color = balance < 0 ? { color: '#8B0000' } : { color: '#008000' };

    return (
      <Background>
        <Container>
          <Avatar
            source={
              truck.photo && {
                uri: `data:image/jpeg;base64,${truck.photo}`,
              }
            }
          />
          <HeaderText>
            <Name>{truck.name}</Name>
            <Board>Placa: {truck.board}</Board>
            <Driver>Motorista: {truck.driver}</Driver>
            <BalanceHeader>
              <BalanceText style={color}>
                {balance < 0 ? 'Saldo: -' : 'Saldo: '}
              </BalanceText>
              <BalanceTextMask
                value={balance}
                style={color}
                type="money"
                options={{
                  obfuscated: true,
                }}
              />
            </BalanceHeader>
          </HeaderText>
          <Refresh onPress={() => this.refresh()}>
            <MaterialCommunityIcons name="refresh" color="#15a" size={35} />
            <Driver>Atualizar Saldo</Driver>
          </Refresh>
        </Container>
      </Background>
    );
  }
}
