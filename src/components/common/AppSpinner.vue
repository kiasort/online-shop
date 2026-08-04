<script setup lang = "ts">
interface Props{
    size: 'sm' | 'md' | 'lg'
    color: string
}
const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    color: 'currentColor'
})
</script>

<template>
    <div class = "app-spinner" :class="`app-spinner--${props.size}`" :style="{ borderColor: props.color }"></div>
</template>

<style scoped lang = "css">
.app-spinner {
  border-radius: 50%;
  border: 3px solid var(--spinner-color, currentColor); 
  border-right-color: transparent;
  animation: spin 0.6s linear infinite;
}

.app-spinner--sm { width: 16px; height: 16px; }
.app-spinner--md { width: 24px; height: 24px; }
.app-spinner--lg { width: 40px; height: 40px; }

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>