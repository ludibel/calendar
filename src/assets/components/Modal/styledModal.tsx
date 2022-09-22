import styled from '@emotion/styled';

import { Dialog, IconButton } from '@mui/material';

export const StyledDialog = styled(Dialog)({});

export const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  right: 8,
  top: 8,
}) as typeof IconButton;
