<template>
	<b-modal id="modal-progress" size="lg" :title="modalTitle" ok-only>
    <p class="text-primary" v-if="isLoading">获取中……<p>
    <div v-if="!isLoading">
      <b-progress :value="sportResult.ComputedDistance" :max="sportResult.QualifiedDistance" animated></b-progress>
      {{ sportResult.ComputedDistance.toFixed(2) }} / {{sportResult.QualifiedDistance}} 
      <p>上次跑步时间：{{ sportResult.LastTime|timeFormart }}</p>
    </div>
	</b-modal>
</template>

<script>
import service from '../api/api.js';
export default {
  name: 'AccountProgressModal',
  computed: {
    modalTitle: function() {
      if (this.isLoading) {
        return this.schoolName+' '+this.stuNum;
      }
      return this.schoolName+' '+this.stuNum + "("+  this.sportResult.Year + "," + this.sportResult.Term + ") —— 跑步进度更新时间：" + this.$options.filters.timeFormart(this.sportResult.FetchTime);
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
      isLoading: true,
      sportResult: {"RemoteUserID":12263,"FetchTime":"2019-04-15T13:32:40.200010391+08:00","Year":2018,"Term":"下学期","QualifiedDistance":80,"ComputedDistance":44.23,"LastTime":"2019-04-15T13:32:39Z"},
    };
  },
  filters: {
    timeFormart(timeStr) {
      return new Date(timeStr).toLocaleString(undefined,{localeMatcher:"lookup",hour12:false});
    },
  },
  methods: {
    update() {
      this.isLoading=true;
      service.getSportResult(this.uid).then((result)=>this.sportResult = result).then(()=>this.isLoading=false);
    },
  },
}
</script>