import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  colors: ['rgba(18, 10, 143, 0.3)', 'rgba(135, 206, 235, 0.5)'],
})`
  flex: 1;
`;
