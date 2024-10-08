import * as React from 'react'
export declare const styles: {
  readonly position: 'sticky'
}
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
declare type PartialHTMLElement = Omit<
  React.HTMLProps<HTMLDivElement>,
  'children' | 'className' | 'ref'
>
declare const enum Position {
  HIDDEN = 'sticky-hidden',
  PINNED = 'sticky-pinned',
  UNFIXED = 'sticky-unfixed'
}
declare type ChildFn = (props: Position) => JSX.Element
declare type RenderProp = (props: {
  position: Position
  ref: React.Ref<HTMLDivElement>
  top: number
}) => JSX.Element
interface Props extends PartialHTMLElement {
  readonly children?: ChildFn | React.ReactNode
  readonly className?: string
  readonly disabled?: boolean
  readonly render?: RenderProp
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLDivElement>
>>
export default _default
