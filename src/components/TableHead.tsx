import { FC } from 'react'
import { VariableSizeGrid as Grid } from 'react-window'
import { Box } from '@mui/material'
import { format } from 'date-fns'
import { TableHeadProps } from 'types/Product.types'
import {
  COLUMNS_TO_SHOW,
  EXTRA_COLUMNS,
  ROW_HEIGHT,
  WIDTH_CELL
} from '@utils/index'

const TableHead: FC<TableHeadProps> = ({
  headerRef,
  uniqueDates,
  children,
  onSelectedColumn
}) => {
  const headerColumns = [...EXTRA_COLUMNS, ...uniqueDates]

  const onClickColumn = (columnIndex: number, date: string) => {
    onSelectedColumn(columnIndex, date)
  }

  return (
    <>
      <Grid
        ref={headerRef}
        columnCount={headerColumns.length}
        columnWidth={() => WIDTH_CELL}
        height={ROW_HEIGHT}
        rowCount={1}
        rowHeight={() => ROW_HEIGHT}
        width={WIDTH_CELL * COLUMNS_TO_SHOW}
        itemData={headerColumns}
        style={{ overflow: 'hidden' }}
      >
        {({ columnIndex, style, data }) => {
          if (columnIndex < EXTRA_COLUMNS.length) {
            return (
              <Box style={style} className='col-header'>
                {EXTRA_COLUMNS[columnIndex]}
              </Box>
            )
          }
          const date = data[columnIndex]
          const formatedDate = format(new Date(date), 'MM/dd/yy')
          return (
            <Box
              style={style}
              className='col-header'
              sx={{ cursor: 'pointer' }}
              onClick={() => onClickColumn(columnIndex, date)}
            >
              {formatedDate}
            </Box>
          )
        }}
      </Grid>
      {children}
    </>
  )
}

export default TableHead
