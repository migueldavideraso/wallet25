
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import styles from './styles.module.css'
import { useAuth } from '@/hooks/auth';
import { CircularProgress } from '@mui/material';
import { IUser } from '@/types/data';


export default function Chart () {

  const { user, loading } = useAuth()

  return (
    <div className={styles['chart-section']}>
      {loading && <CircularProgress className={styles['chart-progress']} />}
      {user && <OperationsChart user={user} />}
    </div>
  )
}

function OperationsChart ({ user }: { user: IUser }) {

  const totalValue = user.total_value.toLocaleString()
  const data = [
    { name: 'Income', value: user.income_value },
    { name: 'Expense', value: user.expense_value },
  ];

  const COLORS = ['var(--income-color)', 'var(--expense-color)']
 
  return (
    <>

      <span className={styles['chart-title']}>
        Total: {totalValue}
      </span>

      <ResponsiveContainer>
        <PieChart >
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={75}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            cornerRadius={2}
            stroke='none'
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

