<template>
    <div>


        <app-users></app-users>

    </div>
</template>

<script>
    import Users from './Users.vue'
    export default {
        data() {
            return {}
        },
        filters: {
            date: function (value) {
                if (!value) return '';
                let NewValue = new Date(value);
                let res = "";
                res += NewValue.getFullYear();
                res += NewValue.getMonth() + 1;
                res += NewValue.getDate();
                return res;
            }
        },
        components: {
            appUsers: Users
        }

    }
</script>