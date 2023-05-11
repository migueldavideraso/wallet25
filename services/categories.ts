
import { BonusIcon, CreditsIcon, EducationIcon, HealthWellnessIcon, HonorariumIcon, InsurancesIcon, LoanIcon, MarketIcon, OtherExpenseIcon, OtherIncomeIcon, PetsIcon, PublicServicesIcon, PurchaseIcon, RentIcon, RestaurantIcon, SalaryIcon, SalesIcon, SavingIcon, SportsEntertainmentIcon, TaxesIcon, TransportIcon } from "@/components/icons"
import { ICategory } from "@/types/data"


const categories:ICategory[] = [
  {
    type: 'income',
    name: 'Salary',
    id: 'salary',
    Icon: SalaryIcon,
  },
  {
    type: 'income',
    name: 'Bonus',
    id: 'bonus',
    Icon: BonusIcon,
  },
  {
    type: 'income',
    name: 'Honorarium',
    id: 'honorarium',
    Icon: HonorariumIcon,
  },
  {
    type: 'income',
    name: 'Rent',
    id: 'rent',
    Icon: RentIcon,
  },
  {
    type: 'income',
    name: 'Loan',
    id: 'loan',
    Icon: LoanIcon,
  },
  {
    type: 'income',
    name: 'Sales',
    id: 'sales',
    Icon: SalesIcon,
  },
  {
    type: 'income',
    name: 'Others',
    id: 'other_income',
    Icon: OtherIncomeIcon,
  },



  {
    type: 'expense',
    name: 'Purchase',
    id: 'purchase',
    Icon: PurchaseIcon,
  },
  {
    type: 'expense',
    name: 'Market',
    id: 'market',
    Icon: MarketIcon,
  },
  {
    type: 'expense',
    name: 'Restaurant',
    id: 'restaurant',
    Icon: RestaurantIcon,
  },
  {
    type: 'expense',
    name: 'Public Services',
    id: 'public_services',
    Icon: PublicServicesIcon,
  },
  {
    type: 'expense',
    name: 'Transport',
    id: 'transport',
    Icon: TransportIcon,
  },
  {
    type: 'expense',
    name: 'Education',
    id: 'education',
    Icon: EducationIcon,
  },
  {
    type: 'expense',
    name: 'Health And Wellness',
    id: 'health_wellness',
    Icon: HealthWellnessIcon,
  },
  {
    type: 'expense',
    name: 'Pets',
    id: 'pets',
    Icon: PetsIcon,
  },
  {
    type: 'expense',
    name: 'Insurances',
    id: 'insurances',
    Icon: InsurancesIcon,
  },
  {
    type: 'expense',
    name: 'Credits',
    id: 'credits',
    Icon: CreditsIcon,
  },
  {
    type: 'expense',
    name: 'Taxes',
    id: 'taxes',
    Icon: TaxesIcon,
  },
  {
    type: 'expense',
    name: 'Saving',
    id: 'saving',
    Icon: SavingIcon,
  },
  {
    type: 'expense',
    name: 'Sports And Entertainment',
    id: 'sports_entertainment',
    Icon: SportsEntertainmentIcon,
  },
  {
    type: 'expense',
    name: 'Others',
    id: 'other_expense',
    Icon: OtherExpenseIcon,
  },
]


export function getCategories (): ICategory[] {
  return categories
}

interface ICategoryById {
  [id: string]: ICategory
}

const categoriesById:ICategoryById = {}
  
categories.forEach((category) => {
  categoriesById[category.id] = category
})


export function getCategoriesById (): ICategoryById {
  return categoriesById
}

export function getCategoryById (id: string): ICategory|null {
  return categoriesById[id] || null
}
