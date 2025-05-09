import { ChangeEvent, FC, useEffect, useState } from 'react'
import { TextField, Box } from '@mui/material'
import { getColor } from '@utils/index'
import type { CellProps } from '../types/Product.types'

const Cell: FC<CellProps> = ({
  item,
  style,
  rowIndex,
  columnIndex,
  onUpdateProduct,
  isScrolling
}) => {
  const [inputValue, setInputValue] = useState(item.makeToOrder)
  const [bgColor, setBgColor] = useState(getColor(item))

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { value } = event.target
    setInputValue(+value)
    onUpdateProduct(rowIndex, columnIndex, +value)
  }

  useEffect(() => {
    setBgColor(getColor({ ...item, makeToOrder: inputValue }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  if (isScrolling) {
    return (
      <Box style={style} className='center'>
        <div className='spinner' />
      </Box>
    )
  }

  return columnIndex <= 1 ? (
    <Box key={columnIndex} style={style}>
      <Box className='cell-info' sx={{ height: style.height }}>
        {item.centerCode || item.reference}
      </Box>
    </Box>
  ) : (
    <Box style={style} key={columnIndex}>
      <Box style={{ backgroundColor: bgColor }} className='cell-input'>
        <TextField
          type='number'
          value={inputValue}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-root': {
              color: bgColor === 'yellow' ? '#000' : '#fff',
              height: 50,
              width: 100
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default Cell
