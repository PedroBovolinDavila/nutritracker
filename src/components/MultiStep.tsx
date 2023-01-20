interface MultiStepProps {
  steps: string[]
  activeStep: number
}

export function MultiStep({ activeStep, steps }: MultiStepProps) {
  return (
    <div className="bg-slate-800 border-2 border-slate-700 rounded-md p-4 flex justify-between items-center">
      {steps.map((step, index) => {
        return (
          <div key={index} className="flex items-center gap-2 text-slate-300">
            <span
              className={`w-5 h-5 flex items-center justify-center p-3 rounded-full ${
                activeStep === index + 1
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-200  bg-slate-600 '
              }`}
            >
              {index + 1}
            </span>
            <span
              className={`text-md ${
                activeStep === index + 1 &&
                'border-b-2 border-teal-600 rounded-sm'
              }`}
            >
              {step}
            </span>
          </div>
        )
      })}
    </div>
  )
}
