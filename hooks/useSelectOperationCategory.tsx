
import { ICategory, TOperationsType } from "@/types/data";
import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/categories"




export function useSelectOperationCategory ({ type }: { type: TOperationsType|'all' }) {

  const defaultCategories = getCategories()
  const [ categories, setCategories ] = useState(defaultCategories)
  const [ value, setValue ] = useState<ICategory['id']>(categories[0].id)

  useEffect(() => {

    let categories:ICategory[] = []

    if (type === 'all') {
      categories = defaultCategories
    }
    else if (type === 'income') {
      categories = defaultCategories.filter(category => category.type === 'income')
    }
    else if (type === 'expense') {
      categories = defaultCategories.filter(category => category.type === 'expense')
    }

    setValue(categories[0].id)
    setCategories(categories)

  }, [ type, defaultCategories ])


  function handleChange (e: any) {
    setValue(e.target.value)
  }



  const SelectOperationCategory = () => (

    <FormControl>
      <InputLabel>Category</InputLabel>
      <Select
        value={value}
        label="Category"
        onChange={handleChange}
      >
        {categories.map(category => (
          <MenuItem value={category.id} key={category.id}>
            <Stack direction='row' alignItems='center' gap='5px' >
              {category.Icon && category.Icon({})}
              <span>{category.name}</span>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  )

  return {
    value,
    SelectOperationCategory
  }
}