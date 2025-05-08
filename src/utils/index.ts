import type { GroupedProduct, Product } from '../types/Product.types'

export const WIDTH_CELL = 100
export const ROW_HEIGHT = 50
export const TABLE_HEIGTH = 517 + ROW_HEIGHT
export const GRID_HEIGTH = TABLE_HEIGTH - ROW_HEIGHT
// Columnas que solo son de lectura
export const EXTRA_COLUMNS = ['CenterCode', 'Reference']
// Total de columnas que se desean ver
export const COLUMNS_TO_SHOW = 8
/* Ayuda a que el scroll generado por el Grid del componente 'ProductGrid' 
 no interfiera con el total de celdas creadas por fila */
export const SCROLLTOP_WIDTH = 15
export const TABLE_WIDTH = WIDTH_CELL * COLUMNS_TO_SHOW + SCROLLTOP_WIDTH

export const getColor = (data: Partial<Product>): string => {
  const { netFlow, makeToOrder, redZone, yellowZone, greenZone } =
    data as Product
  const total = netFlow + makeToOrder

  if (1 <= total && total <= redZone) return 'red'
  if (redZone < total && total <= redZone + yellowZone) return 'yellow' //ok to here
  if (redZone + yellowZone < total && total <= redZone + yellowZone + greenZone)
    return 'green'
  if (total === 0) return 'black'
  if (total > redZone + yellowZone + greenZone) return 'blue'

  return 'black'
}

// Obtener solo las fechas sin sin repetir y ordenadas
export const getDates = (data: Product[]) =>
  [...new Set(data.map((product) => product.visibleForecastedDate))].sort()

export const groupAndSort = (data: Product[]) => {
  const grouped: Record<string, Product[]> = {}

  // Agrupar por Reference. Podria ser mas eficiente el 'for' pero seria para millones de datos
  data.forEach((item) => {
    if (!grouped[item.reference]) {
      grouped[item.reference] = [
        { centerCode: item.centerCode } as Product,
        { reference: item.reference } as Product
      ]
    }
    grouped[item.reference].push(item)
  })

  // Ordenar cada grupo por visibleForecastedDate
  Object.keys(grouped).forEach((ref) => {
    grouped[ref].sort(
      (a, b) =>
        new Date(a.visibleForecastedDate).getTime() -
        new Date(b.visibleForecastedDate).getTime()
    )
  })

  // Ordenar por reference
  const sorted = Object.entries(grouped).sort((a, b) =>
    a[0].localeCompare(b[0])
  )

  return sorted
}

export const getCellsByColor = (
  columnIndex: number,
  data: GroupedProduct[]
) => {
  const colorCount: Record<string, number> = {
    blue: 0,
    green: 0,
    yellow: 0,
    red: 0,
    black: 0
  }

  data.forEach(([_, product]) => {
    const color = getColor(product[columnIndex])
    colorCount[color] += 1
  })
  return Object.entries(colorCount)
}
