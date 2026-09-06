<script setup lang="ts">
import { computed } from 'vue'
interface Props{
    modelValue?: string | number
    label: string
    type?: 'text' | 'email' | 'tel' | 'password' |'number'
    placeholder?: string
    error?: string
    disabled?: boolean
    required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    label: '',
    type: 'text',
    placeholder: '',
    error: '',
    disabled: false,
    required: false
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
    'blur': [event: FocusEvent]
}>()

const handleInput = (event: Event) =>{
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const handleBlur = (event: FocusEvent) =>{
    emit('blur', event)
}

const inputClasses = computed(() => [
    'app-input__field',
    { 'app-input__field--error': !!props.error },
])




</script>

<template>
    <div class = "app-input">
        <label class = "app-input__label" v-if="props.label">
            {{ props.label }}
            <span v-if="props.required" class="app-input__required">*</span>
        </label>

        <input
        :type="props.type"
        :value="props.modelValue"
        :placeholder = "props.placeholder"
        :disabled="props.disabled"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        />
        <span class="app-input__error" v-if="props.error">{{ props.error }}</span>
    </div>
</template>

<style scoped lang="css">
.app-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.app-input__label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.app-input__required {
  color: #ef4444;
  margin-left: 2px;
}

.app-input__field {
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  font-family: inherit;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.app-input__field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.app-input__field:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.7;
}

.app-input__field--error {
  border-color: #ef4444;
}

.app-input__field--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.app-input__error {
  font-size: 12px;
  color: #ef4444;
  margin-top: 0.25rem;
}
</style>
