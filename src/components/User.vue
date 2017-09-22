<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media
          class="white--text"
          height="200px"
          :src="userData.avatar"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{userData.name}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">{{userData.name}}</span><br>
            <span>Company - {{userData.company}}</span><br>
            <span>Creatred - {{userData.created_at | date}}</span>
            <hr/>
             <span flat class="orange--text">Following -  {{userData.following}}</span>
             <span flat class="orange--text">Followers -  {{userData.followers}}</span>
          </div>
        </v-card-title>
        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
       userData: {
           avatar : '',
           name : '',
           followers: 0,
           following : 0,
           created_at: '',
           company : ''
       }
      }
    },
    created(){
    this.UserInfo();
    },
     watch: {
        '$route' (to, from) {

        }
      },
        filters: {
          date: function (value) {
            if (!value) return ''
          let  NewValue = new Date(value);
          let res = "";
         res += NewValue.getFullYear();
         res += " ";
         res += NewValue.getMonth()+1;
          res += " ";
         res += NewValue.getDate();
          res += " ";
return res;
          }
        },
      methods : {
                  UserInfo() {
                  console.log(this.$route.params.id);
                      console.log(`https://api.github.com/users/${this.$route.params.id}`);
                      this.$http.get(`https://api.github.com/users/${this.$route.params.id}`).then(response => {
                          // get body data
                          console.log(response.body);
                          return response.json();

                      }, response => {
                          // error callback
                      }).then(data => {


                         this.userData =  {
                                    avatar : data.avatar_url,
                                    name : data.login,
                                    followers: data.followers,
                                    following : data.following,
                                    created_at: data.created_at,
                                    company : data.company
                                }

                      });

                  }
      }
      }

</script>