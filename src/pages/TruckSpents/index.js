import React, { Component } from 'react';
import { Alert } from 'react-native';
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
import FinanceInformation from '~/components/FinanceInformation';
import PickerMonth from '~/components/PickermMonth';
import PickerYear from '~/components/PickerYear';

export default class TruckSpents extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ getParam: PropTypes.func }).isRequired,
    route: PropTypes.shape({ params: PropTypes.object }).isRequired,
  };

  state = {
    truck: '',
    loading: false,
    spentOrdered: null,
    selectedMonth: String(new Date().getMonth()),
    selectedYear: String(new Date().getFullYear()),
    uniqueDates: [],
    isVisible: false,
    itemShowDetails: '',
  };

  async componentDidMount() {
    const { route } = this.props;

    const { id } = route.params;

    await this.getTruck(id);

    const { selectedYear } = this.state;

    await this.spentFilteredByYear(selectedYear);

    // await this.balanceSum();

    await this.getDates();
  }

  getDates = async () => {
    const { truck } = this.state;

    const uniqueDates = truck.spents
      .slice()
      .filter(
        (spents, index, self) =>
          index ===
          self.findIndex(
            (t) => t.date.getFullYear() === spents.date.getFullYear()
          )
      );

    await this.setState({ uniqueDates });
  };

  spentOrderedByDate = async () => {
    const { truck, selectedYear } = this.state;

    const filtered = truck.spents
      .slice()
      .filter((a) => a.date.getFullYear() === Number(selectedYear));

    const sortedArray = filtered.slice().sort((a, b) => b.date - a.date);

    await this.setState({ spentOrdered: sortedArray });
  };

  spentFilteredByMonth = async (month) => {
    await this.setState({ selectedMonth: month });

    const { selectedYear } = this.state;

    if (month !== '12') {
      const { truck } = this.state;

      const filtered = truck.spents
        .slice()
        .filter(
          (a) =>
            a.date.getMonth() === Number(month) &&
            a.date.getFullYear() === Number(selectedYear)
        )
        .sort((a, b) => b.date - a.date);

      await this.setState({ spentOrdered: filtered });
    } else {
      await this.spentOrderedByDate();
    }
  };

  spentFilteredByYear = async (year) => {
    await this.setState({ selectedYear: year });

    const { selectedMonth } = this.state;

    if (selectedMonth !== '12') {
      const { truck } = this.state;

      const filtered = truck.spents
        .slice()
        .filter(
          (a) =>
            a.date.getFullYear() === Number(year) &&
            a.date.getMonth() === Number(selectedMonth)
        )
        .sort((a, b) => b.date - a.date);

      await this.setState({ spentOrdered: filtered });
    } else {
      await this.spentOrderedByDate();
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

  navigateEditSpent = (id, index) => {
    const { navigation } = this.props;

    // eslint-disable-next-line react/prop-types
    navigation.navigate('EditSpent', {
      id,
      index,
      onGoBack: this.refresh,
    });
  };

  alertExcludeAllBenefits = (index) => {
    Alert.alert(
      'Deseja realmente excluir este gasto?',
      'Obs: Este gasto está parcelado!',
      [
        {
          text: 'Sim e todas prestações',
          onPress: () => this.excludeAllBenefits(index),
        },
        {
          text: 'Sim e somente este',
          onPress: () => this.excludeBenefit(index),
        },
      ],
      { cancelable: false }
    );
  };

  excludeAllBenefits = (index) => {
    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      const { route } = this.props;
      const { id } = route.params;
      const truck = realm.objectForPrimaryKey('Truck', id);

      realm.write(() => {
        const { installmentOneId } = truck.spents[index];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < truck.spents.length; i++) {
          if (truck.spents[i].installmentOneId === installmentOneId) {
            truck.spents.splice(i, 1);
          }
        }
      });
    });
    this.refresh();
  };

  alertExcludeBenefit = (index) => {
    Alert.alert(
      'Deseja realmente excluir este gasto?',
      [
        {
          text: 'Sim',
          onPress: () => this.excludeBenefit(index),
        },
      ],
      { cancelable: false }
    );
  };

  excludeBenefit = (index) => {
    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      const { route } = this.props;
      const { id } = route.params;
      const truck = realm.objectForPrimaryKey('Truck', id);

      realm.write(() => {
        truck.spents.splice(index, 1);
      });
    });
    this.refresh();
  };

  handleDeleteFinance = async (financeId) => {
    await this.setState({ isVisible: false });

    const { route } = this.props;
    const { id } = route.params;

    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then(async (realm) => {
      const truck = realm.objectForPrimaryKey('Truck', id);

      const index = this.financesFilter(truck, financeId);

      if (truck.spents[index].parceledOut === true) {
        this.alertExcludeAllBenefits(index);
      } else {
        this.alertExcludeBenefit(index);
      }
    });

    // this.refresh();
  };

  handleEditSpent = async (finance) => {
    await this.setState({ isVisible: false });

    const { truck } = this.state;

    const indexSpent = this.financesFilter(truck, finance);

    const { route } = this.props;

    const { id } = route.params;

    this.navigateEditSpent(id, indexSpent);
  };

  handlePaidSpent = async (finance) => {
    const { route } = this.props;

    const { id } = route.params;

    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      realm.write(() => {
        const truck = realm.objectForPrimaryKey('Truck', id);

        const indexSpent = this.financesFilter(truck, finance);

        if (truck.spents[indexSpent].paidOut) {
          truck.spents[indexSpent].paidOut = false;
        } else {
          truck.spents[indexSpent].paidOut = true;
        }
      });
      // realm.close();
    });

    this.refresh();
  };

  handleNavigateAddNewSpent = () => {
    const { route, navigation } = this.props;
    const { id } = route.params;

    // eslint-disable-next-line react/prop-types
    navigation.navigate('AddNewSpent', {
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
      await this.spentFilteredByMonth(selectedMonth);
    } else {
      await this.spentOrderedByDate();
    }

    // await this.balanceSum();
  };

  generatePdf = async () => {
    const light = false;
    try {
      const { spentOrdered, truck } = this.state;

      // const month = format(profitOrdered[0].date, 'MMMM', {
      //   locale: pt,
      // });

      const { pdfData, onlyData } = await generatePdf(
        light,
        spentOrdered,
        truck,
        'month'
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

  handleDetails = async (item) => {
    await this.setState({ isVisible: true });
    await this.setState({ itemShowDetails: item });
  };

  // eslint-disable-next-line class-methods-use-this
  financesFilter(truck, financeId) {
    let index = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < truck.spents.length; i++) {
      if (financeId === truck.spents[i].id) {
        index = i;
        return index;
      }
    }
    return null;
  }

  render() {
    const {
      loading,
      spentOrdered,
      selectedMonth,
      selectedYear,
      uniqueDates,
      isVisible,
      itemShowDetails,
    } = this.state;

    // const color = balance < 0 ? { color: '#8B0000' } : { color: '#008000' };

    return (
      <Background>
        <Header>
          <NewFinanceButton
            loading={loading}
            onPress={() => this.handleNavigateAddNewSpent()}
          >
            <Entypo name="add-to-list" color="#15a" size={16} />
            <AddFinance>Novo Gasto</AddFinance>
          </NewFinanceButton>

          {/* eslint-disable-next-line no-nested-ternary */}
          {spentOrdered !== null ? (
            spentOrdered.length === 0 ? null : (
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
                onChange={(itemValue) => this.spentFilteredByMonth(itemValue)}
              />
            </ContainerPicker>

            <ContainerPicker>
              <PickerText>Selecione o ano: </PickerText>
              <PickerYear
                uniqueDates={uniqueDates}
                selectedYear={selectedYear}
                onChange={(itemValue) => this.spentFilteredByYear(itemValue)}
              />
            </ContainerPicker>
          </ContainerPickerRow>

          <List
            keyboardShouldPersistTaps="handled"
            data={spentOrdered}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Finances
                data={item}
                onDelete={() => this.handleDeleteFinance(item.id)}
                onEdit={() => this.handleEditSpent(item.id)}
                onPress={() => this.handleDetails(item)}
                color="#8B0000"
              />
            )}
          />

          {isVisible && itemShowDetails !== '' ? (
            <FinanceInformation
              data={itemShowDetails}
              isVisible={isVisible}
              onClose={() => this.setState({ isVisible: false })}
              onDelete={() => this.handleDeleteFinance(itemShowDetails.id)}
              onEdit={() => this.handleEditSpent(itemShowDetails.id)}
              onPaid={() => this.handlePaidSpent(itemShowDetails.id)}
              color="#8B0000"
              spent
            />
          ) : null}
        </Container>
      </Background>
    );
  }
}
