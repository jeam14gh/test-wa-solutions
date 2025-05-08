import { Box } from '@mui/material'
import { useCallback, useMemo, useRef } from 'react'
import ProductGrid from '@components/ProductGrid'
import { SummaryByDates } from '@components/SummaryByDates'
import {
  VariableSizeGrid as Grid,
  FixedSizeGrid as FixedGrid
} from 'react-window'
import TableHead from '@components/TableHead'
import productList from '@mocks/data.json'
import {
  TABLE_HEIGTH,
  groupAndSort,
  getDates,
  getCellsByColor,
  TABLE_WIDTH
} from './utils'
import './App.css'
import { useProducts } from '@hooks/useProducts'

function App() {
  const products = useMemo(() => groupAndSort(productList), [])
  const uniqueDates = useMemo(() => getDates(productList), [])
  const { summary, setSummary, getSummaryByDate } = useProducts(products)
  const headerRef = useRef<Grid>(null)
  const fixedGridRef = useRef<FixedGrid>(null)
  const selectedDateRef = useRef<string>(null)

  const onSelectedColumn = useCallback(
    (columnIndex: number, date: string) => {
      selectedDateRef.current = date
      getSummaryByDate(columnIndex)
    },
    [getSummaryByDate]
  )

  const onUpdateData = useCallback(
    (rowIndex: number, columnIndex: number, value: number) => {
      // Actualzamos 'products' por referencia
      products[rowIndex][1][columnIndex].makeToOrder = value
      const date = products[rowIndex][1][columnIndex].visibleForecastedDate

      if (date === selectedDateRef.current) {
        const cellsByColor = getCellsByColor(columnIndex, products)
        setSummary(cellsByColor)
      } else {
        setSummary([])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Box className='app-container'>
      <Box
        className='table-container'
        style={{
          height: TABLE_HEIGTH,
          minWidth: TABLE_WIDTH
        }}
      >
        <TableHead
          headerRef={headerRef}
          uniqueDates={uniqueDates}
          onSelectedColumn={onSelectedColumn}
        >
          <ProductGrid
            headerRef={headerRef}
            fixedGridRef={fixedGridRef}
            products={products}
            uniqueDates={uniqueDates}
            onUpdateData={onUpdateData}
          />
        </TableHead>
      </Box>
      <SummaryByDates summary={summary} date={selectedDateRef.current} />
    </Box>
  )
}

export default App
