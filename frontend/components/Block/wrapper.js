import styled, { keyframes } from 'styled-components';
import { bounceIn } from 'react-animations';

const animation = keyframes`${bounceIn}`;

const Wrapper = styled.div`
    textShadow: '0 1px 0 rgba(255, 255, 255, 0.1)';
    text-align: center;
    padding: 2em;
    animation: 1s ${animation};
`;

export default Wrapper;
