import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import getRealm from '~/services/realm';
import Background from '~/components/Background';
import { Trucks, Separator } from '~/components/Trucks';

import { Container, Form, SubmitButton, List, AddTruck } from './styles';

export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  };

  state = {
    trucks: [],
    loading: false,
  };

  async componentDidMount() {
    await this.getTrucks();
  }

  // async componentDidUpdate(_, prevState) {
  //   const realm = getRealm();

  //   // eslint-disable-next-line no-shadow
  //   realm.then((realm) => {
  //     realm.write(() => {
  //       const data = realm.objects('Truck').sorted('name', false);

  //       if (prevState.trucks !== data) {
  //         this.setState({ trucks: data });
  //       }
  //     });
  //     // realm.close();
  //   });
  // }

  getTrucks = async () => {
    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      // realm.write(() => {
      //   const data = realm.objects('Truck').sorted('name', false);

      //   if (data) {
      //     this.setState({ trucks: data });
      //   }
      // });
      const data = realm.objects('Truck').sorted('name', false);

      if (data) {
        this.setState({ trucks: data });
      }
      // realm.close();
    });
  };

  refresh = async () => {
    await this.getTrucks();
  };

  handleNavigateAddTruck = () => {
    const { navigation } = this.props;

    navigation.navigate('AddTruck', {
      onGoBack: this.refresh,
    });
  };

  handleNavigateTruck = (id) => {
    const { navigation } = this.props;

    navigation.navigate('Truck', { id });
  };

  handleDeleteTruck = (id) => {
    const realm = getRealm();

    // eslint-disable-next-line no-shadow
    realm.then((realm) => {
      realm.write(() => {
        const truck = realm.objectForPrimaryKey('Truck', id);

        realm.delete(truck);
      });
      // realm.close();
    });
    this.refresh();
  };

  render() {
    const { trucks, loading } = this.state;

    return (
      <Background>
        <Container>
          <Form>
            <SubmitButton
              loading={loading}
              onPress={() => this.handleNavigateAddTruck()}
            >
              <MaterialIcons name="add" color="#eee" size={16} />
              <AddTruck>Adionar novo Caminhao</AddTruck>
            </SubmitButton>
          </Form>

          <List
            data={trucks}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => (
              <Trucks
                data={item}
                onDelete={() => this.handleDeleteTruck(item.id)}
                onOpen={() => this.handleNavigateTruck(item.id)}
                index={index}
              />
            )}
            ItemSeparatorComponent={() => <Separator />}
          />
        </Container>
      </Background>
    );
  }
}
