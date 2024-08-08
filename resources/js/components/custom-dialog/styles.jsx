import { Dialog } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';

const shakeAnimation = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
  `;

export const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'hasErrors',
})(({ hasErrors }) => ({
  ...(hasErrors && {
    '& .MuiDialog-container': {
      animation: `${shakeAnimation} 0.5s linear`,
    },
  }),
}));
