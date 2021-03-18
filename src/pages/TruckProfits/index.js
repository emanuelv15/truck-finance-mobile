import React, { Component } from 'react';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import generatePdf from '~/utils/generatePdf';

import {
  Container,
  Header,
  GeneratePdfButton,
  NewPdf,
  List,
  NewFinanceButton,
  AddFinance,
  ContainerPicker,
  ContainerPickerRow,
  PickerText,
} from './styles';

import getRealm from '~/services/realm';

import Background from '~/components/Background';
import Finances from '~/components/Finances';
import PickerMonth from '~/components/PickermMonth';
import PickerYear from '~/components/PickerYear';

export default class TruckProfits extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ getParam: PropTypes.func }).isRequired,
    route: PropTypes.shape({ params: PropTypes.object }).isRequired,
  };

  state = {
    truck: '',
    loading: false,
    profitOrdered: null,
    selectedMonth: String(new Date().getMonth()),
    selectedYear: String(new Date().getFullYear()),
    uniqueDates: [],
  };

  async componentDidMount() {
    const { route } = this.props;

    const { id } = route.params;

    await this.getTruck(id);

    const { selectedYear } = this.state;

    await this.profitFilteredByYear(selectedYear);

    // await this.balanceSum();

    await this.getDates();

    // await this.orderFinances(data);
  }

  getDates = async () => {
    const { truck } = this.state;

    const uniqueDates = truck.profits
      .slice()
      .filter(
        (profits, index, self) =>
          index ===
          self.findIndex(
            (t) => t.date.getFullYear() === profits.date.getFullYear()
          )
      );

    await this.setState({ uniqueDates });
  };

  profitOrderedByDate = async () => {
    const { truck, selectedYear } = this.state;

    const filtered = truck.profits
      .slice()
      .filter((a) => a.date.getFullYear() === Number(selectedYear));

    const sortedArray = filtered.slice().sort((a, b) => b.date - a.date);

    await this.setState({ profitOrdered: sortedArray });
  };

  profitFilteredByMonth = async (month) => {
    await this.setState({ selectedMonth: month });

    const { selectedYear } = this.state;

    if (month !== '12') {
      const { truck } = this.state;

      const filtered = truck.profits
        .slice()
        .filter(
          (a) =>
            a.date.getMonth() === Number(month) &&
            a.date.getFullYear() === Number(selectedYear)
        )
        .sort((a, b) => b.date - a.date);

      await this.setState({ profitOrdered: filtered });
    } else {
      await this.profitOrderedByDate();
    }
  };

  profitFilteredByYear = async (year) => {
    await this.setState({ selectedYear: year });

    const { selectedMonth } = this.state;

    if (selectedMonth !== '12') {
      const { truck } = this.state;

      const filtered = truck.profits
        .slice()
        .filter(
          (a) =>
            a.date.getFullYear() === Number(year) &&
            a.date.getMonth() === Number(selectedMonth)
        )
        .sort((a, b) => b.date - a.date);

      await this.setState({ profitOrdered: filtered });
    } else {
      await this.profitOrderedByDate();
    }
  };

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

  // balanceSum = async () => {
  //   const { truck } = this.state;

  //   // Profits
  //   if (truck.profits.length === 1) {
  //     await this.setState({ profitBalance: truck.profits[0].value });
  //   } else {
  //     const positiveTotal = truck.profits.reduce(
  //       (total, numero) => total + numero.value,
  //       0
  //     );

  //     await this.setState({ profitBalance: positiveTotal });
  //   }

  //   // Spents
  //   if (truck.spents.length === 1) {
  //     await this.setState({ spentBalance: truck.spents[0].value });
  //   } else {
  //     const negativeTotal = truck.spents.reduce(
  //       (total, numero) => total + numero.value,
  //       0
  //     );

  //     await this.setState({ spentBalance: negativeTotal });
  //   }

  //   const { profitBalance, spentBalance } = this.state;

  //   await this.setState({ balance: profitBalance - spentBalance });
  // };

  saveTruck = async (truck) => {
    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      realm.write(() => {
        realm.create('Truck', truck, 'modified');
      });
    });
  };

  navigateEditProfit = (id, index) => {
    const { navigation } = this.props;

    // eslint-disable-next-line react/prop-types
    navigation.navigate('EditProfit', {
      id,
      index,
      onGoBack: this.refresh,
    });
  };

  handleDeleteFinance = async (financeId) => {
    const { route } = this.props;
    const { id } = route.params;

    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      realm.write(() => {
        // realm.create('Truck', truck, 'modified');
        const truck = realm.objectForPrimaryKey('Truck', id);

        const index = this.financesFilter(truck, financeId);

        truck.profits.splice(index, 1);
      });
    });

    this.refresh();
  };

  handleEditProfit = async (finance) => {
    const { truck } = this.state;

    const indexProfit = this.financesFilter(truck, finance);

    const { route } = this.props;

    const { id } = route.params;

    this.navigateEditProfit(id, indexProfit);
  };

  handleNavigateAddNewProfit = () => {
    const { route, navigation } = this.props;
    const { id } = route.params;

    // eslint-disable-next-line react/prop-types
    navigation.navigate('AddNewProfit', {
      id,
      onGoBack: this.refresh,
    });
  };

  refresh = async () => {
    const { route } = this.props;

    const { id } = route.params;

    await this.getTruck(id);

    await this.getDates();

    const { selectedMonth } = this.state;

    if (selectedMonth !== '12') {
      await this.profitFilteredByMonth(selectedMonth);
    } else {
      await this.profitOrderedByDate();
    }

    // await this.balanceSum();
  };

  ask = () => {
    Alert.alert(
      'What do you want to do ?',
      'Generate a light or a full lines PDF',
      [{ text: 'Gerar', onPress: () => this.generatePdf() }],
      { cancelable: false }
    );
  };

  generatePdf = async () => {
    const light = false;
    try {
      const { profitOrdered, truck } = this.state;

      const month = format(profitOrdered[0].date, 'MMMM', {
        locale: pt,
      });

      const { pdfData, onlyData } = await generatePdf(
        light,
        profitOrdered,
        truck,
        month
      );

      this.handleNavigatePDF(pdfData, onlyData);
    } catch (error) {
      console.tron.log(error);
    }
  };

  handleNavigatePDF = (pdfData, onlyData) => {
    const { navigation } = this.props;
    // eslint-disable-next-line react/prop-types
    navigation.navigate('PDFView', { pdfData, onlyData });
  };

  // eslint-disable-next-line class-methods-use-this
  financesFilter(truck, financeId) {
    let index = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < truck.profits.length; i++) {
      if (financeId === truck.profits[i].id) {
        index = i;
        return index;
      }
    }
    return null;
  }

  render() {
    const {
      loading,
      profitOrdered,
      selectedMonth,
      selectedYear,
      uniqueDates,
    } = this.state;

    // const color = balance < 0 ? { color: '#8B0000' } : { color: '#008000' };

    return (
      <Background>
        <Header>
          <NewFinanceButton
            loading={loading}
            onPress={() => this.handleNavigateAddNewProfit()}
          >
            <Entypo name="add-to-list" color="#15a" size={16} />
            <AddFinance>Novo Lucro</AddFinance>
          </NewFinanceButton>

          {/* eslint-disable-next-line no-nested-ternary */}
          {profitOrdered !== null ? (
            profitOrdered.length === 0 ? null : (
              <GeneratePdfButton onPress={() => this.generatePdf()}>
                <AntDesign name="pdffile1" color="#15a" size={25} />
                <NewPdf>Gerar PDF</NewPdf>
              </GeneratePdfButton>
            )
          ) : null}
        </Header>

        <Container>
          <ContainerPickerRow>
            <ContainerPicker>
              <PickerText>Selecione o mês: </PickerText>
              <PickerMonth
                selectedMonth={selectedMonth}
                onChange={(itemValue) => this.profitFilteredByMonth(itemValue)}
              />
            </ContainerPicker>

            <ContainerPicker>
              <PickerText>Selecione o ano: </PickerText>
              <PickerYear
                uniqueDates={uniqueDates}
                selectedYear={selectedYear}
                onChange={(itemValue) => this.profitFilteredByYear(itemValue)}
              />
            </ContainerPicker>
          </ContainerPickerRow>

          <List
            keyboardShouldPersistTaps="handled"
            data={profitOrdered}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Finances
                data={item}
                onDelete={() => this.handleDeleteFinance(item.id)}
                onEdit={() => this.handleEditProfit(item.id)}
                color="#008000"
              />
            )}
          />
        </Container>
      </Background>
    );
  }
}
