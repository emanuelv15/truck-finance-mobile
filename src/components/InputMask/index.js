import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

function InputMask({ style, icon, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

InputMask.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InputMask.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(InputMask);
