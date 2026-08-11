<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const props = withDefaults(defineProps<{
    cartCount?: number
}>(), {
    cartCount: 0
})

const emit = defineEmits<{
    'toggle-cart': []
}>()

const navLinks = [
    { to: '/', label: 'Главная' },
    { to: '/catalog', label: 'Каталог' },
]

const isActive = (path: string) => {
    return route.path === path
}
</script>

<template>
    <header class="the-header">
        <div class="the-header__container">
            <RouterLink to="/" class="the-header__logo">TechShop</RouterLink>

            <nav class="the-header__nav">
                <RouterLink
                    v-for="link in navLinks"
                    :key="link.to"
                    :to="link.to"
                    :class="{ 'the-header__nav-link--active': isActive(link.to) }"
                    class="the-header__nav-link"
                >{{ link.label }}</RouterLink>
            </nav>

            <div class="the-header__actions">
                <button class="the-header__cart-btn" @click="emit('toggle-cart')">
                    <span>🛒</span>
                    <span v-if="props.cartCount > 0" class="the-header__badge">{{ props.cartCount }}</span>
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped lang="css">
.the-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;
}

.the-header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 64px;
}

.the-header__logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    text-decoration: none;
}

.the-header__nav {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.the-header__nav-link {
    color: #6b7280;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;
}

.the-header__nav-link:hover {
    color: #111827;
}

.the-header__nav-link--active {
    color: #3b82f6;
}

.the-header__actions {
    display: flex;
    align-items: center;
}

.the-header__cart-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.25rem;
    transition: background-color 0.2s;
}

.the-header__cart-btn:hover {
    background-color: #f3f4f6;
}

.the-header__badge {
    position: absolute;
    top: 4px;
    right: 4px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    background-color: #ef4444;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 768px) {
    .the-header__nav {
        display: none;
    }
}
</style>