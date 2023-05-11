
import Link from 'next/link'
import styles from './styles.module.css'
import { ICategory, IOperation } from '@/types/data'
import { getCategoriesById } from '@/services/categories'



export default function OperationsGrid ({ operations }: { operations:IOperation[] }) {

  const categoriesById = getCategoriesById()

  return (
    <div className={styles['operations-container']}>

      <h4 className={styles['title']}>
        Operations
      </h4>

      <section className={styles['grid']}>

        {operations.map(operation => (
          <OperationItem
            key={operation.id}
            operation={operation}
            category={categoriesById[operation.category]}
          />
        ))}

      </section>
    </div>
  )
}


function OperationItem ({ operation, category }: { operation:IOperation, category?: ICategory }) {

  const Icon = category?.Icon
  const title = `${operation.name} ~ ${operation.amount.toLocaleString()}`

  return (
    <Link
      title={title}
      href={`/operation/info/${operation.id}`}
      className={`${styles['item']}
      ${styles[operation.type]}`}
    >
      {Icon && <Icon size={30}/>}
      <div className={styles['item-title']}>{operation.name}</div>
    </Link>
  )
}