import { useState } from 'react'
import { GroupedProduct, Summary } from '../types/Product.types'
import { getCellsByColor } from '@utils/index'

export const useProducts = (products: GroupedProduct[]) => {
  const [summary, setSummary] = useState<Summary[]>([])

  const getSummaryByDate = (columnIndex: number) => {
    const cellsByColor = getCellsByColor(columnIndex, products)
    setSummary(cellsByColor)
  }

  return { summary, getSummaryByDate, setSummary }
}
