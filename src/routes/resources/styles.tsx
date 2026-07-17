import styled from 'styled-components'
import { Button } from '../../design-system'
import { Form } from 'react-router'

export const SearchAndCreateRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

export const NewResourceForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const NewResourceButton = styled(Button)`
  justify-self: flex-end;
`
