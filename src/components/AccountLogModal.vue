<template>
	<b-modal id="modal-log" size="lg" :title="modalTitle" ok-only="true">
	<div class="container">
		<p class="text-primary" v-if="isLoading">获取中……<p>
		<div v-if="!isLoading">
            <b-table class="row" id="accountLogs" striped hover :items="logs" :fields="fields" responsive>
                <template slot="Time" slot-scope="data">
                    {{ data.item.Time | timeFormart }}
                </template>
                <template slot="Type" slot-scope="data">
                    {{ data.item.Type | typeFormart }}
                </template>
            </b-table>
            <div class="row">
                <p class="col-sm-4 text-left text-info">共 {{total}} 条日志 </p>
                <b-pagination class="col-sm-8" align="right" size="md" :total-rows="total" v-model="page" :per-page="num" @input="update()"></b-pagination>
            </div>
        </div>
    </div>
    </b-modal>
</template>

<script>
import service from '../api/api.js';
export default {
  name: 'AccountLogModal',
  computed: {
    modalTitle() {
      if (this.isLoading) {
        return this.schoolName+' '+this.stuNum;
      }
      return this.schoolName+' '+this.stuNum;
    },
    offset() {
      return (this.page-1)*this.num;
    },
  },
  props: {
    uid: Number,
    schoolName: String,
    stuNum: String,
  },
  watch: {
    uid: function() {
      this.update();
    }
  },
  data: function() {
    return {
      fields: {
        Time: {
          label: '时间',
        },
        Type: {
          label: '类型',
        },
        Content: {
          label: '内容',
        },
      },
      isLoading: true,
      logs: [],
      page: 1,
      num: 10, // the records amount per page
      total: 0, // the records amount
    };
  },
  filters: {
    timeFormart(timeStr) {
      return new Date(timeStr).toLocaleString(undefined,{localeMatcher:"lookup",hour12:false});
    },
    typeFormart(type) {
      return type;
    },
  },
  methods: {
    update() {
      this.isLoading=true;
      service.getAccountLog(this.uid, this.offset, this.num).then((result)=>{this.logs = result.Items; this.total=result.TotalAmount;}).then(()=>this.isLoading=false);
    },
  },
}
</script>