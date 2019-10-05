<template>
	<div>
		<b-table id="accountList" striped hover :items="items" :fields="fields" responsive>
		<template v-slot:cell(CreatedAt)="{item}">
      {{ item.CreatedAt | timeFormart }}
		</template>
		<template v-slot:cell(School)="{item}">
      {{ item.SchoolID | schoolFormat }}
		</template>
		<template v-slot:cell(DistanceRange)="{item}">
      {{ item.StartDistance | DistanceFormat }} - {{ item.FinishDistance | DistanceFormat }}
      ({{ (item.FinishDistance-item.StartDistance) | DistanceFormat }})
		</template>
		<template v-slot:cell(Status)="{item}">
      <span :class="item.Status|StatusShowClass">
			{{ item.Status | StatusFormat }}
      </span>
		</template>
		<template v-slot:cell(LastResult)="{item}">
      <span :class="item.LastResult|ResultShowClass">
			{{ item.LastResult | ResultFormat }}
      </span>
		</template>
		<template v-slot:cell(LastTime)="{item}">
      {{ item.LastTime | timeFormart }}
		</template>
		<template v-slot:cell(operate)="{item}">
        <AccountListItemOperator :account="item" :modal_progress_info.sync="modal_progress_info" :modal_log_info.sync="modal_log_info"/>
		</template>
		<template v-slot:cell(progress)="{item}">
				{{ item.CurrentDistance-item.StartDistance | DistanceFormat}} / {{item.FinishDistance-item.StartDistance | DistanceFormat}}<br>
		</template>
		<template v-slot:cell(estimateReaminDays)="{item}">
			{{ estimateDeadline(item.FinishDistance-item.CurrentDistance, item.RunDistance) }}
			*
			{{ item.RunDistance | DistanceFormat }}
		</template>
		
		</b-table>
        
        <div class="row">
            <div class="col-sm-4">
                <b-button v-b-modal.modal-quickCopy>快速复制</b-button>
				
            </div>
        </div>
    
		<AccountProgressModal :uid="modal_progress_info.uid" :schoolName="modal_progress_info.schoolID|schoolFormat" :stuNum="modal_progress_info.stuNum"/>
		<AccountLogModal :uid="modal_log_info.uid" :schoolName="modal_log_info.schoolID|schoolFormat" :stuNum="modal_log_info.stuNum"/>
        <AccountQuickCopyModal :accounts="items" />
	</div>
</template>

<script>
import AccountListItemOperator from './AccountListItemOperator.vue'
import AccountProgressModal from './AccountProgressModal.vue'
import AccountLogModal from './AccountLogModal.vue'
import AccountQuickCopyModal from './AccountQuickCopyModal.vue'
import utils from '../utils/utils.js'
export default {
  name: 'AccountList',
  components: {
    AccountListItemOperator,
    AccountProgressModal,
    AccountLogModal,
    AccountQuickCopyModal,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data: function() {
    return {
      fields: [
        { key: 'ID', sortable: true},
		{ key: 'CreatedAt', label: '创建时间'},
		{ key: 'School', label: '所在学校', sortable: true},
		{ key: 'StuNum', label: '学号'},
		{ key: 'DistanceRange', label: '距离区间'},
		{ key: 'progress', label: '进度'},
		{ key: 'estimateReaminDays', label: '预估天数 每日距离'},
		{ key: 'Status', label: '执行状态'},
		{ key: 'LastResult', label: '上次运行结果'},
		{ key: 'LastTime', label: '上次运行时间'},
		{ key: 'operate', label: '操作'},
      ],
      modal_progress_info: {},
      modal_log_info: {},
    };
  },
  methods: {
	estimateDeadline(totalDistance, dailyDistance) {
		return Math.ceil(totalDistance/dailyDistance);
	}
  },
  filters: {
    timeFormart(timeStr) {
      return new Date(timeStr).toLocaleString(undefined,{localeMatcher:"lookup",hour12:false});
    },
    schoolFormat(schoolID) {
        return utils.getSchoolName(schoolID);
    },
    StatusShowClass(raw) {
      const table = {
        normal: "text-secondary",
        pause: "text-secondary",
        running: "text-info",
        finished: "text-primary",
        suspend: "text-danger",
        terminated: "text-dark",
        aborted: "text-dark",
      };
      let formated = table[raw];
      return formated?formated:raw;
    },
    StatusFormat(raw) {
        return utils.getStatusText(raw);
    },
    ResultShowClass(raw) {
      const table = {
        success: "text-success",
        error: "text-danger",
      };
      let formated = table[raw];
      return formated?formated:raw;
    },
    ResultFormat(raw) {
        return utils.getResultText(raw);
    },
	DistanceFormat(raw) {
        return utils.formatDistance(raw);
	},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
