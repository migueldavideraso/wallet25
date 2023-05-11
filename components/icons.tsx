
import { type IIconType } from '@/types/components'


export function Icon ({ size, stroke, fill, children }: IIconType) {

  size = size || 20
  stroke = stroke || 1.5
  fill = fill || '#2c3e50'

  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={fill} fill="none" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
}


export function UserIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </Icon>
  )
}

export function LogOutIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M9 12h12l-3 -3" />
      <path d="M18 15l3 -3" />
    </Icon>
  )
}

export function AddIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  )
}

export function MinusIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  )
}

export function SalaryIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
      <path d="M12 17v1m0 -8v1" />
    </Icon>
  )
}

export function BonusIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="7" y1="4" x2="17" y2="4" />
      <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
      <circle cx="5" cy="9" r="2" />
      <circle cx="19" cy="9" r="2" />
    </Icon>
  )
}

export function HonorariumIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 4v3m-4 -3v6m8 -6v6" />
      <path d="M12 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z" />
    </Icon>
  )
}

export function RentIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <polyline points="5 12 3 12 12 3 21 12 19 12" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </Icon>
  )
}

export function LoanIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <polyline points="5 6 12 3 19 6" />
      <line x1="4" y1="10" x2="4" y2="21" />
      <line x1="20" y1="10" x2="20" y2="21" />
      <line x1="8" y1="14" x2="8" y2="17" />
      <line x1="12" y1="14" x2="12" y2="17" />
      <line x1="16" y1="14" x2="16" y2="17" />
    </Icon>
  )
}

export function SalesIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
      <path d="M12 6v2m0 8v2" />
    </Icon>
  )
}

export function OtherIncomeIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </Icon>
  )
}



export function MarketIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <line x1="3" y1="21" x2="21" y2="21" />
      <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
      <line x1="5" y1="21" x2="5" y2="10.85" />
      <line x1="19" y1="21" x2="19" y2="10.85" />
      <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
    </Icon>
  )
}

export function PurchaseIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="6" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
      <path d="M17 17h-11v-14h-2" />
      <path d="M6 5l14 1l-1 7h-13" />
    </Icon>
  )
}

export function RestaurantIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
    </Icon>
  )
}

export function PublicServicesIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <polyline points="5 12 3 12 12 3 21 12 19 12" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </Icon>
  )
}

export function TransportIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
    </Icon>
  )
}

export function EducationIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <line x1="3" y1="6" x2="3" y2="19" />
      <line x1="12" y1="6" x2="12" y2="19" />
      <line x1="21" y1="6" x2="21" y2="19" />
    </Icon>
  )
}

export function HealthWellnessIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <line x1="10" y1="14" x2="14" y2="14" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </Icon>
  )
}

export function PetsIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M10 15l5.586 -5.585a2 2 0 1 1 3.414 -1.415a2 2 0 1 1 -1.413 3.414l-3.587 3.586" />
      <path d="M12 13l-3.586 -3.585a2 2 0 1 0 -3.414 -1.415a2 2 0 1 0 1.413 3.414l3.587 3.586" />
      <path d="M3 20h18c-.175 -1.671 -.046 -3.345 -2 -5h-14c-1.333 1 -2 2.667 -2 5z" />
    </Icon>
  )
}



export function InsurancesIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 12a8 8 0 0 1 16 0z" />
      <path d="M12 12v6a2 2 0 0 0 4 0" />
    </Icon>
  )
}

export function CreditsIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <polyline points="5 6 12 3 19 6" />
      <line x1="4" y1="10" x2="4" y2="21" />
      <line x1="20" y1="10" x2="20" y2="21" />
      <line x1="8" y1="14" x2="8" y2="17" />
      <line x1="12" y1="14" x2="12" y2="17" />
      <line x1="16" y1="14" x2="16" y2="17" />
    </Icon>
  )
}

export function TaxesIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" />
      <path d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5" />
    </Icon>
  )
}

export function SavingIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M15 11v.01" />
      <path d="M16 3l0 3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342a6.008 6.008 0 0 1 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l.001 -.027a6 6 0 0 1 3.999 -10.473h2.5l4.5 -3z" />
    </Icon>
  )
}

export function SportsEntertainmentIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="12" r="3" />
      <path d="M3 9h3v6h-3z" />
      <path d="M18 9h3v6h-3z" />
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="12" y1="5" x2="12" y2="19" />
    </Icon>
  )
}

export function OtherExpenseIcon (props: IIconType) {

  return (
    <Icon {...props} >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </Icon>
  )
}

