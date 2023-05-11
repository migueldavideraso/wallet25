
import Head from 'next/head'
import { useRouter } from 'next/router'
import useBackDrop from '@/hooks/useBackdrop'
import Form from './Form'


export default function CreateOperation () {

  const router = useRouter()
  const { Backdrop, closeBackdrop, openBackdrop } = useBackDrop()

  return (
    <>
      <Head>
        <title>Wallet 25 | Create Operation</title>
        <meta name='description' content='Wallet 25 | Create Operation' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/icon.png' />
      </Head>

      <Form router={router} closeBackdrop={closeBackdrop} openBackdrop={openBackdrop} />
      <Backdrop />
    </>
  )
}
