import { IMeasurement } from "@/types/data"
import { DocumentSnapshot } from "firebase/firestore"


export function getMeasurementByDoc (doc: DocumentSnapshot): IMeasurement {

  const data = doc.data() || {}
  let date = null

  if (typeof data.date?.toDate === 'function') {
    date = data.date.toDate()
  }
  else {
    // Si el documento no existe, se le agrega la fecha segun el id del documento
    if (doc.id.split('-').length === 1) {
      date = new Date(`${doc.id}-1-1`)
    }
    else {
      date = new Date(doc.id)
    }
  }


  return {
    date,
    id: doc.id,
    expense_value: Number(data.expense_value) || 0,
    income_value: Number(data.income_value) || 0,
    total_value: Number(data.total_value) || 0,
    operations_count: Number(data.operations_count) || 0,
  }
}
