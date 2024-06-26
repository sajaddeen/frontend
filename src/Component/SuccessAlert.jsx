import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Theme from './Theme'
import styled from '@emotion/styled'
import ReactDOM from 'react-dom'
import CheckIcon from '@mui/icons-material/Check'

const theme = Theme()

const Overly = styled(Stack)(({}) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0, 0.7)',
  zIndex: 1000,
}))

const ModelStack = styled(Stack)(({}) => ({
  zIndex: 1000,
}))

export default function SuccessAlert({ setAlert }, props) {
  return ReactDOM.createPortal(
    <Overly>
      <Stack justifyContent="center" alignItems="center" sx={{}}>
        <ModelStack
          sx={{
            marginTop: '15%',
            marginBottom: '15%',
            backgroundColor: theme.palette.background.paper,
            width: 390,
            height: 180,
            borderRadius: theme.shape.borderRadius * 0.5,
            overflow: 'hidden',
          }}
        >
          <Stack
            textAlign="center"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: '15px' }}
          >
            {!props.title && (
              <Typography
                variant="h4"
                sx={{ color: theme.palette.primary.main }}
              >
                Successfully Updated!
              </Typography>
            )}
            {props.title && (
              <Typography
                variant="h4"
                sx={{ color: theme.palette.primary.main }}
              >
                {props.title}
              </Typography>
            )}
            <CheckIcon
              fontSize="large"
              sx={{ color: theme.palette.primary.main }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '20%' }}
              onClick={() => setAlert(false)}
            >
              <Typography variant="subtitle2">Ok</Typography>
            </Button>
          </Stack>
        </ModelStack>
      </Stack>
    </Overly>,
    document.getElementById('portal-success')
  )
}
