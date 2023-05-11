
import { Button } from '@/components/Main'
import useAlert from '@/hooks/useAlert'
import { deleteOperation } from '@/services/operations'
import { IOperation } from '@/types/data'
import { useRouter } from 'next/router'
import { useEffect } from 'react'



interface IDeleteOperationButtonProps {
  operation: IOperation
  closeBackdrop: () => void
  openBackdrop: () => void
}

export function DeleteOperationButton ({ operation, closeBackdrop, openBackdrop }: IDeleteOperationButtonProps) {

  const { Alert, handleOpenDeleteOperationAlert } = useDeleteOperationAlert({ operation, closeBackdrop, openBackdrop })

  return (
    <>
      <Button color="error" onClick={handleOpenDeleteOperationAlert} >Delete</Button>

      <Alert
        title='Delete Operation'
        description='Are you sure to delete this operation?'
        disagree='Cancel'
        agree='Delete'  
      />
    </>
  )
}


function useDeleteOperationAlert ({ operation, closeBackdrop, openBackdrop }: IDeleteOperationButtonProps) {

  const router = useRouter()

  const {
    Alert,
    handleSetOnClose,
    handleOpen: handleOpenDeleteOperationAlert,
  } = useAlert()

  function onCloseAlert (status: boolean) {

    if (!status || operation.id == null) {
      return
    }

    openBackdrop()

    deleteOperation(operation.id)
    .then((result) => {

      console.log(result)
  
      if (result.status !== 'success') {
        return
      }
  
      router.replace('/home')
    })
    .finally(() => {
      closeBackdrop()
    })
  }

  useEffect(() => {
    operation && handleSetOnClose(onCloseAlert)
  }, [ operation ])

  return {
    Alert,
    handleOpenDeleteOperationAlert
  }
}