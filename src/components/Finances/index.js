import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {
  Container,
  FinanceButton,
  StatName,
  Name,
  StatValue,
  StatDate,
  FormDetails,
  ValueTextMask,
  DateTextMask,
} from './styles';

// eslint-disable-next-line react/prop-types
export default function Finances({ data, color, onPress }) {
  return (
    <Container>
      <FinanceButton onPress={onPress}>
        <FormDetails>
          <StatDate>
            <Fontisto name="date" size={16} color="#15a" />
            {/* eslint-disable-next-line react/prop-types */}
            <DateTextMask
              value={`${
                // eslint-disable-next-line react/prop-types
                String(data.date.getDate()).length === 1
                  ? // eslint-disable-next-line react/prop-types
                    `0${String(data.date.getDate())}`
                  : // eslint-disable-next-line react/prop-types
                    String(data.date.getDate())
              }${
                // eslint-disable-next-line react/prop-types
                String(data.date.getMonth()).length === 1 &&
                // eslint-disable-next-line react/prop-types
                data.date.getMonth() < 9
                  ? // eslint-disable-next-line react/prop-types
                    `0${String(data.date.getMonth() + 1)}`
                  : // eslint-disable-next-line react/prop-types
                    String(data.date.getMonth() + 1)
                // eslint-disable-next-line react/prop-types
              }${data.date.getFullYear()}`}
              type="datetime"
              options={{
                format: 'DD/MM/YYYY',
                obfuscated: true,
              }}
            />
          </StatDate>

          <StatName>
            <FontAwesome name="truck" size={16} color="#15a" />
            {/* eslint-disable-next-line react/prop-types */}
            <Name>
              {data.parceledOut
                ? `${data.name} ${data.installment}/${data.installments}`
                : data.name}
            </Name>
          </StatName>

          <StatValue>
            <FontAwesome name="money" size={16} color={color} />
            <ValueTextMask
              // eslint-disable-next-line react/prop-types
              value={data.value}
              type="money"
              options={{
                obfuscated: true,
              }}
              style={{ color }}
            />
          </StatValue>
        </FormDetails>
      </FinanceButton>
    </Container>
  );
}
