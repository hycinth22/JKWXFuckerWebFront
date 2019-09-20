<template>
	<div>
		<b-table id="accountList" striped hover :items="items" :fields="fields" responsive>
		<template slot="CreatedAt" slot-scope="{item}">
      {{ item.CreatedAt | timeFormart }}
		</template>
		<template slot="School" slot-scope="{item}">
      {{ item.SchoolID | schoolFormat }}
		</template>
		<template slot="DistanceRange" slot-scope="{item}">
      {{ item.StartDistance | DistanceFormat }} - {{ item.FinishDistance | DistanceFormat }}
      ({{ (item.FinishDistance-item.StartDistance) | DistanceFormat }})
		</template>
		<template slot="Status" slot-scope="{item}">
      <span :class="item.Status|StatusShowClass">
			{{ item.Status | StatusFormat }}
      </span>
		</template>
		<template slot="LastResult" slot-scope="{item}">
      <span :class="item.LastResult|ResultShowClass">
			{{ item.LastResult | ResultFormat }}
      </span>
		</template>
		<template slot="LastTime" slot-scope="{item}">
      {{ item.LastTime | timeFormart }}
		</template>
		<template slot="operate" slot-scope="{item}">
        <AccountListItemOperator :account="item" :modal_progress_info.sync="modal_progress_info" :modal_log_info.sync="modal_log_info"/>
		</template>
		<template slot="progress" slot-scope="{item}">
				{{ item.CurrentDistance-item.StartDistance | DistanceFormat}} / {{item.FinishDistance-item.StartDistance | DistanceFormat}}<br>
		</template>
		<template slot="estimateReaminDays" slot-scope="{item}">
			{{ estimateDeadline(item.FinishDistance-item.StartDistance, item.RunDistance) }}
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
      fields: {
        ID: {
          label: 'ID',
          sortable: true,
        },
        CreatedAt: {
          label: '创建时间',
          sortable: true,
        },
        School: '所在学校',
        StuNum: {
          label: '学号',
          sortable: true,
        },
        RunDistance: false,
        DistanceRange: '距离区间',
		progress: '进度',
        estimateReaminDays: {
          label: '预估天数 每日距离',
          sortable: false,
        },
        Status: '执行状态',
        LastResult: '上次运行结果',
        LastTime: '上次运行时间',
        operate: '操作',
      },
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
