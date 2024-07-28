export type ControlledInput = {
   value: string
   setValue: (value: string) => void
}

export type UncontrolledInput = {
   value?: never
   setValue?: never
}
