<template>
    <v-layout row>
        <v-flex xs12>
            <v-card>
                <v-list two-line>
                    <template v-for="item in items">
                        <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
                        <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider>

                        <v-list-tile avatar v-else v-bind:key="item.title" @click="navigateToUser(item.title)" download>
                            <v-list-tile-avatar>
                                <img v-bind:src="item.avatar">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>

                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                currentUser: 1,
                items: [],
                bottom: false,
            }
        },
        created() {
            window.addEventListener('scroll', () => {
                this.bottom = this.bottomVisible()
            });
            this.addUeser()
        },
        methods: {
            bottomVisible() {
                const scrollY = window.scrollY;
                const visible = document.documentElement.clientHeight;
                const pageHeight = document.documentElement.scrollHeight;
                const bottomOfPage = visible + scrollY >= pageHeight;
                return bottomOfPage || pageHeight < visible
            },
            navigateToUser(id) {
                this.$router.push({name: 'user', params: {id: id}})
            },
            addUeser() {
                console.log(`https://api.github.com/users?since=${this.currentUser}`);
                this.$http.get(`https://api.github.com/users?since=${this.currentUser}`).then(response => {
                    // get body data
                    return response.json();

                }, response => {
                    // error callback
                }).then(data => {
                    //  console.log(data);
                    data.forEach((item) => {
                        const user = {
                            avatar: item.avatar_url,
                            title: item.login,
                            subtitle: item.html_url
                        };
                        const divider = {divider: true, inset: true};
                        this.items.push(user);
                        this.items.push(divider);
                    });


                });

            }
        },
        watch: {
            bottom(bottom) {
                if (bottom) {
                    this.currentUser += 30;
                    this.addUeser()
                }
            }
        },
    }
</script>