import { Control, Controller } from 'react-hook-form'
import { Input } from './Input'

interface ControlledInputProps {
  control: Control
  label: string
  name: string
}

export function ControlledInput({
  control,
  label,
  name,
}: ControlledInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Input label={label} onChange={field.onChange} />}
    />
  )
}
