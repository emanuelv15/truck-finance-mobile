import React from 'react';
import PropTypes from 'prop-types';

import { Container, PickerDate } from './styles';

export default function PickerMonth({ selectedMonth, onChange }) {
  const months = [
    { label: 'Janeiro', value: '0' },
    { label: 'Fevereiro', value: '1' },
    { label: 'Março', value: '2' },
    { label: 'Abril', value: '3' },
    { label: 'Maio', value: '4' },
    { label: 'Junho', value: '5' },
    { label: 'Julho', value: '6' },
    { label: 'Agosto', value: '7' },
    { label: 'Setembro', value: '8' },
    { label: 'Outubro', value: '9' },
    { label: 'Novembro', value: '10' },
    { label: 'Dezembro', value: '11' },
    { label: 'Todos', value: '12' },
  ];

  return (
    <Container>
      <PickerDate
        selectedValue={selectedMonth}
        onValueChange={(itemValue) => onChange(itemValue)}
        mode="dialog"
      >
        {months.map((item) => {
          return (
            <PickerDate.Item
              label={item.label}
              value={item.value}
              key={item.value}
            />
          );
        })}
      </PickerDate>
    </Container>
  );
}

PickerMonth.propTypes = {
  selectedMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
};

PickerMonth.defaultProps = {
  selectedMonth: {},
  onChange: {},
};
