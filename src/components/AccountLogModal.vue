<template>
	<b-modal id="modal-log" size="lg" :title="modalTitle" ok-only>
	<div class="container">
		<p class="text-primary" v-if="isLoading">获取中……<p>
		<div v-if="!isLoading">
            <b-table class="row" id="accountLogs" striped hover :items="logs" :fields="fields" responsive>
                <template v-slot:cell(Time)="{item}">
                    {{ item.Time | timeFormart }}
                </template>
                <template v-slot:cell(Type)="{item}">
                    {{ item.Type | typeFormart }}
                </template>
            </b-table>
            <div class="row">
                <p class="col-sm-4 text-left text-info">共 {{total}} 条日志 </p>
                <b-pagination class="col-sm-8" align="right" size="md" :total-rows="total" v-model="page" :per-page="num" @input="update()"></b-pagination>
                <b-form-input v-model="num" placeholder="Items Amount Per Page" @blur="update()" ></b-form-input>
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
      fields: [
		{key: "Time", label: '时间'},
		{key: "Type", label: '类型'},
		{key: "Content", label: '内容'},
      ],
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
      const table = {
        'success': '成功',
        'fail': '失败',
        'info': '信息',
      };
      return table[type]?table[type]:type;
    },
  },
  methods: {
    update() {
      this.isLoading=true; this.logs=[];
      service.getAccountLog(this.uid, this.offset, this.num).then((result)=>{this.logs = result.Items; this.total=result.TotalAmount;}).then(()=>this.isLoading=false);
    },
  },
}
</script>