<template>
    <div>
        <q-btn
            unelevated
            round
						icon="o_shopping_cart"                
        >
        
            
                <q-badge 
                    v-if="cartStore.products.length"
                    

                    floating
                    rounded
                    
                >
                {{ cartStore.products.length }}
            </q-badge>
                
            
        
        </q-btn>
        
    </div>

</template>
<script setup>

const cartStore = useCartStore()


</script>