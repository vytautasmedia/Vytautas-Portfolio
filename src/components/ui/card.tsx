
import { HTMLAttributes, PropsWithChildren } from 'react'

export function Card({ children, className='', ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={'card ' + className} {...rest}>{children}</div>
}
export function CardHeader({ children, className='', ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={'p-5 ' + className} {...rest}>{children}</div>
}
export function CardContent({ children, className='', ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={'p-5 ' + className} {...rest}>{children}</div>
}
export function CardTitle({ children, className='', ...rest }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return <h3 className={'text-lg font-semibold ' + className} {...rest}>{children}</h3>
}
export function CardDescription({ children, className='', ...rest }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={'text-sm text-neutral-500 dark:text-neutral-400 ' + className} {...rest}>{children}</p>
}
