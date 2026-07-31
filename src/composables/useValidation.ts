import { ref, computed } from 'vue'
import type { ValidationRule } from '../types'

export function useValidation(schema: Record<string, ValidationRule>) {
  const initialValues: Record<string, string> = {}
  Object.keys(schema).forEach((key) => {
    initialValues[key] = ''
  })

  const values = ref<Record<string, string>>({ ...initialValues })
  const errors = ref<Record<string, string>>({})
  const touched = ref<Record<string, boolean>>({})

  const isValid = computed(() => {
    const hasErrors = Object.values(errors.value).some((error) => error !== '')

    const requiredFieldsFilled = Object.keys(schema).every((key) => {
      const rule = schema[key]

      if (!rule || !rule.required) return true
      return values.value[key]?.trim() !== ''
    })

    return !hasErrors && requiredFieldsFilled
  })

  function validateField(field: string): void {
    const rule = schema[field]
    if (!rule) return

    const value = values.value[field] || ''

    if (rule.required && !value.trim()) {
      errors.value[field] = rule.message || 'Поле обязательно для заполнения'
      touched.value[field] = true
      return
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors.value[field] = rule.message || `Минимум ${rule.minLength} символов`
      touched.value[field] = true
      return
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors.value[field] = rule.message || 'Некорректный формат'
      touched.value[field] = true
      return
    }

    errors.value[field] = ''
    touched.value[field] = true
  }

  function validate(): boolean {
    Object.keys(schema).forEach((field) => {
      validateField(field)
    })
    return isValid.value
  }

  function setFieldValue(field: string, value: string): void {
    values.value[field] = value

    if (touched.value[field]) {
      validateField(field)
    }
  }

  function resetForm(): void {
    Object.keys(schema).forEach((key) => {
      values.value[key] = ''
    })
    errors.value = {}
    touched.value = {}
  }

  return {
    values,
    errors,
    touched,
    isValid,
    validate,
    validateField,
    setFieldValue,
    resetForm,
  }
}
