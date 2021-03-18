import React from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Modal from 'react-native-modal';

import {
  Container,
  FormDetails,
  Stat,
  Name,
  Description,
  DateTextMask,
  ValueTextMask,
  FormButton,
  Delete,
  DeleteText,
  Edit,
  EditText,
  Close,
  CloseText,
  Check,
} from './styles';

export default function FinanceInformation({
  data,
  isVisible,
  onClose,
  onDelete,
  onEdit,
  onPaid,
  color,
  spent,
}) {
  const DefaultModalContent = () => (
    <FormDetails>
      <Stat>
        <FontAwesome name="truck" size={16} color="#15a" />
        <Name>{data.name}</Name>
      </Stat>
      <Stat>
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={16}
          color="#15a"
        />
        <Description>{data.description}</Description>
      </Stat>

      {spent && data.parceledOut ? (
        <Stat>
          <MaterialCommunityIcons
            name="numeric-0-box-outline"
            size={16}
            color="#15a"
          />
          <Name>Parcela: {data.installment}</Name>
        </Stat>
      ) : null}

      {spent && data.parceledOut ? (
        <Stat>
          <MaterialCommunityIcons
            name="format-list-numbered"
            size={16}
            color="#15a"
          />
          <Name>Total de parcelas: {data.installments}</Name>
        </Stat>
      ) : null}

      <Stat>
        <Fontisto name="date" size={16} color="#15a" />
        <DateTextMask
          value={`${
            String(data.date.getDate()).length === 1
              ? `0${String(data.date.getDate())}`
              : String(data.date.getDate())
          }${
            String(data.date.getMonth()).length === 1 &&
            data.date.getMonth() < 9
              ? `0${String(data.date.getMonth() + 1)}`
              : String(data.date.getMonth() + 1)
          }${data.date.getFullYear()}`}
          type="datetime"
          options={{
            format: 'DD/MM/YYYY',
            obfuscated: true,
          }}
        />
      </Stat>
      <Stat>
        <FontAwesome name="money" size={16} color={color} />
        <ValueTextMask
          value={data.value}
          type="money"
          options={{
            obfuscated: true,
          }}
          style={{ color }}
        />
      </Stat>

      {spent ? (
        <Stat>
          <Check
            title="Pago?"
            textStyle={{
              color: '#000',
              fontWeight: 'normal',
              fontSize: 15,
              lineHeight: 20,
              marginLeft: 5,
            }}
            containerStyle={{
              flex: 1,
              marginLeft: -1,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0,
              padding: 0,
              height: 20,
              borderWidth: 0,
              borderRadius: 0,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.0)',
            }}
            checkedIcon={
              <MaterialCommunityIcons
                name="check-box-outline"
                size={20}
                color="#008000"
              />
            }
            uncheckedIcon={
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={20}
                color="#8B0000"
              />
            }
            checked={data.paidOut}
            onPress={onPaid}
          />
        </Stat>
      ) : null}

      <FormButton>
        <Delete onPress={onDelete}>
          <AntDesign name="delete" color="#f00" size={16} />
          <DeleteText>Excluir</DeleteText>
        </Delete>
        <Edit onPress={onEdit}>
          <FontAwesome name="edit" color="#15a" size={16} />
          <EditText>Editar</EditText>
        </Edit>
        <Close onPress={onClose}>
          <FontAwesome name="close" color="#333" size={16} />
          <CloseText>Fechar</CloseText>
        </Close>
      </FormButton>
    </FormDetails>
  );

  return (
    <Container>
      <Modal
        testID="modal"
        isVisible={isVisible}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onBackdropPress={onClose}
      >
        <DefaultModalContent onPress={onClose} />
      </Modal>
    </Container>
  );
}

FinanceInformation.propTypes = {
  data: PropTypes.objectOf.isRequired,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onPaid: PropTypes.func,
  color: PropTypes.string.isRequired,
  spent: PropTypes.bool.isRequired,
};

FinanceInformation.defaultProps = {
  isVisible: false,
  onClose: null,
  onDelete: null,
  onEdit: null,
  onPaid: null,
};
