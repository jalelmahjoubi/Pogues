import { nameFromLabel } from '../utils/name-utils'
import { uuid } from '../utils/data-utils'

export function codeListToState(rawCodeList) {
  const { codes } = rawCodeList
  return codes.map(({ value, label }) => ({
    id: uuid(),
    value,
    label
  }))
}