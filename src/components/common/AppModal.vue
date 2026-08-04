<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
interface Props{
    modelValue: boolean
    title: string
    size: 'sm' | 'md' | 'lg'
    closable: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    title: '',
    size: 'md',
    closable: true
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    close: []
}>()

const close = function(){
    emit('update:modelValue', false)
    emit('close')
}
const closeOnOverlay = function(){
    if(props.closable){
        close()
    }
}

const handleEscape = function (event: KeyboardEvent){
    if(event.key === 'Escape' && props.modelValue){
        close()
    }
}

watch(() => props.modelValue, (isOpen) =>{
    if (isOpen){
        document.body.style.overflow = 'hidden'
    }else{
        document.body.style.overflow = ''
    }
})

onMounted(() => {
    document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
})





</script>



<template>
    <Transition name = "modal">
        <div class = "app-modal__overlay" v-if="props.modelValue" @click="closeOnOverlay">
            <div class = "app-modal__content" :class="`app-modal__content--${props.size}`" @click.stop>
                <header v-if="props.title || $slots.header"  class = "app-modal__header" >
                    <slot name = "header">
                        <h3>{{ props.title }}</h3>
                    </slot>               
                    <button 
                    @click="close"
                    v-if="props.closable"
                    class="app-modal__close"
                    >×</button>
                </header>

                <main class="app-modal__body">
                    <slot name="default"></slot>

                </main>

                <footer v-if="$slots.footer" class = "app-modal__footer">
                    <slot name = "footer"></slot>

                </footer>

            </div>

        </div>

    </Transition>
    
</template>


<style scoped lang="css">

.app-modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
}

.app-modal__content {
    background-color: #fff;
    border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                0 10px 10px -5px rgba(0, 0, 0, 0.04);
    width: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.app-modal__content--sm {
    max-width: 400px;
}

.app-modal__content--md {
    max-width: 560px;
}

.app-modal__content--lg {
    max-width: 720px;
}

.app-modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.app-modal__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
}

.app-modal__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background-color: transparent;
    color: #6b7280;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
}

.app-modal__close:hover {
    background-color: #f3f4f6;
    color: #111827;
}


.app-modal__body {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
}

.app-modal__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    background-color: #f9fafb;
}


.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.25s ease;
}

.modal-enter-active .app-modal__content,
.modal-leave-active .app-modal__content {
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-enter-from {
    opacity: 0;
}

.modal-enter-from .app-modal__content {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-leave-to .app-modal__content {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
}
</style>