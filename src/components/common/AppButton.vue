<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'app-button',
  `app-button--${props.variant}`,
  `app-button--${props.size}`,
  { 'app-button--loading': props.loading },
  { 'app-button--block': props.block },
])

const handleClick = function (event: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="props.disabled || props.loading"
    :type="props.type"
    @click="handleClick"
  >
    <span v-if="props.loading" class="app-button__spinner"> </span>

    <span>
      <slot>Кнопка</slot>
    </span>
  </button>
</template>

<style scoped lang="сss">
.app-button{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
    -webkit-appearence: none;
}

.app-button--sm{
    padding: 6px 12px;
    font-size: 14px;
}

.app-button--md{
    padding: 10px 20px;
    font-size: 16px;
}

.app-button--lg{
    padding: 14px 28px;
    font-size: 18px;
}

.app-button--primary{
    background-color: #3b82f6;
    color: #fff;
}

.app-button--secondary{
    background-color: #f3f4f6;
    color: #374151;
}

.app-button--ghost{
    background-color: transparent;
    color: #3b82f6;
    border-color: #3b82f6;
}

.app-button--danger{
    background-color: #ef4444;
    color: #fff;
}
    /* ─── Hover состояния ─── */
.app-button--primary:hover:not(.app-button--disabled) {
    background-color: #2563eb;
}

.app-button--secondary:hover:not(.app-button--disabled) {
    background-color: #e5e7eb;
}

.app-button--ghost:hover:not(.app-button--disabled) {
    background-color: #eff6ff;
}

.app-button--danger:hover:not(.app-button--disabled) {
    background-color: #dc2626;
}

.app-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.app-button--block {
    display: flex;
    width: 100%;
}

.app-button__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.app-button--loading .app-button__content {
    opacity: 0.7;
}
</style>
