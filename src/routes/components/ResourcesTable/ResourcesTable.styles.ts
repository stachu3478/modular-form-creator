import styled from 'styled-components'
import { Button } from '../../../design-system'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

export const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const ActionsCell = styled(TableCell)`
  display: flex;
  gap: 1rem;
`

export const DeleteButton = styled(Button)`
  color: ${({ theme }) => theme.colors.warning};
`
