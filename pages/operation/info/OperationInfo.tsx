import { TextField, useDatePicker } from "@/components/Main";
import { getCategoryById } from "@/services/categories";
import { IOperation } from "@/types/data";
import { useEffect, useState } from "react";




export default function OperationInfo ({ operation }: { operation: IOperation }) {

  const { categoryName, typeName, DatePicker } = useOperationData({ operation })

  return (

    <section className="inputs-section">
      <TextField label="Type" type="text" name="type" value={typeName} inputProps={{ readOnly: true }} />
      <TextField label="Category" type="text" name="category" value={categoryName} inputProps={{ readOnly: true }} />
      <TextField label="Name" type="text" name="name" value={operation.name} inputProps={{ readOnly: true }} />
      <TextField label="Amount" type="number" name="amount" value={operation.amount} inputProps={{ readOnly: true }} />
      <DatePicker label="Date" readOnly />
    </section>
  )
}


function useOperationData ({ operation }: { operation: IOperation|null }) {

  const [ categoryName, setCategoryName ] = useState('')
  const [ typeName, setTypeName ] = useState('')
  const { handleSetValue: setDateValue, DatePicker } = useDatePicker({ defaultValue: new Date() })

  useEffect(() => {

    if (operation) {
      const category = getCategoryById(operation.category)

      setDateValue(operation.date)
      setCategoryName(category?.name || '')
      setTypeName(operation.type === 'income' ? 'Income' : 'Expense')
    }
  }, [ operation ])

  return { categoryName, typeName, DatePicker }
}
