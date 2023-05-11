
import styles from './styles.module.css'
import Link from 'next/link'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import { signOut } from '@/services/login'

import { IconButton, Stack } from '@mui/material'
import { AddIcon, LogOutIcon, MinusIcon, UserIcon } from '@/components/icons'
import Chart from '@/components/operationsValuesPie/Main'
import OperationsGrid from '@/components/operationsGrid/Main'
import { getOperations } from '@/services/operations'
import { IOperation } from '@/types/data'


export default function Home () {

  const [ operations, setOperations ] = useState<IOperation[]>([])

  useEffect(() => {

    getOperations({ filter: 'all' })
    .then(result => {
      if (result.status === 'success' && Array.isArray(result.result)) {
        setOperations(result.result)
      }
      else {
        console.log(result)
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>Wallet 25 | Home</title>
        <meta name='description' content='Wallet 25 | Home' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/icon.png' />
      </Head>

      <h1 className={`${styles.title} page-title`}>
        Wallet 25
      </h1>

      <Stack direction='row' gap='10px' justifyContent='flex-end' sx={{ margin: '-30px 0px -20px' }}>
        <IconButton>
          <UserIcon />
        </IconButton>

        <IconButton onClick={() => signOut()}>
          <LogOutIcon />
        </IconButton>
      </Stack>

      <Chart />

      {Boolean(operations.length) && <OperationsGrid operations={operations} />}

      <footer className={styles.footer}>

        <Link href="operation/create?type=expense">
          <IconButton className={styles['footer-button']}>
            <MinusIcon />
          </IconButton>
        </Link>

        <Link href="operation/create?type=income">
          <IconButton className={styles['footer-button']}>
            <AddIcon />
          </IconButton>
        </Link>

      </footer>
    </>
  )
}


