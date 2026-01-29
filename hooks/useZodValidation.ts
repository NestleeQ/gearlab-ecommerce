import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { z, ZodError } from 'zod'

interface UseZodValidationReturn<T> {
	values: T
	errors: Partial<Record<keyof T, string>> & { global?: string }
	handleChange: (name: keyof T, value: string) => void
	handleNumberChange: (name: keyof T, value: number) => void
	validateForm: () => boolean
	reset: (newInitialValues?: T) => void
	setFieldError: (field: keyof T, error: string) => void
	setGlobalError: (error: string) => void
	setValues: React.Dispatch<React.SetStateAction<T>>
}

export const useZodValidation = <T extends object>(
	schema: z.ZodObject<z.ZodRawShape>,
	initialValues: T
): UseZodValidationReturn<T> => {
	const [values, setValues] = useState<T>(initialValues)
	const [errors, setErrors] = useState<
		Partial<Record<keyof T, string>> & { global?: string }
	>({})

	const initialValuesRef = useRef<T>(initialValues)

	useEffect(() => {
		initialValuesRef.current = initialValues
	}, [initialValues])

	const handleChange = useCallback(
		(name: keyof T, value: string) => {
			setValues(prev => ({ ...prev, [name]: value }))
			if (name in errors && errors[name]) {
				setErrors(prev => ({ ...prev, [name]: undefined }))
			}
		},
		[errors]
	)

	const handleNumberChange = useCallback(
		(name: keyof T, value: number) => {
			setValues(prev => ({ ...prev, [name]: value }))
			if (name in errors && errors[name]) {
				setErrors(prev => ({ ...prev, [name]: undefined }))
			}
		},
		[errors]
	)

	const validateForm = useCallback((): boolean => {
		try {
			schema.parse(values)
			setErrors({})
			return true
		} catch (error) {
			if (error instanceof ZodError) {
				const fieldErrors: Partial<Record<keyof T, string>> = {}
				let globalError: string | undefined

				error.issues.forEach(issue => {
					if (issue.path.length > 0) {
						const fieldName = issue.path[0] as keyof T
						fieldErrors[fieldName] = issue.message
					} else {
						globalError = issue.message
					}
				})

				setErrors({
					...fieldErrors,
					global: globalError
				})
			}
			return false
		}
	}, [schema, values])

	const reset = useCallback((newInitialValues?: T) => {
		const resetValues = newInitialValues || initialValuesRef.current
		setValues(resetValues)
		setErrors({})
	}, [])

	const setFieldError = useCallback((field: keyof T, error: string) => {
		setErrors(prev => ({
			...prev,
			[field]: error
		}))
	}, [])

	const setGlobalError = useCallback((error: string) => {
		setErrors(prev => ({
			...prev,
			global: error
		}))
	}, [])

	return useMemo(
		() => ({
			values,
			errors,
			handleChange,
			handleNumberChange,
			validateForm,
			reset,
			setFieldError,
			setGlobalError,
			setValues
		}),
		[
			values,
			errors,
			handleChange,
			handleNumberChange,
			validateForm,
			reset,
			setFieldError,
			setGlobalError
		]
	)
}
