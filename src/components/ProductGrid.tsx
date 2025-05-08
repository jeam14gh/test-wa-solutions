/* eslint-disable no-unused-vars */
import React, { memo, useCallback } from 'react'
import { FixedSizeGrid as Grid, GridOnScrollProps } from 'react-window'
import {
  ROW_HEIGHT,
  WIDTH_CELL,
  GRID_HEIGTH,
  EXTRA_COLUMNS,
  TABLE_WIDTH
} from '../utils'
import Cell from './Cell'
import { ProductGridProps } from '../types/Product.types'

const ProductGrid: React.FC<ProductGridProps> = ({
  fixedGridRef,
  headerRef,
  products,
  uniqueDates,
  onUpdateData
}) => {
  const onScroll = useCallback(
    ({ scrollLeft, scrollTop }: GridOnScrollProps) => {
      headerRef.current?.scrollTo({ scrollLeft })
      fixedGridRef.current?.scrollTo({ scrollTop })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onUpdateProduct = (
    rowIndex: number,
    columnIndex: number,
    value: number
  ) => {
    onUpdateData(rowIndex, columnIndex, value)
  }

  return (
    <Grid
      ref={fixedGridRef}
      columnCount={uniqueDates.length + EXTRA_COLUMNS.length}
      columnWidth={WIDTH_CELL}
      height={GRID_HEIGTH}
      rowCount={products.length}
      rowHeight={ROW_HEIGHT}
      width={TABLE_WIDTH}
      style={{ overflow: 'auto overlay' }}
      onScroll={onScroll}
    >
      {({ rowIndex, columnIndex, style }) => {
        const [_, items] = products[rowIndex]
        const item = items[columnIndex]

        return (
          <Cell
            key={`${item.reference}${item.visibleForecastedDate}`}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            item={item}
            onUpdateProduct={onUpdateProduct}
            style={style}
          />
        )
      }}
    </Grid>
  )
}

export default memo(
  ProductGrid,
  (prevProps, nextProps) => prevProps.products === nextProps.products
)
