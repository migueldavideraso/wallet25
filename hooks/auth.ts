
import { useEffect, useState } from 'react'
import { onAuthChanged } from '@/services/login'
import { IUser } from '@/types/data'

export function useAuth () {

  const [ loading, setLoading ] = useState(true)
  const [ user, setUser ] = useState<IUser|null>(null)

  useEffect(() => {
    const unsubscribe = onAuthChanged((user:IUser|null) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])


  return { user, loading }
}
