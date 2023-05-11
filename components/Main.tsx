
import { Button as MuiButton, TextField as MuiTextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';


type IButtonProps = React.ComponentProps<typeof MuiButton>

export function Button (props: IButtonProps) {

  return (
    <MuiButton variant='contained' {...props} >
      {props.children}
    </MuiButton>
  )
}


type TTextFieldProps = React.ComponentProps<typeof MuiTextField>

export function TextField (props: TTextFieldProps) {

  return (
    <MuiTextField {...props} variant="outlined" />
  )
}


interface TDatePikerProps extends React.ComponentProps<typeof DatePicker> {
  defaultValue?: Date
  required?: boolean
}


export function useDatePicker ({ defaultValue }: { defaultValue?: Date }) {

  const defaultDateValue = defaultValue == null ? null : dayjs(defaultValue.toISOString().slice(0, 10))

  const [ value, setValue ] = useState<Dayjs|null>(defaultDateValue)
  const [ date, setDate ] = useState<Date|null>(null)

  function handleSetValue (newDate: Date|null) {
    setValue(newDate == null ? null : dayjs(newDate.toISOString().slice(0, 10)))
  }

  useEffect(() => {

    if (value == null) {
      setDate(null)
      return
    }

    const date = value.toDate()
    setDate(date.toString() === 'Invalid Date' ? null : date)
  }, [ value ])

  const CustomDatePicker = ({ required, ...props }: TDatePikerProps) => {

    props.onChange = (value:any) => {
      setValue(value)
    }

    if (required) {
      const inputRef = props.inputRef
  
      props.inputRef = (ref) => {
        ref && (ref.required = true)
        typeof inputRef === 'function' && inputRef(ref)
      }
    }

    return (
      <DatePicker
        {...props}
        value={value}
      />
    )
  }

  return {
    DatePicker: CustomDatePicker,
    handleSetValue,
    date
  }
}