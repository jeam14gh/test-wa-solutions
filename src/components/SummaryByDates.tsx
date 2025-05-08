import {
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableBody,
  styled,
  tableCellClasses,
  Box
} from '@mui/material'
import { SummaryProps } from '../types/Product.types'
import { FC } from 'react'
import { format } from 'date-fns'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    border: '1px solid #fff',
    fontWeight: 600
  },
  [`&.${tableCellClasses.body}.sbd-cell-info`]: {
    border: '1px solid #000',
    textAlign: 'center',
    textTransform: 'capitalize'
  }
}))

export const SummaryByDates: FC<SummaryProps> = ({ summary, date }) => {
  if (summary.length === 0) return null

  const total = summary.reduce((acc, [_, count]) => acc + count, 0)
  const formatedDate = format(new Date(date || ''), 'MM/dd/yy')

  return (
    <TableContainer
      component={Paper}
      sx={{ width: 350, height: '100%', borderRadius: 0 }}
    >
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={4}>{formatedDate}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Color</StyledTableCell>
            <StyledTableCell>Columns</StyledTableCell>
            <StyledTableCell>Percentage</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summary.map(([color, count]) => {
            const value = parseInt(((count / total) * 100).toFixed(1))
            return (
              <TableRow key={color}>
                <StyledTableCell
                  className='sbd-cell-info'
                  sx={{ textTransform: 'capitalize' }}
                >
                  {color}
                </StyledTableCell>
                <StyledTableCell className='sbd-cell-info'>
                  {count}
                </StyledTableCell>
                <StyledTableCell
                  className='sbd-cell-info'
                  sx={{ minWidth: 100 }}
                >
                  <Box className='cell-linear-progress'>
                    <LinearProgress
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        minWidth: 'inherit',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: color
                        }
                      }}
                      variant='determinate'
                      value={value}
                    />
                    <span>{`${value}%`}</span>
                  </Box>
                </StyledTableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <StyledTableCell className='sbd-cell-info'>Total</StyledTableCell>
            <StyledTableCell colSpan={2} className='sbd-cell-info'>
              {total}
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
