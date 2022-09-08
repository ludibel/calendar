import styled from '@emotion/styled';

import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

export const StyledBox = styled(Box)({
  backgroundColor: '#e5e5e5',
});
export const StyledGridDate = styled('div')({
  textAlign: 'center',
  marginBottom: '1em',
});
export const StyledGridAvailability = styled(Grid)({
  textAlign: 'center',
});
export const StyledDivAvailability = styled('div')({
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 700,
  position: 'relative',
  backgroundColor: '#d4f4fe',
  marginTop: 10,
  marginBottom: 10,
  height: 34,
  lineHeight: '34px',
});
export const StyledDivAvailabilityEmpty = styled('div')({
  borderRadius: 1,
  width: '100%',
  height: 44,
  lineHeight: '34px',
  display: 'flex',
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 10,
  marginRight: 10,
});
export const StyledDivAvailabilityDash = styled('div')({
  borderRadius: 1,
  backgroundColor: '#435f7133',
  width: 12,
  height: 2,
  marginRight: 'auto',
  marginLeft: 'auto',
});
export const StyledGridDatas = styled(Grid)({
  textAlign: 'center',
});
export const StyledBoxBis = styled(Box)(({ theme }) => ({
  backgroundColor: '#f6f6f6',
  marginRight: '3em',
  marginLeft: '3em',
}));
export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  // display: 'flex',
}));
export const StyledGridIcon = styled(Grid)(({ theme }) => ({
  // flex: 0,
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 700,
  position: 'relative',
  backgroundColor: '#d4f4fe',
  marginTop: 10,
  marginBottom: 10,
  height: 34,
  lineHeight: '34px',
  width: '100%',
  color: '#2b4660',
}));
export const StyledGridMoreAvailability = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
}));
export const StyledButtonMoreAvailability = styled(Button)(({ theme }) => ({
  fontSize: '1em',
  fontWeight: 700,
  color: '#107aca',
}));
