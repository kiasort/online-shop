<script setup lang="ts">
import { formatPrice } from '../../utils/formatPrice'
import {computed} from 'vue'

interface Props {
  price: number
  currency: string
  size: 'sm' | 'md' | 'lg'
  oldPrice: number | null
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  price: 0,
  currency: '₽',
  size: 'md',
  oldPrice: null,
  label: ''
})

const formattedOldPrice = computed(()=>{
  return props.oldPrice !== null ? formatPrice(props.oldPrice, props.currency) : ''
})

const formattedCurrentPrice = computed(()=>{
  return formatPrice(props.price, props.currency)
})


</script>

<template>
  <div class="price-display" :class="`price-display--${props.size}`">
    <div class="price-display__old" v-if="props.oldPrice !== null">
      {{ formattedOldPrice }}
    </div>
    <div class="price-display__current">
      {{ formattedCurrentPrice }}
    </div>
  </div>
</template>

<style scoped lang="css">
.price-display {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.price-display--sm {
  font-size: 14px;
}
.price-display--md {
  font-size: 16px;
}
.price-display--lg {
  font-size: 24px;
  font-weight: 700;
}

.price-display__old {
  text-decoration: line-through;
  color: #9ca3af;
}

.price-display__current {
  color: #1f2937;
}

.price-display__current--discount {
  color: #ef4444;
}
</style>
