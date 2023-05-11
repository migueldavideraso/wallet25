
import { TOperationsType } from "@/types/data";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";



export function useSelectOperationType ({ defaultValue }: { defaultValue: TOperationsType|undefined}) {

  const [ value, setValue ] = useState<TOperationsType>(defaultValue || 'income')

  function handleChange (e: any) {
    setValue(e.target.value)
  }


  const SelectOperationType = () => (

    <FormControl>
      <InputLabel>Type</InputLabel>
        <Select
          value={value}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value='income'>Income</MenuItem>
          <MenuItem value='expense'>Expense</MenuItem>
        </Select>
    </FormControl>

  )

  return {
    value,
    SelectOperationType
  }
}