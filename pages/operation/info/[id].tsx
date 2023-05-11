

import Head from 'next/head'
import Link from 'next/link'
import useBackDrop from '@/hooks/useBackdrop'

import styles from '../styles.module.css'

import { IOperation } from '@/types/data'
import { useState, useEffect } from 'react'
import { getOperation } from '@/services/operations'
import { OperationInfo } from './OperationInfo'
import { DeleteOperationButton } from './DeleteOperationButton'





export default function OperationInfoHome ({ id }: { id: string }) {
  
  const { Backdrop, closeBackdrop, openBackdrop } = useBackDrop()
  const { operation } = useOperation({ openBackdrop, closeBackdrop, id })

  return (<>

    <Head>
      <title>Wallet 25 | Operation Info</title>
      <meta name='description' content='Wallet 25 | Operation Info' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/icon.png' />
    </Head>

    <form >

      <h2 className="page-title">Operation Info</h2>

      { operation && <span className={`${styles['operation-point']} ${operation.type}`} /> }
      { operation && <OperationInfo operation={operation} /> }

      <span className='flex' />

      { operation && <DeleteOperationButton operation={operation} closeBackdrop={closeBackdrop} openBackdrop={openBackdrop} /> }      

      <Link href="../../home" className={styles['link']}>
        Go To Home
      </Link>

    </form>

    <Backdrop />
  </>)
}


export function getServerSideProps (props: any) {
  const id: string = props.query.id
  return { props: { id } }
}


interface IUseOperation {
  openBackdrop: () => void
  closeBackdrop: () => void
  id: string
}

function useOperation ({ openBackdrop, closeBackdrop, id }: IUseOperation) {

  const [ operation, setOperation ] = useState<IOperation|null>(null)
  
  useEffect(() => {
    
    openBackdrop()

    getOperation(id)
    .then((result) => {
      if (result.status === 'success') {
        setOperation(result.result)
      }
      else {
        console.log(result)
      }
    })
    .finally(() => {
      closeBackdrop()
    })
  }, [])

  return { operation }
}





