
import { useSelectOperationCategory } from '@/hooks/useSelectOperationCategory'
import { useSelectOperationType } from '@/hooks/useSelectOperationType'

import { createOperation } from '@/services/operations'

import { IOperation, TOperationsType } from '@/types/data'
import { isValidOperationType } from "@/types/data"

import { Button, TextField, useDatePicker } from '@/components/Main'
import { NextRouter } from 'next/router'
import Link from 'next/link'

import styles from '../styles.module.css'



interface IFormProps {
  router: NextRouter
  openBackdrop: () => void
  closeBackdrop: () => void
}

export default function Form ({ router, openBackdrop, closeBackdrop }: IFormProps) {

  const {
    operationType, SelectOperationType,
    operationDate, DatePicker,
    operationCategory, SelectOperationCategory,
  } = useFormData({ router })

  async function handleSubmit (event: any) {

    event.preventDefault()

    if (operationDate == null) {
      return
    }

    openBackdrop()

    const data = getOpetarionData ({ formElement: event.target, operationDate, operationType, operationCategory })
    const result = await createOperation(data)

    if (result.status === 'success') {
      router.replace('/home')
    }

    closeBackdrop()
  }

  return (
    <>
      <form onSubmit={handleSubmit} >

        <span className={`${styles['operation-point']} ${operationType}`} />

        <h2 className="page-title">
          Create Operation
        </h2>

        <section className="inputs-section">
          <SelectOperationType />
          <SelectOperationCategory />
          <TextField label="Name" type="text" name="name" required />
          <TextField label="Amount" type="number" name="amount" required inputProps={{ min: 0 }} />
          <DatePicker label="Date" required defaultValue={new Date()} />
        </section>

        <span className='flex' />

        <Button type='submit'>Create</Button>

        <Link href="../../home" className={styles['link']}>
          Go To Home
        </Link>

      </form>
    </>
  )
}


interface IGetOpetarionDataArgs {
  formElement: HTMLFormElement
  operationDate: Date
  operationType: TOperationsType
  operationCategory: string
}

function getOpetarionData ({ formElement, operationDate, operationType, operationCategory }: IGetOpetarionDataArgs): IOperation {

  const formData = new FormData(formElement)
  const data: IOperation = {
    createdAt: new Date(),
    date: operationDate,
    type: operationType,
    category: operationCategory,
    name: String(formData.get('name')),
    amount: Number(formData.get('amount')),
  }

  return data
}



function useFormData ({ router }: { router: NextRouter }) {

  let defaultOperationType:TOperationsType = 'income'

  if (isValidOperationType(router?.query?.type)) {
    defaultOperationType = router?.query.type
  }

  const { value: operationType, SelectOperationType } = useSelectOperationType({ defaultValue: defaultOperationType })
  const { date: operationDate, DatePicker } = useDatePicker({ defaultValue: new Date() })
  const { value: operationCategory, SelectOperationCategory } = useSelectOperationCategory({ type: operationType })

  return {
    operationType, SelectOperationType,
    operationDate, DatePicker,
    operationCategory, SelectOperationCategory,
  }
}

