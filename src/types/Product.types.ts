import { CSSProperties, ReactNode, RefObject } from 'react'
import {
  VariableSizeGrid as VarGrid,
  FixedSizeGrid as FixedGrid
} from 'react-window'

export interface Product {
  centerCode: string
  reference: string
  visibleForecastedDate: string
  netFlow: number
  greenZone: number
  yellowZone: number
  redZone: number
  makeToOrder: number
}

export interface TableHeadProps {
  headerRef: RefObject<VarGrid | null>
  children: ReactNode
  uniqueDates: string[]
  onSelectedColumn: (index: number, date: string) => void
}

export interface ProductGridProps {
  fixedGridRef: RefObject<FixedGrid | null>
  headerRef: RefObject<VarGrid | null>
  products: GroupedProduct[]
  uniqueDates: string[]
  onUpdateData: (rowIndex: number, columnIndex: number, value: number) => void
}

export interface CellProps {
  item: Partial<Product>
  style: CSSProperties
  rowIndex: number
  columnIndex: number
  onUpdateProduct: (
    rowIndex: number,
    columnIndex: number,
    value: number
  ) => void
}

export type GroupedProduct = [string, Product[]]

export type Summary = [string, number]

export interface SummaryProps {
  date: string | null
  summary: Summary[]
}
