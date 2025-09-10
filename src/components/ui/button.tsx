
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'outline' }
export function Button({ children, className='', variant='default', ...rest }: PropsWithChildren<Props>) {
  const base = 'btn ' + (variant==='outline' ? 'btn-outline' : 'btn-primary')
  return <button className={base + ' ' + className} {...rest}>{children}</button>
}
