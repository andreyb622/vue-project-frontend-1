export interface SelectOption {
  id: string
  value: string
}

export interface CustomSelectProps {
  options: SelectOption[]
  modelValue?: SelectOption | SelectOption[] | null
  multi?: boolean
  searchMode?: boolean
  label?: string
  placeholder?: string
  disabled?: boolean
}

export interface CustomSelectEmits {
  (e: 'update:modelValue', value: SelectOption | SelectOption[] | null): void
}