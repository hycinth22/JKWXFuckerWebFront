<template>
  <div id="app" class="container">
    <header class="page-header">
        <b-navbar toggleable="md" variant="faded" type="light">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">管理</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <!--<b-navbar-nav>-->
                <!--<b-nav-item href="#" disabled>Link1</b-nav-item>-->
                <!--</b-navbar-nav>-->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template slot="button-content">
                            <em>{{ username }}</em>
                        </template>
                        <b-dropdown-item @click="updateList">刷新列表</b-dropdown-item>
                        <b-dropdown-item disabled>开启管理模式</b-dropdown-item>
                        <b-dropdown-item disabled>个人设置</b-dropdown-item>
                        <b-dropdown-item disabled>退出登录</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </header>
    <div class="row">
        <b-form-input v-model="searchKey" placeholder="Input here to search"></b-form-input>
        {{searchKey}}
    </div>
    <div class="row">
        <AccountList class="col-lg-12" :items="wanted_accounts" />
    </div>
    <div class="row">
        <b-alert class="col-sm-4" show>当前显示记录条数：{{count_wanted_accounts}}</b-alert>
        <div class="col-sm-4">
            <b-form-checkbox id="hidden_terminated" v-model="hidden_terminated" value="yes" unchecked-value="">
              隐藏已终止
            </b-form-checkbox>
        </div>
        <div class="col-sm-4">
            <b-button @click="calcTotalDistance">计算区间长度总和</b-button>
            <b-button @click="updateList">刷新列表</b-button>
        </div>
    </div>
  </div>
</template>

<script>
import AccountList from './components/AccountList.vue'
import service from './api/api.js';
export default {
  name: 'app',
  components: {
	AccountList,
  },
  data: function() {
    return {
      username: "管理员",
      accounts: [],
      hidden_terminated: "yes",
      searchKey: "",
    };
  },
  computed: {
    wanted_accounts() {
        let skey = this.searchKey;
        if (skey.length > 0) {
            return this.filtered_accounts.filter(acc=> {
                for (let key in acc) {
                    if (acc[key] && acc[key].toString().indexOf(skey)!=-1) {
                        return true;
                    }
                }
                return false;
            });
        }
        return this.filtered_accounts;
    },
    filtered_accounts() {
        if (this.hidden_terminated) {
            return Array.from(this.accounts).filter(acc=>acc.Status!='terminated');
        }
        return this.accounts;
    },
    count_wanted_accounts() {
        return this.wanted_accounts.length;
    }
  },
  methods: {
    notimplemented() {
      alert("暂未开发完毕此功能");
    },
    updateList() {
      service.getAllAccounts().then((acc)=>this.accounts = acc);
    },
    calcTotalDistance() {
        let total = this.wanted_accounts.reduce(function(total, currentValue) {
            return total+(currentValue.FinishDistance-currentValue.StartDistance);
        },0);
        alert(total.toFixed(2));
    },
  },
  mounted() {
    this.updateList();
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
