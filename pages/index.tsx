
import Head from 'next/head'
import { useState } from 'react'

import styles from './styles.module.css'
import { Button, TextField } from '@/components/Main'
import { ISingInProps } from '@/types/main'
import { singIn } from '@/services/login'
import { singUp } from '@/services/login'
import { ISingUpProps } from '@/types/main'

export default function Home () {

  const [ option, setOption ] = useState('Sign In')
  
  function handleSetOption (option: string) {
    setOption(option)
  }

  const getOptionLink = (optionLink: string) => {

    const href = optionLink.toLowerCase().replace(' ', '_')

    return (
      <a href={`#${href}`} className={optionLink === option ? 'active' : ''} onClick={() => handleSetOption(optionLink)}> {optionLink} </a>
    )
  }

  async function handleSubmit (event: any) {

    event.preventDefault()

    const formData = new FormData(event.target)

    if (option === 'Sign In') {
      const data = getSignInData(formData)
      const result = await singIn(data)
    }
    else {
      const data = getSignUpData(formData)
      singUp(data)
    }
  }

  function signInProofAccount () {
    singIn(null)
  }


  return (
    <>
      <Head>
        <title>Wallet 25</title>
        <meta name='description' content='Wallet 25 | Sign In or Sign Up' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/icon.png' />
      </Head>

      <form className={styles['form']} onSubmit={handleSubmit} >

        <h2 className="page-title">
          Wallet 25
        </h2>

        <section className="inputs-section">
          {option === 'Sign Up' &&  SignUp()}
          {option === 'Sign In' &&  SignIn()}
        </section>

        <span className='flex' />

        <Button type='submit'>{option}</Button>
        <Button color='secondary' size='small' onClick={signInProofAccount} >Cuenta de Prueba</Button>

        <section className={styles['options']}>
          {getOptionLink('Sign In')}
          {getOptionLink('Sign Up')}
        </section>


      </form>

    </>
  )
}

function SignUp () {

  return (
    <>
      <TextField label="Name" type="text" name="name" required />
      <TextField label="Email" type="email" name="email" required />
      <TextField label="Password" type="password" name="password" required inputProps={{ minLength: 6 }} />
    </>
  )
}

function SignIn () {

  return (
    <>
      <TextField label="Email" type="email" name="email" required />
      <TextField label="Password" type="password" name="password" required inputProps={{ minLength: 6 }} />
    </>
  )
}

function getSignInData (formData: FormData): ISingInProps {

  return {
    email: String(formData.get('email')),
    password: String(formData.get('password')),
  }
}

function getSignUpData (formData: FormData): ISingUpProps {

  return {
    name: String(formData.get('name')),
    email: String(formData.get('email')),
    password: String(formData.get('password')),
  }
}


