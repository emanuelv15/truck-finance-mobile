import React from 'react';
import PropTypes from 'prop-types';

import { Container, PickerDate } from './styles';

// eslint-disable-next-line react/prop-types
export default function PickerYear({ uniqueDates, selectedYear, onChange }) {
  return (
    <Container>
      <PickerDate
        selectedValue={selectedYear}
        onValueChange={(itemValue) => onChange(itemValue)}
        mode="dialog"
      >
        {uniqueDates.map((item) => {
          return (
            <PickerDate.Item
              label={String(item.date.getFullYear())}
              value={String(item.date.getFullYear())}
              key={String(item.date.getFullYear())}
            />
          );
        })}
      </PickerDate>
    </Container>
  );
}

PickerYear.propTypes = {
  uniqueDates: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
};

PickerYear.defaultProps = {
  uniqueDates: {},
  selectedYear: {},
  onChange: {},
};
