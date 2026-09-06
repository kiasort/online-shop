<script setup lang="ts">
import AppInput from '../components/common/AppInput.vue';
import AppButton from '../components/common/AppButton.vue';
import { reactive, ref, onMounted, computed } from 'vue';
import {useCartStore} from '../stores/cart';
import {useRouter} from 'vue-router'

const cartStore = useCartStore();

const router = useRouter();



async function submitOrder() {
  try{

    console.log('Данные:', formData)
    console.log('Товары:', cartStore.items)
    console.log('Сумма:', total.value)

    isSubmitted.value = true;

    await cartStore.clearCart()
  }catch(e){
    console.error(e)
  }


};



const formData = reactive({
  name: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  zip: '',
  paymentMethod: 'card',
});

const isSubmitted = ref(false);

const subtotal = computed(() => cartStore.total);
const shippingCost = computed(() => (cartStore.total > 1000 ? 0 : 350));
const total = computed(() => subtotal.value + shippingCost.value);

</script>


<template>
    <section class="checkout-view">
      <h1>Оформление заказа</h1>

      <div class="main-content">
        <form @submit.prevent="submitOrder" v-if="!isSubmitted">

          <section class="purchaser-data__contacts">
            <AppInput v-model="formData.name" label="Имя" name="name" type="text" placeholder="Введите ваше имя" />
            <AppInput v-model="formData.email" label="Email" name="email" type="email" placeholder="Введите ваш email" />
            <AppInput v-model="formData.phone" label="Телефон" name="phone" type="text" placeholder="Введите ваш телефон" />
          </section>

          <section class="purchaser-data__adress">
            <AppInput v-model="formData.city" label="Город" name="city" type="text" placeholder="Введите ваш город" />
            <AppInput v-model="formData.address" label="Улица" name="address" type="text" placeholder="Введите вашу улицу" />
            <AppInput v-model="formData.zip" label="Индекс" name="zip" type="text" placeholder="Введите ваш индекс" />
          </section>

          <section class="purchaser-data__payment">
            <select v-model="formData.paymentMethod" name="payment">
              <option value="card">Банковская карта</option>
              <option value="cash">Наличные</option>
            </select>
          </section>

        </form>

        <aside v-if="!isSubmitted">
          <div class="summary-card">
            <h3>Итого</h3>
            <div class="summary__subtotal">
              <span>Товары:</span>
              <span>{{ subtotal }} ₽</span>
            </div>
            <div class="summary__shipping">
              <span>Доставка:</span>
              <span>{{ shippingCost === 0 ? 'Бесплатно' : shippingCost + ' ₽' }}</span>
            </div>
            <div class="summary__total">
              <span>Итого:</span>
              <span>{{ total }} ₽</span>
            </div>
            <AppButton type="submit">Подтвердить заказ</AppButton>
          </div>

          <router-link to="/cart">
            <AppButton>Вернуться в корзину</AppButton>
          </router-link>

        </aside>
      </div>

      <div class="success-state"  v-if="isSubmitted">
        <h2>Заказ оформлен!</h2>
        <!-- <p>Номер заказа: {{  }}</p> -->
         <router-link to="/catalog">
            <AppButton>Вернуться в каталог</AppButton>
        </router-link>
      </div>
    </section>
</template>

<style lang="css" scoped>
.checkout-view {
  padding: 40px 0;
  min-height: calc(100vh - 200px);
}

.checkout-view__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.checkout-view h1 {
  font-size: 32px;
  margin-bottom: 32px;
}

.main-content {
  display: flex;
  gap: 40px;
}

form {
  flex: 1;
}

aside {
  width: 360px;
  flex-shrink: 0;
}

/* Секции формы */
.purchaser-data__contacts,
.purchaser-data__adress,
.purchaser-data__payment {
  margin-bottom: 32px;
}

.purchaser-data__contacts h2,
.purchaser-data__adress h2,
.purchaser-data__payment h2 {
  font-size: 18px;
  margin-bottom: 16px;
}

/* Summary card */
.summary-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
}

.summary-card h3 {
  font-size: 18px;
  margin-bottom: 20px;
}

.summary__subtotal,
.summary__shipping {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  color: #4b5563;
}

.summary__total {
  display: flex;
  justify-content: space-between;
  padding: 16px 0 0;
  border-top: 1px solid #e5e7eb;
  font-weight: 600;
  font-size: 18px;
}

/* Success state */
.success-state {
  text-align: center;
  padding: 80px 20px;
}

.success-state h2 {
  font-size: 28px;
  color: #10b981;
  margin-bottom: 24px;
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }

  aside {
    width: 100%;
  }
}
</style>
