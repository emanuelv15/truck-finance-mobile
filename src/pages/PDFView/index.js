/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RNFetchBlob from 'rn-fetch-blob';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { Container, PDF, Header, SavePdfButton, NewPdf } from './styles';

import Background from '~/components/Background';

export default class PDFView extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ getParam: PropTypes.func }).isRequired,
    route: PropTypes.shape({ params: PropTypes.object }).isRequired,
  };

  state = {
    pdfData: undefined,
    onlyData: undefined,
  };

  async componentDidMount() {
    const { route } = this.props;

    const { pdfData, onlyData } = route.params;

    await this.setState({ pdfData });
    await this.setState({ onlyData });
  }

  saveFile = async (onlyData) => {
    const { dirs } = RNFetchBlob.fs;

    const path = `${dirs.DownloadDir}/trucksss_${new Date()}.pdf`;
    RNFetchBlob.fs.writeFile(path, onlyData, 'base64').then((res) => {
      console.tron.log('File : ', res);
    });
  };

  render() {
    const { pdfData, onlyData } = this.state;

    const source = {
      uri: pdfData,
    };

    return (
      <Background>
        <Header>
          {/* eslint-disable-next-line no-nested-ternary */}
          {onlyData !== null ? (
            <SavePdfButton onPress={() => this.saveFile(onlyData)}>
              <AntDesign name="pdffile1" color="#15a" size={25} />
              <NewPdf>Salvar PDF</NewPdf>
            </SavePdfButton>
          ) : null}
        </Header>
        <Container>
          {!!pdfData && (
            <PDF
              source={source}
              // onLoadComplete={(numberOfPages, filePath) => {
              //   // this.saveFile(onlyData);
              // }}
              // onPageChanged={(page, numberOfPages) => {
              //   // console.tron.log(`current page: ${page}`);
              // }}
              // onError={(error) => {
              //   // console.tron.log(error);
              // }}
              // onPressLink={(uri) => {
              //   // console.tron.log(`Link presse: ${uri}`);
              // }}
            />
          )}
        </Container>
      </Background>
    );
  }
}
