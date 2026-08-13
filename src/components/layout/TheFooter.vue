<script setup lang="ts">
interface Props {
    year?: number
}

const props = withDefaults(defineProps<Props>(), {
    year: new Date().getFullYear()
})

const aboutLinks = [
    { label: 'О нас', href: '/about' },
    { label: 'Доставка', href: '/delivery' },
    { label: 'Возврат', href: '/return' }
]

const navLinks = [
    { label: 'Каталог', href: '/catalog'},
    { label: 'Акции', href: '/stocks' },
    { label: 'Новинки', href: '/new' }
]   

const contacts = {
    email: '',
    phone: ''
}

</script>

<template>
    <footer class="the-footer">
        <div class="the-footer__container">
            <div class="the-footer__column">
                <h3>О нас</h3>
                <p>Магазин электротехники</p>
                <ul>
                    <li v-for="link in aboutLinks" :key="link.label">
                        <a :href="link.href">{{ link.label }}</a>
                    </li>
                </ul>
            </div>

            <div class="the-footer__column">
                <h3>Навигация</h3>
                <ul >
                    <li v-for="link in navLinks" :key="link.label">
                        <a :href="link.href">{{ link.label }}</a>
                    </li>
                </ul>
            </div>

            <div class="the-footer__column">
                <h3>Контакты</h3>
                <p>{{ contacts.email }}</p>
                <p>{{ contacts.phone }}</p>
            </div>

        </div>

        <div class="the-footer__bottom">
            <p>© {{ props.year }} TechShop. Все права защищены</p>
        </div>

    </footer>
</template>


<style scoped lang="css">
.the-footer {
    background-color: #111827;
    color: #d1d5db;
    padding: 3rem 0 0;
    margin-top: auto;
}

.the-footer__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.the-footer__column h3 {
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 1rem;
}

.the-footer__column p {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: #9ca3af;
}

.the-footer__column ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.the-footer__column li {
    margin-bottom: 0.5rem;
}

.the-footer__column a {
    color: #d1d5db;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;
}

.the-footer__column a:hover {
    color: #3b82f6;
}

.the-footer__bottom {
    margin-top: 2rem;
    padding: 1.5rem 0;
    border-top: 1px solid #374151;
    text-align: center;
}

.the-footer__bottom p {
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
}

@media (max-width: 768px) {
    .the-footer__container {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
}
</style>